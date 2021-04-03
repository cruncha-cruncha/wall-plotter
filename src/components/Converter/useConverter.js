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

      const traverse = (current, desired) => {

        // calculate how many steps it takes to lengthen the string by a mm (this can be done outside)
        // solve for lengths at desired
        // round find delta lengths in mm, convert to steps, round to nearest
        // move there, return new position

      }

      // at each interval, set left and right move:
      // 1: step clockwise
      // 0: do nothing
      // -1: step counter-clockwise

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