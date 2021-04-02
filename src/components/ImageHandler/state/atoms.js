import { atom } from 'recoil';

export const fileContentState = atom({
  key: 'fileContents',
  default: ''
});