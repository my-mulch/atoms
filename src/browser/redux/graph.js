import axios from "axios"

const UPDATE = 'UPDATE_KNOWLEDGE_GRAPH';

const update = concept => ({ type: UPDATE, concept })

const reducer = (knowledge = [], action) => {
    return action.type === UPDATE ? [...knowledge, action.concept] : knowledge
}

export const search = query => dispatch => {
    axios.get(`/wiki?input=${query}`)
        .then(res => dispatch(update(res.data)))
        .catch(console.error)
}

export default reducer