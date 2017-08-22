// import axios from "axios"
// import { diagram, skeleton, rendering } from '../../d3/utils'

// const POPULATE = 'POPULATE_FORCE_GRAPH'
// const SETUP = 'CREATE_FORCE_GRAPH'
// const DRAW = 'DRAW_FORCE_GRAPH'

// const setup = diagram => ({ type: SETUP, diagram })
// const fill = graph => ({ type: POPULATE, graph })
// const sketch = graph => ({ type: DRAW, graph })


// const reducer = (diagram = {}, action) => {
//     switch (action.type) {
//         case POPULATE: return Object.assign(diagram, action.graph)
//         case DRAW: return Object.assign(diagram, action.graph)
//         case SETUP: return action.diagram
//     }
//     return diagram
// }

// export const initialize = d3 => dispatch =>
//     dispatch(setup(diagram(d3)))

// export const populate = graph => dispatch =>
//     dispatch(fill(skeleton(graph)))

// export const draw = diagram => dispatch =>
//     dispatch(sketch(rendering(diagram)))

// export default reducer