import React, { Fragment } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

import useSpecInputs from './useSpecInputs';
import InputRow from './components/InputRow';

const SpecInputs = () => {

  const { specs, dispatch } = useSpecInputs();

  return (
    <div className="specifications">
      <h2>Specifications</h2>
      <p>All values in cms unless otherwise specified.</p>
      <InputRow label="Step Resolution (degrees)" actionType='step-resolution' specs={specs} dispatch={dispatch} />
      <InputRow label="Feed Rate (cm/s)" actionType="feed-rate" specs={specs} dispatch={dispatch} />
      <InputRow label="Spool Diameter" actionType='spool-diameter' specs={specs} dispatch={dispatch} />
      <InputRow label="Spool-To-Spool, from centers" actionType='spool-to-spool' specs={specs} dispatch={dispatch} />
      <InputRow label="Output Height" actionType='final-height' specs={specs} dispatch={dispatch} />
      <InputRow label="Output Resolution" actionType="output-resolution" specs={specs} dispatch={dispatch} />
      <p>It's assumed that the plotter uses two strings, each with one end wound around a spool and the other attached to a symmetrical tool holder. The program will start drawing from the upper-left corner of the image.</p>
      <FormGroup tag="fieldset">
        <legend>Initial Position</legend>
        <FormGroup check>
          <Label check>
            <Input
              type="radio"
              onChange={() => dispatch({ type: 'specify-start-by-coors', payload: false })}
              checked={!specs['specify-start-by-coors']}/>{' '}
            Specify by distance from spools
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input
              type="radio"
              onChange={() => dispatch({ type: 'specify-start-by-coors', payload: true })}
              checked={specs['specify-start-by-coors']}/>{' '}
            Specify by horizontal and vertical offset
          </Label>
        </FormGroup>
      </FormGroup>
      {specs['specify-start-by-coors'] 
        ? (
          <Fragment>
            <p>Measure from the center of the left spool to the top left corner of the desired image location.</p>
            <InputRow label="Horizontal Offset" actionType='initial-coors-x' specs={specs} dispatch={dispatch} />
            <InputRow label="Vertical Offset" actionType='initial-coors-y' specs={specs} dispatch={dispatch} />
          </Fragment>)
        : (
          <Fragment>
            <p>Measure from the center of either the left or right spool to the corresponding tool holder terminus (where the string connects).</p>
            <InputRow label="Left, initial distance" actionType='initial-length-left' specs={specs} dispatch={dispatch} />
            <InputRow label="Right, initial distance" actionType='initial-length-right' specs={specs} dispatch={dispatch} />
          </Fragment>)}
      <p>The left terminus is assumed to be above and to the left of the tool, while the right terminus is assumed to be above and to the right of the tool. "Horizontal Terminus Offset" is the horizontal distance between a terminus and the tool tip (it should be the same for both termini); "Vertical Terminus Offset" is the vertical distance between a terminus and the tool tip (should also be the same for both).</p>
      <InputRow label="Horizontal Terminus Offset" actionType='tool-offset-x' specs={specs} dispatch={dispatch} />
      <InputRow label="Vertical Terminus Offset" actionType='tool-offset-y' specs={specs} dispatch={dispatch} />
    </div>
  )
}

export default SpecInputs;