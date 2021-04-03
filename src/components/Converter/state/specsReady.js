import { selector } from 'recoil';

import { specErrorsState } from './specErrors';

export const specsReadyState = selector({
  key: 'specsReady',
  get: ({get}) => {
    const errors = get(specErrorsState);
    return !errors;
  },
});