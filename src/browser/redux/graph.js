import axios from "axios"

/* ------------------------- ACTIONS -------------------------- */
const UPDATE = 'UPDATE_KNOWLEDGE_GRAPH';

/*---------------------- ACTION CREATORS -----------------------*/
const update = concept => ({ type: UPDATE, concept })

/* ------------------------- REDUCERS ------------------------- */
const reducer = (knowledge = [], action) => {
    return action.type === UPDATE ? [...knowledge, action.concept] : knowledge
}

/* ------------------------- THUNKS ------------------------- */
export const search = query => dispatch => {
    axios.post('/query', { query: query })
        .then(concept => {
            dispatch(update(concept.data))
        }).catch(console.error)
}

export default reducer