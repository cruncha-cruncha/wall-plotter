import { atom } from 'recoil';

export const specsState = atom({
  key: "specs",
  default: {
    'step-resolution': '1.8',
    'final-height': '60',
    'spool-radius': '2',
    'eye-to-eye': '150',
    'specify-start-by-coors': false,
    'initial-length-left': '42',
    'initial-length-right': '124',
    'initial-coors-x': '30',
    'initial-coors-y': '30',
    'tool-offset-x': '2',
    'tool-offset-y': '1.5'
  }
});