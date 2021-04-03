import { selector } from 'recoil';

import { fileContentState } from '../../ImageHandler/state';
import { specsState } from '../../SpecInputs/state';
import { readyState } from './ready';

export const realCoorsState = selector({
  key: 'realCoors',
  get: ({get}) => {
    const ready = get(readyState);
    const specs = get(specsState);
    const fileContent = get(fileContentState);

    if (!ready) {
      return null
    }

    const mmToCm = (mm) => mm / 10;
    const cmToMm = (cm) => cm * 10;

    const parser = new DOMParser();
    const dom = parser.parseFromString(fileContent, "application/xml");

    const mySvg = Array.from(dom.querySelectorAll("svg"))[0];
    const [_minX, _minY, width, height] = mySvg.getAttribute("viewBox").split(" ");

    const unitToMm = (unit) => unit * cmToMm(specs["final-height"]) / height;

    const n1 = specs['spool-to-spool'] - (specs['tool-offset-x'] * 2);
    const n2 = Math.pow(specs['initial-length-right'], 2) - Math.pow(specs['initial-length-left'], 2) - Math.pow(n1, 2);

    const a = 4 * Math.pow(n1, 2);
    // b is always zero
    const c = -4 * Math.pow(n1, 2) * Math.pow(specs['initial-length-left'], 2) + Math.pow(n2, 2);

    const leftY2 = Math.sqrt(-4 * a * c) / (2 * a);
    const rightY2 = leftY2;
    const leftX2 = Math.sqrt(Math.pow(specs['initial-length-left'], 2) - Math.pow(leftY2, 2));
    const rightX2 = specs['spool-to-spool'] - Math.sqrt(Math.pow(specs['initial-length-right'], 2) - Math.pow(rightY2, 2));

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
});