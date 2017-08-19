import { combineReducers } from 'redux';
import graph from './concepts';
import completions from './suggestions';

export default combineReducers({ graph, completions });
