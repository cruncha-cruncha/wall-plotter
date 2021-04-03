import { useRecoilValue } from 'recoil';

import { progressState } from '../Converter/state';

export default function useConversionProgress() {
  const progress = useRecoilValue(progressState);

  return {
    progress
  };
}