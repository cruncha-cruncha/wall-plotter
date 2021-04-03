import React from 'react';
import { Button } from 'reactstrap';

import useConverter from './useConverter';

const Converter = () => {
  const { ready, go } = useConverter();

  return (
    <Button disabled={!ready} onClick={go}>Calc motor control</Button>
  );
}

export default Converter;