import { atom } from 'recoil';

export const progressState = atom({
  key: 'progress',
  default: []
});

export const downloadBlobState = atom({
  key: 'downloadBload',
  default: null
})