import { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { fileContentState } from '../ImageHandler/state';
import { specsState } from '../SpecInputs/state';
import { progressState, outputState, specErrorsState, coorsReadyState, coorErrorsState, realCoorsState } from './state';

export default function useConverter() {
  const setOutput = useSetRecoilState(outputState);
  const setProgress = useSetRecoilState(progressState);
  const specsAlpha = useRecoilValue(specsState);
  const fileContent = useRecoilValue(fileContentState);
  const coorsReady = useRecoilValue(coorsReadyState);
  const specErrors = useRecoilValue(specErrorsState);
  const coorErrors = useRecoilValue(coorErrorsState);
  const realCoors = useRecoilValue(realCoorsState);
  
  const mmToCm = (mm) => mm / 10;
  const mmToM = (mm) => mm / 1000;
  const cmToMm = (cm) => cm * 10;
  const cmToM = (cm) => cm / 100;
  const mToMm = (m) => m * 1000;
  const mToCm = (m) => m * 100;

  const go = async () => {
    if (coorsReady) {
      const specs = Object.keys(specsAlpha).reduce((out, k) => ({
        ...out,
        [k]: Number(specsAlpha[k])
      }), {});

      setProgress([]);
      const progress = [];
      const updateProgress = (msg) => {
        progress.push(msg);
        setProgress([ ...progress ]);
      }

      const parser = new DOMParser();
      const dom = parser.parseFromString(fileContent, "application/xml");

      const mySvg = dom.querySelector("svg");
      const [_minX, _minY, _width, height] = mySvg.getAttribute("viewBox").split(" ");

      // circle, ellipse, line, mesh, path, polygon, polyline, rect
      const myPaths = Array.from(dom.querySelectorAll("path"));
      updateProgress(`Found ${myPaths.length} paths, of lengths:`);
      for (let i = 0; i < myPaths.length; i++) {
        updateProgress(`${i}: ${Math.round(myPaths[i].getTotalLength() * 100) / 100}`);
      }

      await new Promise((resolve) => setTimeout(resolve, 0));
      
      const unitToMm = (unit) => unit * cmToMm(specs["final-height"]) / height;
      const mmToUnit = (mm) => mm * height / cmToMm(specs["final-height"]);

      const pointToCoor = (point) => ({
        x: cmToMm(realCoors.outputRect.x) + unitToMm(point.x),
        y: cmToMm(realCoors.outputRect.y) + unitToMm(point.y)
      });

      const pathToCoors = (path) => {
        const out = [];
        const total = unitToMm(path.getTotalLength());

        let i = 0;
        while (i < total) {
          out.push(
            pointToCoor(
              path.getPointAtLength(
                mmToUnit(i))));
          i += cmToMm(specs['output-resolution']);
        }

        return out;
      }

      const masterCoors = {};

      masterCoors['start'] = { x: realCoors.outputRect.x, y: realCoors.outputRect.y };

      let t1 = Date.now();
      for (let i = 0; i < myPaths.length; i++) {
        const key = `path-${i}`;
        masterCoors[key] = pathToCoors(myPaths[i]);
        
        let t2 = Date.now();
        updateProgress(`path ${i} converted (${t2-t1} ms)`);

        await new Promise((resolve) => setTimeout(resolve, 0));
        t1 = Date.now();
      }

      // euclidean distance
      const eD = (a, b) => Math.pow(b.y - a.y, 2) + Math.pow(b.x - a.x, 2);

      const slope = (a, b) => (b.y - a.y) / (b.x - a.x);

      const traverse = (a, b, current) => {
        const N = { l: -1, r: 1 };
        const NE = { l: 0, r: 1 };
        const E = { l: 1, r: 1 };
        const SE = { l: 1, r: 0 };
        const S = { l: 1, r: -1 };
        const SW = { l: 0, r: -1 };
        const W = { l: -1, r: -1 };
        const NW = { l: -1, r: 0 };

        // This isn't going to work
        // Not sure how to solve new position after motor rotates
        // Force strings to go through an eyelet or pulley so they always come out at the same place
        // keep spool-diameter, change spool-to-spool to eyelet-to-eyelet
        // "specify by distance from spools" calculation will have to change

        while (true) {
          if (eD(a, current) < eD(b, current)) {
            return current;
          }

          if (current.x === b.x) {
            if (current.y > b.y) {
              // move S
            } else {
              // move N
            }
          } 

          const m = slope(current, b);
          if (current.x < b.x) {
            if (slope > 0) {
              // move N, NE, or E
            } else {
              // move E, SE, or S
            }
          } else {
            if (slope > 0) {
              // move S, SW, or W
            } else {
              // move W, NW, or N
            }
          }
        }
      }
      

      /*
      l   r

      1   1
      1   0
      1   -1
      0   1
      0   0   <- invalid
      0   -1
      -1  1
      -1  0
      -1  -1
      */

      // at each interval, set left and right move:
      // 1: step clockwise
      // 0: do nothing
      // -1: step counter-clockwise

      // FEED RATE??
      // have option to export/import here, so all the expensive and slow stuff doesn't have to be run again
      // shouldn't be able to set specs if they haven't been used yet (for example: step resolution)
      // also I think storing points makes more sense than lengths. Remember to carry error when building moves

      // somehow make it available for download?
      setOutput({});
    }
  }
  
  return {
    specErrors,
    coorErrors,
    ready: coorsReady,
    go
  };
}