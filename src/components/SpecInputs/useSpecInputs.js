import { useRecoilState } from 'recoil';

import { specsState } from './state';

export default function useSpecInputs() {
  const [ specs, setSpecs ] = useRecoilState(specsState);

  const dispatch = (action) => {
    setSpecs({
      ...specs,
      [action.type]: action.payload
    });
  }

  return {
    specs,
    dispatch
  }
}