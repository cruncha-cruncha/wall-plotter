import { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { fileContentState } from '../ImageHandler/state';
import { specsState } from '../SpecInputs/state';
import { progressState, specErrorsState, specsReadyState, coorErrorsState, realCoorsState, downloadBlobState } from './state';

import solveCoors from './helpers/solveCoors';

export default function useConverter() {
  const setProgress = useSetRecoilState(progressState);
  const specsAlpha = useRecoilValue(specsState);
  const fileContent = useRecoilValue(fileContentState);
  const specsReady = useRecoilValue(specsReadyState);
  const specErrors = useRecoilValue(specErrorsState);
  const coorErrors = useRecoilValue(coorErrorsState);
  const realCoors = useRecoilValue(realCoorsState);
  const [downloadBlob, setDownloadBlob] = useRecoilState(downloadBlobState);
  const [downloadHref, setDownloadHref] = useState('');
  
  const mmToCm = (mm) => mm / 10;
  const mmToM = (mm) => mm / 1000;
  const cmToMm = (cm) => cm * 10;
  const cmToM = (cm) => cm / 100;
  const mToMm = (m) => m * 1000;
  const mToCm = (m) => m * 100;

  const go = async () => {
    if (specsReady) {
      const specs = Object.keys(specsAlpha).reduce((out, k) => ({
        ...out,
        [k]: Number(specsAlpha[k])
      }), {});

      setProgress([]);
      const progress = [];
      const updateProgress = async (msg) => {
        progress.push(msg);
        setProgress([ ...progress ]);
        // give progress a chance to propogate
        await new Promise((resolve) => setTimeout(resolve, 0));
      }

      // ---- Get SVG, it's dimensions and paths ----
      const parser = new DOMParser();
      const dom = parser.parseFromString(fileContent, "application/xml");

      const mySvg = dom.querySelector("svg");
      const [_minX, _minY, _width, height] = mySvg.getAttribute("viewBox").split(" ");

      // in future, also get: circle, ellipse, line, mesh, path, polygon, polyline, rect?
      const myPaths = Array.from(dom.querySelectorAll("path"));
      await updateProgress(`Found ${myPaths.length} paths, of lengths:`);
      for (let i = 0; i < myPaths.length; i++) {
        await updateProgress(`${i}: ${Math.round(myPaths[i].getTotalLength() * 100) / 100}`);
      }     
      
      // ---- Define functions for converting SVG coors into real-world coors ----
      const unitToMm = (unit) => unit * cmToMm(specs["final-height"]) / height;
      const mmToUnit = (mm) => mm * height / cmToMm(specs["final-height"]);

      const pointToCoor = (point) => ({
        x: cmToMm(realCoors.outputRect.x) + unitToMm(point.x),
        y: cmToMm(realCoors.outputRect.y) + unitToMm(point.y)
      });

      // how far away is coorB from a line passing through coorA and coorC
      const distToLine = (coorA, coorB, coorC) => {
        return (
          Math.abs((coorC.x - coorA.x) * (coorA.y - coorB.y) - (coorA.x - coorB.x) * (coorC.y - coorA.y)) /
          Math.sqrt(Math.pow((coorC.x - coorA.x), 2) + Math.pow((coorC.y - coorA.y), 2))
        );
      }

      const pathToCoors = (path) => {
        const out = [];
        const total = unitToMm(path.getTotalLength());

        // use 2mm output resolution
        const resolution = 2;

        out.push(
          pointToCoor(
            path.getPointAtLength(0)));

        if (total > resolution) {

          out.push(
            pointToCoor(
              path.getPointAtLength(
                mmToUnit(resolution))));

          if (total > resolution * 2) {
            let lag = 0;
            let mm = resolution * 2; 
            let precision = resolution;

            while (mm < total) {
              const newCoor = pointToCoor(path.getPointAtLength(mmToUnit(mm)))
              const dist = distToLine(out[lag], out[lag+1], newCoor);

              if (dist < precision) {
                out[lag+1] = newCoor;
                precision = precision / 2;
              } else {
                lag += 1;
                out.push(newCoor);
                precision = resolution;
              }
              
              mm += resolution;
            }
          }
        } 

        out.push(pointToCoor(path.getPointAtLength(path.getTotalLength())));

        return out;
      }

      // ---- Define functions to convert straight lines to motor moves ----
      const getPulses = ({ actualLeftSteps, leftDirection, actualRightSteps, rightDirection }) => {
        const mostSteps = Math.max(actualLeftSteps, actualRightSteps);

        const leftModulus = actualLeftSteps === 0 ? 0 : mostSteps / actualLeftSteps;
        const rightModulus = actualRightSteps === 0 ? 0 : mostSteps / actualRightSteps;

        const out = new Array(mostSteps).fill(null).map(() => ({ l: 0, r: 0 }));

        if (leftModulus > 0 && rightModulus > 0) {
          let leftSum = 0;
          let rightSum = 0;
          for (let i = 0; i < mostSteps; i++) {
            if (i >= leftSum) {
              out[i].l = leftDirection;
              leftSum += leftModulus;
            }
            if (i >= rightSum) {
              out[i].r = rightDirection;
              rightSum += rightModulus;
            }
          }
        } else if (rightModulus <= 0) {
          let leftSum = 0;
          for (let i = 0; i < mostSteps; i++) {
            if (i >= leftSum) {
              out[i].l = leftDirection;
              leftSum += leftModulus;
            }
          }
        } else if (leftModulus <= 0) {
          let rightSum = 0;
          for (let i = 0; i < mostSteps; i++) {
            if (i >= rightSum) {
              out[i].r = rightDirection;
              rightSum += rightModulus;
            }
          }
        }

        return out;
      }

      // euclidean distance
      const eD = (a, b) => Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));

      const mmPerStep = cmToMm(2 * Math.PI * specs['spool-radius'] * specs['step-resolution'] / 360);
      const stepsPerMm = 1 / mmPerStep;

      const traverseStraight = (current, desired) => {
        const leftDelta = eD({ x: 0, y: 0 }, desired) - eD({ x: 0, y: 0 }, current);
        const rightDelta = eD({ x: cmToMm(specs['eye-to-eye']), y: 0 }, desired) - eD({ x: cmToMm(specs['eye-to-eye']), y: 0 }, current);

        const actualLeftSteps = Math.round(Math.abs(leftDelta) * stepsPerMm);
        const actualRightSteps = Math.round(Math.abs(rightDelta) * stepsPerMm);

        // 1  = longer
        // 0  = no op
        // -1 = shorter
        const leftDirection = actualLeftSteps === 0 ? 0 : leftDelta / Math.abs(leftDelta);
        const rightDirection = actualRightSteps === 0 ? 0 : rightDelta / Math.abs(rightDelta);

        const newLeftLength = eD({ x: 0, y: 0 }, current) + (actualLeftSteps * mmPerStep * leftDirection);
        const newRightLength = eD({ x: cmToMm(specs['eye-to-eye']), y: 0 }, current) + (actualRightSteps * mmPerStep * rightDirection);

        return { 
          pulses: getPulses({ actualLeftSteps, leftDirection, actualRightSteps, rightDirection }),
          newCurrent: solveCoors({ 
            eyeToEye: cmToMm(specs['eye-to-eye']),
            toolOffsetX: cmToMm(specs['tool-offset-x']),
            toolOffsetY: cmToMm(specs['tool-offset-y']),
            leftLength: newLeftLength,
            rightLength: newRightLength
          })
        };
      }

      // ---- Gather all real-world coors we want to hit ----
      const masterCoors = {};
      masterCoors['start'] = { x: cmToMm(realCoors.outputRect.x), y: cmToMm(realCoors.outputRect.y) };

      let t1;
      for (let i = 0; i < myPaths.length; i++) {
        t1 = Date.now();

        const key = `path-${i}`;
        masterCoors[key] = pathToCoors(myPaths[i]);
        
        let t2 = Date.now();
        await updateProgress(`path ${i} converted to coors (${t2-t1} ms)`);
      }

      // ---- Traverse all paths sequentially ----
      let bigPulseList = [];

      let current = masterCoors.start;
      for (let i = 0; i < myPaths.length; i++) {
        t1 = Date.now();
      
        for (let coor of masterCoors[`path-${i}`]) {
          const { newCurrent, pulses } = traverseStraight(current, coor);

          if (!newCurrent) {
            return null;
          }

          current = newCurrent;
          bigPulseList = [ ...bigPulseList, ...pulses ];
        }

        let t2 = Date.now();
        await updateProgress(`path ${i} converted to pulses (${t2-t1} ms)`);
      }

      setDownloadBlob(new Blob([JSON.stringify(bigPulseList)], {type: 'text/plain'}));
    }
  }

  useEffect(() => {
    if (downloadBlob) {
      setDownloadHref(URL.createObjectURL(downloadBlob));
    }
  }, [downloadBlob]);
  
  return {
    specErrors,
    coorErrors,
    ready: specsReady,
    go,
    downloadHref
  };
}