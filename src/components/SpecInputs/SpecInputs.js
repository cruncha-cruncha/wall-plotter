import React, { useEffect } from 'react';
import { Label, Input } from 'reactstrap';

import useSpecInputs from './useSpecInputs';

const SpecInputs = () => {

  const { specs, dispatch } = useSpecInputs();

  /*
  useEffect(() => {
    console.log("specs", specs);
  }, [specs])
  */

  return (
    <div>
      <h3>All measurements in cms. Left and right are as your facing the machine mounted on a wall.</h3>
      <Label>Spool-to-spool distance, measured from their centers</Label>
      <Input type="number" step="any" onChange={(e) => dispatch({ type: 'spool-to-spool', payload: e.target.value })} />
      <Label>Spool diameter</Label>
      <Input type="number" step="any" onChange={(e) => dispatch({ type: 'spool-diameter', payload: e.target.value })} />
      <Label>Initial length of left string (measured from where it breaks from the spool to where is ties to the tool holder)</Label>
      <Input type="number" step="any" onChange={(e) => dispatch({ type: 'initial-length-left', payload: e.target.value })} />
      <Label>Initial length of right string</Label>
      <Input type="number" step="any" onChange={(e) => dispatch({ type: 'initial-length-right', payload: e.target.value })} />
      <h2>Tool holder</h2>
      <Label>Left string horizontal to tool</Label>
      <Input type="number" step="any" onChange={(e) => dispatch({ type: 'tool-offset-left-horizontal', payload: e.target.value })} />
      <Label>Left string vertical to tool</Label>
      <Input type="number" step="any" onChange={(e) => dispatch({ type: 'tool-offset-left-vertical', payload: e.target.value })} />
      <Label>Right string horizontal to tool</Label>
      <Input type="number" step="any" onChange={(e) => dispatch({ type: 'tool-offset-right-horizontal', payload: e.target.value })} />
      <Label>Right string vertical to tool</Label>
      <Input type="number" step="any" onChange={(e) => dispatch({ type: 'tool-offset-right-vertical', payload: e.target.value })} />
    </div>
  )
}

export default SpecInputs;