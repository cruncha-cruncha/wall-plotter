import { atom } from 'recoil';

export const specsState = atom({
  key: "specs",
  default: {
    'step-resolution': 1.8,
    'final-height': 60,
    'spool-to-spool': 150,
    'spool-diameter': 4,
    'initial-length-left': 42,
    'initial-length-right': 124,
    'tool-offset-x': 2,
    'tool-offset-y': 1.5
  }
});