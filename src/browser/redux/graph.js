import axios from "axios"

const UPDATE = 'UPDATE_KNOWLEDGE_GRAPH';

const update = concept => ({ type: UPDATE, concept })

const reducer = (graph = [], action) => {
    return action.type === UPDATE ? [...graph, action.concept] : graph
}

export const search = query => dispatch => {
    axios.get(`/wiki?input=${query}`)
        .then(res => dispatch(update(res.data)))
        .catch(console.error)
}

export default reducer