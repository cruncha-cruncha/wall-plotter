import React from 'react';
import { Button } from 'reactstrap';

import useConverter from './useConverter';

const Converter = () => {
  const { specErrors, coorErrors, ready, go } = useConverter();

  return (
    <div className="row">
      <div className="col-12">
        <div className="my-2">
          {specErrors 
            ? <span className="text-danger">{specErrors.msg}</span>
            : coorErrors 
              ? <span className="text-danger">{coorErrors.msg}</span>
              : null
          }
        </div>
      </div>
      <div className="col-12">
        <Button disabled={!ready} onClick={go}>Calc motor control</Button>
      </div>
    </div>
  );
}

export default Converter;