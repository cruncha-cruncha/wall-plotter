import { selector } from 'recoil';

import { coorErrorsState } from './coorErrors';

export const coorsReadyState = selector({
  key: 'coorsReady',
  get: ({get}) => {
    const errors = get(coorErrorsState);
    return !errors;
  },
});