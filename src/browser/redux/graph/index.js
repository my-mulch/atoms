import axios from "axios"
import foc from './utils' // findOrCreate

const UPDATE = 'UPDATE_KNOWLEDGE_GRAPH';

const update = parentNode => ({ type: UPDATE, parentNode })

// graph has updated nodes to ease d3 force graph updates
const initialState = {
    all: {},
    updated: {}
}

const reducer = (graph = initialState, action) => {

    switch (action.type) {
        case UPDATE:

            // empties updated graph state
            const newGraph = Object.assign({}, graph, { updated: {} })
            // find or create with new graph as 'this' context
            const findOrCreate = foc.bind(newGraph)
            // find/create the root node
            const parent = findOrCreate(action.parentNode.title)
            newGraph.updated[parent.title] = parent
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