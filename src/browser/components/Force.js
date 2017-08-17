import React from 'react'
import { connect } from 'react-redux'
import { search } from '../redux/concepts'
import { populate, init, update, simulate } from '../../d3/utils'
import * as d3 from 'd3'



const Force = ({ graph, search }) => {

    if (Object.keys(graph).length) {


        const [width, height, svg,
            linkGroup, nodeGroup, textGroup,
            linkForce, forces, dragDrop] = init(d3)

        const [nodes, links] = populate(graph)
        const [linkElements, nodeElements, textElements] = update({ linkGroup, nodeGroup, textGroup, nodes, links, dragDrop })

        simulate(forces, nodeElements, textElements, linkElements, nodes, links)

    }

    return null
}

const mapProps = store => ({ graph: store.graph })
const mapDispatch = { search }
export default connect(mapProps, mapDispatch)(Force)
