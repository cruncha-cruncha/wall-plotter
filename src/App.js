import React from 'react';
import { RecoilRoot } from 'recoil';

import ImageHandler from './components/ImageHandler';
import SpecInputs from './components/SpecInputs';

function App() {
  return (
    <RecoilRoot>
      <div className="container my-5">
        <ImageHandler />
        <SpecInputs />
      </div>
    </RecoilRoot>
  );
}

export default App;
