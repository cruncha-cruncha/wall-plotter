import { selector } from 'recoil';

import { fileContentState } from '../../ImageHandler/state';
import { specsState } from '../../SpecInputs/state';

export const BOUNDS = {
  'step-resolution': {
    upper: 45,
    lower: 0.01
  },
  'feed-rate': {
    upper: 10,
    lower: 0.01
  },
  'final-height': {
    upper: 1000,
    lower: 1
  },
  'eye-to-eye': {
    upper: 1000,
    lower: 1
  },
  'spool-diameter': {
    upper: 50,
    lower: 0
  },
  'initial-length-left': {
    upper: 1000,
    lower: 0
  },
  'initial-length-right': {
    upper: 1000,
    lower: 0
  },
  'initial-coors-x': {
    upper: 1000,
    lower: 0
  },
  'initial-coors-y': {
    upper: 1000,
    lower: 0
  },
  'tool-offset-x': {
    upper: 50,
    lower: 0
  },
  'tool-offset-y': {
    upper: 50,
    lower: 0
  },
  'output-resolution': {
    upper: 10,
    lower: 0.1
  },
}

export const specErrorsState = selector({
  key: 'specErrors',
  get: ({get}) => {
    const fileContent = get(fileContentState);
    const specsAlpha = get(specsState);

    // do we have a file and specs?
    if (!fileContent || !specsAlpha) {
      return { msg: 'No image' };
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

    // is the initial position physically valid?
    if (specs['specify-start-by-coors']) {
      if (
        specs['initial-coors-x'] +
        (specs['tool-offset-x'] * 2) >
        specs['eye-to-eye']
      ) {
        return { msg: 'Specs are not physically valid' };
      }
    }

    return null;
  },
});