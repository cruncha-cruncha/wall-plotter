import { atom } from 'recoil';

export const specsState = atom({
  key: "specs",
  default: {
    'step-resolution': '1.8',
    'feed-rate': '1',
    'final-height': '60',
    'spool-to-spool': '150',
    'spool-diameter': '4',
    'specify-start-by-coors': false,
    'initial-length-left': '42',
    'initial-length-right': '124',
    'initial-coors-x': '30',
    'initial-coors-y': '30',
    'tool-offset-x': '2',
    'tool-offset-y': '1.5',
    'output-resolution': '0.5'
  }
});