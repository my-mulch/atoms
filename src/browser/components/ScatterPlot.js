import React from 'react';
import * as d3 from 'd3'
import DataCircles from './DataCircles';


export default ({ graph }) => {

  const center = { cx: 1000, cy: 1000, r: 200 };

  return (
    <svg width={8000} height={8000}>
      <circle {...center} />
      <DataCircles {...graph} />
    </svg>
  )

}

