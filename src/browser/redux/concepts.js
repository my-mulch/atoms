import axios from "axios"

/* ------------------------- ACTIONS -------------------------- */
const UPDATE = 'UPDATE_KNOWLEDGE_GRAPH';

/*---------------------- ACTION CREATORS -----------------------*/
const update = concepts => ({ type: UPDATE, concepts })

/* ------------------------- REDUCERS ------------------------- */
const reducer = (knowledge = {}, action) => {
    return action.type === UPDATE ? action.concepts : knowledge
}

/* ------------------------- THUNKS ------------------------- */
export const search = query => dispatch => {
    axios.post('/query', { query: query })
        .then(concepts => {
            dispatch(update(concepts.data))
        }).catch(console.error)
}

export default reducer