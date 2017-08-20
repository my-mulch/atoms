import { combineReducers } from 'redux'
import graph from './graph'
import completions from './autoComplete'
import diagram from './d3'


export default combineReducers({ graph, completions, diagram });
