import { selector } from 'recoil';

import { fileContentState } from '../../ImageHandler/state';
import { specsState } from '../../SpecInputs/state';

export const readyState = selector({
  key: 'ready',
  get: ({get}) => {
    const fileContent = get(fileContentState);
    const specs = get(specsState);

    // do we have a file and specs?
    if (!fileContent || !specs) {
      return false;
    }

    // have spec values been entered?
    if (
      !('step-resolution' in specs) ||
      !('final-height' in specs) ||
      !('spool-to-spool' in specs) ||
      !('spool-diameter' in specs) ||
      !('initial-length-left' in specs) ||
      !('initial-length-right' in specs) ||
      !('tool-offset-x' in specs) ||
      !('tool-offset-y' in specs)
    ) {
      return false;
    }

    // are all spec values above zero?
    if (
      (specs['step-resolution'] <= 0) ||
      (specs['final-height'] <= 0) ||
      (specs['spool-to-spool'] <= 0) ||
      (specs['spool-diameter'] < 0) ||
      (specs['initial-length-left'] <= 0) ||
      (specs['initial-length-right'] <= 0) ||
      (specs['tool-offset-x'] < 0) ||
      (specs['tool-offset-y'] < 0)
    ) {
      return false;
    }

    // are all spec values within a reasonable range?
    if (
      (specs['final-height'] > 1000) || // 10 metres
      (specs['spool-to-spool'] > 10000) || // 10 metres
      (specs['spool-diameter'] > 60) || // 60 centimetres
      (specs['initial-length-left'] > 500) || // 5 metres
      (specs['initial-length-right'] > 500) || // 5 metres
      (specs['tool-offset-x'] > 60) || // 60 centimetres
      (specs['tool-offset-y'] > 60) // 60 centimetres
    ) {
      return false;
    }

    // is the initial position physically valid?
    if (
      specs['initial-length-left'] + 
      specs['initial-length-right'] + 
      (specs['tool-offset-x'] * 2) <
      specs['spool-to-spool']
    ) {
      return false;
    }

    return true;
  },
});