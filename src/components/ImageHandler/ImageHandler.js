import React, { useState, useRef } from 'react';
import { Label, Input } from 'reactstrap';

import useImageHandler from './useImageHandler';

function ImageHandler() {
  const { setFileContent } = useImageHandler();
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const newFile = URL.createObjectURL(e.target.files[0]);
    setFile(newFile);

    const reader = new FileReader();
    reader.onload = () => { setFileContent(reader.results); };
    reader.readAsText(e.target.files[0]);

    // const parser = new DOMParser();
    // const dom = parser.parseFromString(fileContent, "application/xml");
    //
    // const myPath = Array.from(svgObject.querySelectorAll("path"));
    // const length = myPath.getTotalLength();
    // https://developer.mozilla.org/en-US/docs/Web/API/SVGGeometryElement/getPointAtLength
  }

  return (
    <div>
      <div className="mb-3">
        <Label for="select-svg-input">Select an SVG</Label>
        <Input type="file" id="select-svg-input" accept=".svg" onChange={handleChange} />
      </div>
      {file && (
        <div className="d-flex">
          <div style={{ border: '2px solid black' }} >
            <img src={file} width="400" alt="selected img" />
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageHandler;