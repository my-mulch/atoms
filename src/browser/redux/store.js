import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from './index'

export default createStore(rootReducer,
    applyMiddleware(
        thunk,
        createLogger({ collapsed: true })
    )
)
