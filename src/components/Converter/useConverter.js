import { useRecoilValue } from 'recoil';

import { fileContentState } from '../ImageHandler/state';
import { specsState } from '../SpecInputs/state';
import { readyState } from './state';

export default function useConverter() {
  const specs = useRecoilValue(specsState);
  const fileContent = useRecoilValue(fileContentState);
  const ready = useRecoilValue(readyState);

  const mmToCm = (mm) => mm / 10;
  const mmToM = (mm) => mm / 1000;
  const cmToMm = (cm) => cm * 10;
  const cmToM = (cm) => cm / 100;
  const mToMm = (m) => m * 1000;
  const mToCm = (m) => m * 100;

  const go = () => {
    if (ready) {
      const parser = new DOMParser();
      const dom = parser.parseFromString(fileContent, "application/xml");

      const mySvg = Array.from(dom.querySelectorAll("svg"))[0];
      const [minX, minY, width, height] = mySvg.getAttribute("viewBox").split(" ");
      console.log("inner svg dimensions", minX, minY, width, height);

      // circle, ellipse, line, mesh, path, polygon, polyline, rect
      const myPaths = Array.from(dom.querySelectorAll("path"));
      
      console.log(`Svg is ${height} units high. Final height: ${specs["final-height"]} cms`);
      const unitToMm = (unit) => unit * cmToMm(specs["final-height"]) / height;
      const mmToUnit = (mm) => mm * height / cmToMm(specs["final-height"]);
      console.log(`One unit is ${mmToCm(unitToMm(1))} cms, or ${unitToMm(1)} mms`);

      const pathToCartesianCoors = (path) => {
        const out = [];
        const totalMM = unitToMm(path.getTotalLength());
        for (let i = 0; i < totalMM; i++) {
          out.push(path.getPointAtLength(mmToUnit(i)));
        }
        return out;
      }

      const pointsToMotorMoves = ({ startingLeftLength, startingRightLength, points }) => {
        // for real-world coordinate system, center of top left spool is (0, 0)

        // strings always come off spools at a tangent, so can use spool radius and initial length as two sides of a right-angled triangle, solve for hypoteneuse, and use that as the radius for a circle centered at the spool's center

        return [];
      }

      if (myPaths.length > 0) {
        const firstPathLength = myPaths[0].getTotalLength();
        console.log(`The first path is ${firstPathLength} units long: ${unitToMm(firstPathLength)} mms, or ${mmToCm(unitToMm(firstPathLength))} cms, or ${mmToM(unitToMm(firstPathLength))} metres`);
        const points = pathToCartesianCoors(myPaths[0]);
        console.log(`got ${points.length} points from the first path, and the first point is ${points[0]}`);
        pointsToMotorMoves({ startingLeftLength: specs['initial-length-left'], startingRightLength: specs['initial-length-right'], points})
      } else {
        console.log("svg has no paths");
      }
    } else {
      console.log("not ready");
    }
  }
  
  return {
    ready,
    go
  };
}