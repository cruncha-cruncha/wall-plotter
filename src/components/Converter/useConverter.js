import { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { fileContentState } from '../ImageHandler/state';
import { specsState } from '../SpecInputs/state';
import { progressState, specErrorsState, specsReadyState, coorErrorsState, realCoorsState, downloadBlobState } from './state';

import solveCoors from './helpers/solveCoors';

export const getViewBoxNums = viewBox => viewBox.split(viewBox.includes(',') ? "," : " ").map(val => Number(val.trim()));

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

      setDownloadHref('');

      // ---- Get SVG, it's dimensions and paths ----
      const parser = new DOMParser();
      const dom = parser.parseFromString(fileContent, "application/xml");

      const mySvg = dom.querySelector("svg");
      const [_minX, _minY, _width, height] = getViewBoxNums(mySvg.getAttribute("viewBox"));

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

      // jerk mitigation: 7 = fastest, 0 = slowest
      const getSpeed = ( a, b ) => {
        const dist = eD(a,b);
        if (dist >= 20) {
          return 7;
        } else if (dist >= 10) {
          return 5;
        } else if (dist >= 5) {
          return 3;
        } else if (dist >= 3) {
          return 2;
        } else if (dist >= 1) {
          return 1;
        } else {
          return 0;
        }
      }

      const pathToCoors = (path) => {
        const out = [];
        const total = unitToMm(path.getTotalLength());

        // use 2mm output resolution
        const resolution = 2;

        out.push({
          speed: 0,
          coor: pointToCoor(path.getPointAtLength(0))
        });

        if (total > resolution) {

          const resolutionCoor = pointToCoor(path.getPointAtLength(mmToUnit(resolution)));
          out.push({
            speed: getSpeed( out[0].coor, resolutionCoor ),
            coor: resolutionCoor
          });

          if (total > resolution * 2) {
            let lag = 0;
            let mm = resolution * 2; 
            let precision = resolution;

            while (mm < total) {
              const newCoor = pointToCoor(path.getPointAtLength(mmToUnit(mm)))
              const dist = distToLine(out[lag], out[lag+1], newCoor);

              if (dist < precision) {
                out[lag+1] = { speed: getSpeed( out[lag].coor, newCoor ), coor: newCoor };
                precision = precision / 2;
              } else {
                lag += 1;
                out.push({ speed: getSpeed( out[lag].coor, newCoor), coor: newCoor });
                precision = resolution;
              }
              
              mm += resolution;
            }
          }
        } 

        const finalCoor = pointToCoor(path.getPointAtLength(path.getTotalLength()));
        out.push({ speed: getSpeed( out[out.length - 1].coor, finalCoor), coor: finalCoor });

        return out;
      }

      // ---- Define functions to convert straight lines to motor moves ----
      const getPulses = ({ actualLeftSteps, leftDirection, actualRightSteps, rightDirection, speeds }) => {
        const mostSteps = Math.max(actualLeftSteps, actualRightSteps);

        const leftModulus = actualLeftSteps === 0 ? 0 : mostSteps / actualLeftSteps;
        const rightModulus = actualRightSteps === 0 ? 0 : mostSteps / actualRightSteps;

        const out = new Array(mostSteps).fill(null).map(() => ({ s: 0, l: 0, r: 0 }));

        if (speeds.current === speeds.top && speeds.top === speeds.eventual) {

          // same speed all the way through
          out.forEach(o => o.s = speeds.top);

        } else if (speeds.current === speeds.top || speeds.top === speeds.eventual) {

          // slowly ramp from speeds.current to speeds.eventual
          const speedDiff = speeds.eventual - speeds.current;
          const sign = speedDiff / Math.abs(speedDiff);
          const blockSize = out.length / Math.abs(speedDiff);  

          for (let i = 0; i < out.length; i++) {
            out[i].s = (speeds.current + ( sign * Math.round(i / blockSize) ));
          }

        } else {

          // ramp from speeds.current to speeds.top
          // then from speeds.top to speeds.eventual
          const halfway = Math.round(out.length / 2);

          const firstBaseSpeed = speeds.current;
          const firstSpeedDiff = speeds.top - firstBaseSpeed;
          const firstSign = firstSpeedDiff / Math.abs(firstSpeedDiff);
          const firstBlockSize = halfway / Math.abs(firstSpeedDiff);
          for (let i = 0; i < halfway; i++) {
            out[i].s = (firstBaseSpeed + ( firstSign * Math.round(i / firstBlockSize) ));
          }

          const secondBaseSpeed = (halfway > 0) ? out[halfway-1].s : speeds.current;
          const secondSpeedDiff = speeds.eventual - secondBaseSpeed;
          const secondSign = secondSpeedDiff / Math.abs(secondSpeedDiff);
          const secondBlockSize = (out.length - halfway) / Math.abs(secondSpeedDiff);
          for (let i = halfway; i < out.length; i++) {
            out[i].s = (secondBaseSpeed + ( secondSign * Math.round((i - halfway) / secondBlockSize) ));
          }

        }

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

      const traverseStraight = (current, desired, nextSpeed) => {
        const currentLeftCoor = { x: current.coor.x - cmToMm(specs['tool-offset-x']), y: current.coor.y - cmToMm(specs['tool-offset-y'])};
        const desiredLeftCoor = { x: desired.coor.x - cmToMm(specs['tool-offset-x']), y: desired.coor.y - cmToMm(specs['tool-offset-y'])};
        const currentRightCoor = { x: current.coor.x + cmToMm(specs['tool-offset-x']), y: current.coor.y - cmToMm(specs['tool-offset-y'])};
        const desiredRightCoor = { x: desired.coor.x + cmToMm(specs['tool-offset-x']), y: desired.coor.y - cmToMm(specs['tool-offset-y'])};

        const leftDelta = eD({ x: 0, y: 0 }, desiredLeftCoor) - eD({ x: 0, y: 0 }, currentLeftCoor);
        const rightDelta = eD({ x: cmToMm(specs['eye-to-eye']), y: 0 }, desiredRightCoor) - eD({ x: cmToMm(specs['eye-to-eye']), y: 0 }, currentRightCoor);

        const actualLeftSteps = Math.round(Math.abs(leftDelta) * stepsPerMm);
        const actualRightSteps = Math.round(Math.abs(rightDelta) * stepsPerMm);

        // 1  = longer
        // 0  = no op
        // -1 = shorter
        const leftDirection = actualLeftSteps === 0 ? 0 : leftDelta / Math.abs(leftDelta);
        const rightDirection = actualRightSteps === 0 ? 0 : rightDelta / Math.abs(rightDelta);

        const newLeftLength = eD({ x: 0, y: 0 }, currentLeftCoor) + (actualLeftSteps * mmPerStep * leftDirection);
        const newRightLength = eD({ x: cmToMm(specs['eye-to-eye']), y: 0 }, currentRightCoor) + (actualRightSteps * mmPerStep * rightDirection);

        const pulses = getPulses({
          actualLeftSteps,
          leftDirection,
          actualRightSteps,
          rightDirection,
          speeds: {
            current: current.speed,
            top: desired.speed,
            eventual: Math.min(desired.speed, nextSpeed)
          }});

        const newCurrent = {
          speed: (!!pulses && pulses.length > 0)
            ? pulses[pulses.length - 1].s
            : current.speed,
          coor: solveCoors({ 
            eyeToEye: cmToMm(specs['eye-to-eye']),
            toolOffsetX: cmToMm(specs['tool-offset-x']),
            toolOffsetY: cmToMm(specs['tool-offset-y']),
            leftLength: newLeftLength,
            rightLength: newRightLength
          })
        }

        return { 
          pulses,
          newCurrent
        };
      }

      // ---- Gather all real-world coors we want to hit ----
      const masterCoors = {};
      masterCoors['start'] = ({ speed: 0, coor: { x: cmToMm(realCoors.outputRect.x), y: cmToMm(realCoors.outputRect.y) }});

      let t1;
      for (let i = 0; i < myPaths.length; i++) {
        t1 = Date.now();

        const key = `path-${i}`;
        masterCoors[key] = pathToCoors(myPaths[i]);
        
        let t2 = Date.now();
        await updateProgress(`path ${i} converted to coors (${t2-t1} ms)`);
      }

      // ---- Set missing speeds ----
      for (let i = 0; i < myPaths.length; i++) {
        const start = (i === 0)
          ? masterCoors.start.coor
          : masterCoors[`path-${i-1}`][masterCoors[`path-${i-1}`].length - 1].coor;
        
        const end = masterCoors[`path-${i}`][0];

        masterCoors[`path-${i}`][0].speed = getSpeed( start, end );
      }

      // ---- Traverse all paths sequentially ----
      let bigPulseList = [];

      let current = masterCoors.start;
      for (let i = 0; i < myPaths.length; i++) {
        t1 = Date.now();
      
        for (let c = 0; c < masterCoors[`path-${i}`].length; c++) {
          const nextSpeed = (c+1 >= masterCoors[`path-${i}`].length)
            ? (i+1 >= myPaths.length)
              ? 0
              : masterCoors[`path-${i+1}`][0].speed
            : masterCoors[`path-${i}`][c+1].speed;
          const coor = masterCoors[`path-${i}`][c];
          const { newCurrent, pulses } = traverseStraight(current, coor, nextSpeed);

          if (!newCurrent.coor) {
            return null;
          }

          current = newCurrent;
          bigPulseList = [ ...bigPulseList, ...pulses ];
        }

        let t2 = Date.now();
        await updateProgress(`path ${i} converted to pulses (${t2-t1} ms)`);
      }

      // get steps per second
      const stepsPerSecond = () => {
        const oneStep = specs['step-resolution'] / 360 * specs['spool-radius'] * 2 * Math.PI;
        return 2.0 / oneStep; // ~ 2cm/s
      }

      const out = {
        stepsPerSecond: stepsPerSecond(),
        pulses: bigPulseList
      };

      setDownloadBlob(new Blob([JSON.stringify(out)], {type: 'text/plain'}));
    }
  }

  useEffect(() => {
    if (downloadBlob) {
      setDownloadHref(URL.createObjectURL(downloadBlob));
    } else {
      setDownloadHref('');
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