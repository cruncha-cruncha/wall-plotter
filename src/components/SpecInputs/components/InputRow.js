import React from 'react';
import { Label, Input } from 'reactstrap';

const InputRow = ({ label, actionType, specs, dispatch }) => {

  const fV = (val) => Number(val).toString();

  return (
    <div className="row mb-3">
      <div className="col-6 d-flex flex-row align-items-center">
        <Input id={actionType} type="number" step="any" value={fV(specs[actionType])} onChange={(e) => dispatch({ type: actionType, payload: e.target.value })} />
      </div>
      <div className="col-6 d-flex flex-row align-items-center">
        <Label for={actionType}>{label}</Label>
      </div>
    </div>
  )
}

export default InputRow;