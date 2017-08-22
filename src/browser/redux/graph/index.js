import axios from "axios"
import helper from './utils' // findOrCreate

const UPDATE = 'UPDATE_KNOWLEDGE_GRAPH';

const update = parentNode => ({ type: UPDATE, parentNode })

const reducer = (graph = {}, action) => {

    switch (action.type) {
        case UPDATE:
            const newGraph = Object.assign({}, graph)
            // find or create with new graph as 'this' context
            const findOrCreate = helper.bind(newGraph)
            // find/create the root node
            const parent = findOrCreate(action.parentNode.title)
            // add all relations to adjacency list
            parent.adj = action.parentNode.relations.map(findOrCreate)
            return newGraph
    }

    return graph
}

export const search = query => dispatch => {
    axios.get(`/wiki?input=${query}`)
        .then(res => dispatch(update(res.data)))
        .catch(console.error)
}

export default reducer