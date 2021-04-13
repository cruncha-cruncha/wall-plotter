import React from 'react';

import useConversionProgress from './useConversionProgress';

const ConversionProgress = () => {
  const { progress } = useConversionProgress();

  return (
    <div>
      <div className="mb-2">
        <span>Progress</span>
      </div>
      <div className="d-flex">
        <div style={{ border: "1px solid black", height: "402px", width: "402px", overflowY: "scroll", padding: "10px" }}>
          {progress.map(msg => <div key={msg}><span>&gt; {msg}</span></div>)}
        </div>
      </div>
    </div>
  );
}

export default ConversionProgress;