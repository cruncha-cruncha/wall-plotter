import React from 'react';

import usePreview from './usePreview';

const Preview = () => {
  const { svg } = usePreview();

  return (
    <div className="mb-4">
      <div className="mb-2">
        <span>Preview</span>
      </div>
      <div className="d-flex">
        <div style={{ border: "1px solid black", height: "402px", minWidth: "402px", overflowY: "scroll" }}>
          {svg}
        </div>
      </div>
    </div>
  )
};

export default Preview;