import { selector } from 'recoil';

import { fileContentState } from '../../ImageHandler/state';
import { specsState } from '../../SpecInputs/state';
import { coorsReadyState } from './coorsReady';

import solveCoors from '../helpers/solveCoors';

export const realCoorsState = selector({
  key: 'realCoors',
  get: ({get}) => {
    const ready = get(coorsReadyState);
    const specsAlpha = get(specsState);
    const fileContent = get(fileContentState);

    if (!ready) {
      return null;
    }

    const specs = Object.keys(specsAlpha).reduce((out, k) => ({
      ...out,
      [k]: Number(specsAlpha[k])
    }), {});

    const mmToCm = (mm) => mm / 10;
    const cmToMm = (cm) => cm * 10;

    const parser = new DOMParser();
    const dom = parser.parseFromString(fileContent, "application/xml");

    const mySvg = Array.from(dom.querySelectorAll("svg"))[0];
    if (!mySvg.getAttribute("viewBox")) {
      alert("SVG needs a viewBox");
      return;
    }

    const [_minX, _minY, width, height] = mySvg.getAttribute("viewBox").split(",");

    const unitToMm = (unit) => unit * cmToMm(specs["final-height"]) / height;

    if (specs['specify-start-by-coors']) {
      return {
        spoolRadius: specs['spool-radius'],
        leftEye: { x: 0, y: 0 },
        rightEye: { x: specs['eye-to-eye'], y: 0 },
        leftLine: {
          start: { x: 0, y: 0 },
          end: {
            x: specs['initial-coors-x'] - specs['tool-offset-x'],
            y: specs['initial-coors-y'] - specs['tool-offset-y'] }
        },
        rightLine: {
          start: { x: specs['eye-to-eye'], y: 0 },
          end: {
            x: specs['initial-coors-x'] + specs['tool-offset-x'],
            y: specs['initial-coors-y'] - specs['tool-offset-y']
          }
        },
        outputRect: {
          x: specs['initial-coors-x'],
          y: specs['initial-coors-y'],
          width: mmToCm(unitToMm(width)),
          height: mmToCm(unitToMm(height))
        },
        totalWidth: specs['eye-to-eye'],
        totalHeight: specs['initial-coors-y'] + mmToCm(unitToMm(height))
      }
    } else {
      const coors = solveCoors({
        eyeToEye: specs['eye-to-eye'],
        toolOffsetX: specs['tool-offset-x'],
        toolOffsetY: specs['tool-offset-y'],
        leftLength: specs['initial-length-left'],
        rightLength: specs['initial-length-right'],
      });

      if (!coors) {
        return null;
      }

      if (isNaN(coors.x) || isNaN(coors.y)) {
        return null;
      }

      const leftY2 = coors.y - specs['tool-offset-y'];
      const rightY2 = leftY2;
      const leftX2 = coors.x - specs['tool-offset-x'];
      const rightX2 = coors.x + specs['tool-offset-x'];

      return {
        spoolRadius: specs['spool-radius'],
        leftEye: { x: 0, y: 0 },
        rightEye: { x: specs['eye-to-eye'], y: 0 },
        leftLine: {
          start: { x: 0, y: 0 },
          end: { x: leftX2, y: leftY2 }
        },
        rightLine: {
          start: { x: specs['eye-to-eye'], y: 0 },
          end: { x: rightX2, y: rightY2 }
        },
        outputRect: {
          x: leftX2 + specs['tool-offset-x'],
          y: leftY2 + specs['tool-offset-y'],
          width: mmToCm(unitToMm(width)),
          height: mmToCm(unitToMm(height))
        },
        totalWidth: specs['eye-to-eye'],
        totalHeight: leftY2 + specs['tool-offset-y'] + mmToCm(unitToMm(height))
      }
    } 
  }
});