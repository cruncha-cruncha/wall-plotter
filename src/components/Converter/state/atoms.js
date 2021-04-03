import { atom } from 'recoil';

export const outputState = atom({
  key: 'output',
  default: {}
});

export const progressState = atom({
  key: 'progress',
  default: []
});