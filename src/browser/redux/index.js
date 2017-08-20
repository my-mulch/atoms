import { combineReducers } from 'redux'
import graph from './graph'
import completions from './completions'
import diagram from './diagram'


export default combineReducers({ graph, completions, diagram });
