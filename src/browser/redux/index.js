import { combineReducers } from 'redux';
import graph from './concepts';
import suggestions_reducer from './suggestions';

export default combineReducers({ graph, suggestions_reducer });
