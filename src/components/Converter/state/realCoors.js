import { selector } from 'recoil';

import { fileContentState } from '../../ImageHandler/state';
import { specsState } from '../../SpecInputs/state';
import { specsReadyState } from './specsReady';

export const realCoorsState = selector({
  key: 'realCoors',
  get: ({get}) => {
    const ready = get(specsReadyState);
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
    const [_minX, _minY, width, height] = mySvg.getAttribute("viewBox").split(" ");

    const unitToMm = (unit) => unit * cmToMm(specs["final-height"]) / height;

    if (specs['specify-start-by-coors']) {
      return {
        spoolDiameter: specs['spool-diameter'],
        leftSpool: { x: 0, y: 0 },
        rightSpool: { x: specs['spool-to-spool'], y: 0 },
        leftLine: {
          start: { x: 0, y: 0 },
          end: {
            x: specs['initial-coors-x'] - specs['tool-offset-x'],
            y: specs['initial-coors-y'] - specs['tool-offset-y'] }
        },
        rightLine: {
          start: { x: specs['spool-to-spool'], y: 0 },
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
        totalWidth: specs['spool-to-spool'],
        totalHeight: specs['initial-coors-y'] + mmToCm(unitToMm(height))
      }
    } else {
      // spool-to-spool = sqrt(initial-length-left^2 - y^2) + (tool-offset-x * 2) + sqrt(initial-length-right^2 - y^2)
      // solve for y

      const n1 = specs['spool-to-spool'] - (specs['tool-offset-x'] * 2);
      const n2 = Math.pow(specs['initial-length-right'], 2) - Math.pow(specs['initial-length-left'], 2) - Math.pow(n1, 2);

      const a = 4 * Math.pow(n1, 2);
      // b is always zero
      const c = -4 * Math.pow(n1, 2) * Math.pow(specs['initial-length-left'], 2) + Math.pow(n2, 2);

      const leftY2 = Math.sqrt(-4 * a * c) / (2 * a);
      const rightY2 = leftY2;
      const leftX2 = Math.sqrt(Math.pow(specs['initial-length-left'], 2) - Math.pow(leftY2, 2));
      const rightX2 = specs['spool-to-spool'] - Math.sqrt(Math.pow(specs['initial-length-right'], 2) - Math.pow(rightY2, 2));

      if (isNaN(leftY2) || isNaN(rightY2) || isNaN(leftX2) || isNaN(rightX2)) {
        return null;
      }

      if (Math.round(rightX2 * 100) / 100 !== Math.round((leftX2 + (specs['tool-offset-x'] * 2)) * 100) / 100) {
        return null;
      }

      return {
        spoolDiameter: specs['spool-diameter'],
        leftSpool: { x: 0, y: 0 },
        rightSpool: { x: specs['spool-to-spool'], y: 0 },
        leftLine: {
          start: { x: 0, y: 0 },
          end: { x: leftX2, y: leftY2 }
        },
        rightLine: {
          start: { x: specs['spool-to-spool'], y: 0 },
          end: { x: rightX2, y: rightY2 }
        },
        outputRect: {
          x: leftX2 + specs['tool-offset-x'],
          y: leftY2 + specs['tool-offset-y'],
          width: mmToCm(unitToMm(width)),
          height: mmToCm(unitToMm(height))
        },
        totalWidth: specs['spool-to-spool'],
        totalHeight: leftY2 + specs['tool-offset-y'] + mmToCm(unitToMm(height))
      }
    } 
  }
});