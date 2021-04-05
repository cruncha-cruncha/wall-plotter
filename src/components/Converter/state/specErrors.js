import { selector } from 'recoil';

import { specsState } from '../../SpecInputs/state';
import { realCoorsState } from './realCoors';

export const BOUNDS = {
  'step-resolution': {
    upper: 45,
    lower: 0.01
  },
  'feed-rate': {
    upper: 10,
    lower: 0.01
  },
  'output-resolution': {
    upper: 10,
    lower: 0.1
  },
}

export const specErrorsState = selector({
  key: 'specErrors',
  get: ({get}) => {
    const realCoors = get(realCoorsState);
    const specsAlpha = get(specsState);

    if (!realCoors) {
      return { msg: 'Specs are not physically valid' };
    } else if (realCoors.outputRect.x + realCoors.outputRect.width > realCoors.rightEye.x) {
      return { msg: 'Can\'t draw outside vertical bounds of eyes' };
    }

    const specs = Object.keys(specsAlpha).reduce((out, k) => ({
      ...out,
      [k]: Number(specsAlpha[k])
    }), {});

    // have spec values been entered?
    for (let k of Object.keys(BOUNDS)) {
      if (!(k in specs)) {
        return { spec: k, msg: `Missing ${k} specification` };
      }
    }

    // are all spec values within a reasonable range? (lower bounds)
    for (let k of Object.keys(BOUNDS)) {
      if (specs[k] > BOUNDS[k].upper) {
        return { spec: k, msg: `${k} is too high; max is ${BOUNDS[k].upper}` };
      } else if (specs[k] < BOUNDS[k].lower) {
        return { spec: k, msg: `${k} is too low; minimum is ${BOUNDS[k].lower}` };
      }
    }

    return null;
  },
});