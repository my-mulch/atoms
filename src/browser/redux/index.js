import { combineReducers } from 'redux'
import graph from './graph'
import completions from './completions'


export default combineReducers({ graph, completions });
