import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from './index'

export default createStore(rootReducer, applyMiddleware(thunk, logger));
