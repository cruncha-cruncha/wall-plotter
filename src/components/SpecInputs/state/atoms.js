import { atom } from 'recoil';

export const specsState = atom({
  key: "specs",
  default: {
    'step-resolution': '0.225',
    'final-height': '20',
    'spool-radius': '2',
    'eye-to-eye': '101',
    'specify-start-by-coors': true,
    'initial-length-left': '42',
    'initial-length-right': '124',
    'initial-coors-x': '42',
    'initial-coors-y': '58',
    'tool-offset-x': '3',
    'tool-offset-y': '2'
  }
});