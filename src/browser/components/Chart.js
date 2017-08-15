import React from 'react';
import ScatterPlot from './ScatterPlot';
import { connect } from 'react-redux';

const styles = {
  width: 1500,
  height: 1500,
  padding: 50,
};

const Chart = ({ graph }) => (

  <div>
    <h1>Playing With React and D3</h1>
    <ScatterPlot graph={graph}/>
  </div>

)

const mapProps = knowledge => ({ graph: knowledge })
const mapDispatch = null

export default connect(mapProps, mapDispatch)(Chart)
