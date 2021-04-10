import React from 'react';
import { Button } from 'reactstrap';

import useConverter from './useConverter';

const Converter = () => {
  const { specErrors, coorErrors, ready, go, downloadHref } = useConverter();

  return (
    <div className="row">
      <div className="col-12">
        <div className="my-2">
          {coorErrors 
            ? <span className="text-danger">{coorErrors.msg}</span>
            : specErrors 
              ? <span className="text-danger">{specErrors.msg}</span>
              : null
          }
        </div>
      </div>
      <div className="col-12">
        <Button disabled={!ready} onClick={go}>Calc motor control</Button>
      </div>
      <div className="col-12 my-3">
        {downloadHref !== '' && <a href={downloadHref} download="motorControl.json">download</a>}
      </div>
    </div>
  );
}

export default Converter;