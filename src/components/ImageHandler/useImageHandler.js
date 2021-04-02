import { useSetRecoilState } from 'recoil';

import { fileContentState } from './state';

export default function useImageHandler() {
  const setFileContent = useSetRecoilState(fileContentState);

  return {
    setFileContent
  };
}