import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import axios from "axios"

/* ------------------------- ACTION -------------------------- */
const UPDATE = 'UPDATE_KNOWLEDGE_GRAPH';

/*---------------------- ACTION CREATOR -----------------------*/
const update = concepts => ({ type: UPDATE, concepts })

/* ------------------------- REDUCER ------------------------- */
const reducer = (knowledge = {}, action) => {
    const newKnowledge = Object.assign({}, knowledge)
    if (action.type === UPDATE)
        newKnowledge = Object.assign({}, action.concepts)
    return newKnowledge
}
/* ------------------------- THUNKS ------------------------- */
export const search = query => dispatch => {
    axios.post('/query', { query: query })
        .then(concepts => {
            dispatch(update(concepts.data))
        }).catch(console.error)
}

export default createStore(reducer, applyMiddleware(thunk, logger));