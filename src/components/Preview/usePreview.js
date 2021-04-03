import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { realCoorsState } from '../Converter/state';

export default function usePreview() {
  const coors = useRecoilValue(realCoorsState);
  const [svg, setSvg] = useState(null);

  const padding = 20;

  useEffect(() => {
    if (coors) {
      const newSvg = (
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="400"
          viewBox={`-${padding} -${padding} ${coors.totalWidth + 2 * padding} ${coors.totalHeight + 2 * padding}`}>
          <line 
            x1={coors.leftLine.start.x}
            y1={coors.leftLine.start.y}
            x2={coors.leftLine.end.x}
            y2={coors.leftLine.end.y}
            style={{ stroke: "black", strokeWidth: 1 }} />
          <line 
            x1={coors.rightLine.start.x}
            y1={coors.rightLine.start.y}
            x2={coors.rightLine.end.x}
            y2={coors.rightLine.end.y}
            style={{ stroke: "black", strokeWidth: 1 }} />
          <rect
            x={coors.outputRect.x}
            y={coors.outputRect.y}
            width={coors.outputRect.width}
            height={coors.outputRect.height}
            style={{ fill: "blue" }} />
          <circle
            cx={coors.leftSpool.x}
            cy={coors.leftSpool.y}
            r={coors.spoolDiameter / 2}
            fill="black" />
          <circle
            cx={coors.rightSpool.x}
            cy={coors.rightSpool.y}
            r={coors.spoolDiameter / 2}
            fill="black" />
        </svg>
      )
      setSvg(newSvg);
    } else {
      setSvg(null);
    }
  }, [coors]);

  return { 
    svg
  };
}