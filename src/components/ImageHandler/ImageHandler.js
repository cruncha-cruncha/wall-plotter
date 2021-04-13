import React, { useState } from 'react';
import { Label, Input } from 'reactstrap';

import useImageHandler from './useImageHandler';

function ImageHandler() {
  const { setFileContent } = useImageHandler();
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const newFile = URL.createObjectURL(e.target.files[0]);
    setFile(newFile);

    const reader = new FileReader();
    reader.onload = () => { setFileContent(reader.result); };
    reader.readAsText(e.target.files[0]);
  }

  return (
    <div className="mb-4">
      <div className="mb-3">
        <Label for="select-svg-input">Select an SVG</Label>
        <Input type="file" id="select-svg-input" accept=".svg" onChange={handleChange} />
      </div>
      <div className="d-flex">
        <div style={{ border: '1px solid black', height: "402px", overflowY: "scroll" }} >
          {file && <img src={file} width="400" alt="selected img" />}
        </div>
      </div>
    </div>
  );
}

export default ImageHandler;