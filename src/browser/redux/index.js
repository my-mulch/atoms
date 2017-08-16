import { combineReducers } from 'redux';
import concept_reducer from './concepts';
import suggestions_reducer from './suggestions';

export default combineReducers({ concept_reducer, suggestions_reducer });
