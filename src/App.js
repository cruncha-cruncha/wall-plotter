import React from 'react';
import { RecoilRoot } from 'recoil';

import ImageHandler from './components/ImageHandler';
import SpecInputs from './components/SpecInputs';
import Converter from './components/Converter';
import Preview from './components/Preview';
import ConversionProgress from './components/ConversionProgress';

import './App.scss';

function App() {
  return (
    <RecoilRoot>
      <div className="container my-5">
        <div className="row">
          <div className="col-lg-6">
            <ImageHandler />
            <Preview />
            <ConversionProgress />
          </div>
          <div className="col-lg-6">
            <SpecInputs />
            <Converter />
          </div>
        </div>
      </div>
    </RecoilRoot>
  );
}

export default App;
