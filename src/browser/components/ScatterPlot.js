import React from 'react';
import * as d3 from 'd3'
import DataCircles from './DataCircles';


export default ({ graph }) => {

  const center = { cx: 1000, cy: 1000, r: 400 };

  return (
    <svg width={2000} height={2000}>
      <circle {...center} />
      <DataCircles {...graph} />
    </svg>
  )

}

