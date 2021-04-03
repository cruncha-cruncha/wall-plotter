import { selector } from 'recoil';

import { realCoorsState } from './realCoors';

export const coorErrorsState = selector({
  key: 'coorErrors',
  get: ({get}) => {
    const realCoors = get(realCoorsState);

    if (!realCoors) {
      return { msg: 'Specs are not physically valid' };
    } else if (realCoors.outputRect.x + realCoors.outputRect.width > realCoors.rightEye.x) {
      return { msg: 'Can\'t draw outside vertical bounds of eyes' };
    } else {
      return null;
    }
  },
});