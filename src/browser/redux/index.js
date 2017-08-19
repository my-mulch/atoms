import { combineReducers } from 'redux';
import graph from './graph';
import completions from './autoComplete';

export default combineReducers({ graph, completions });
