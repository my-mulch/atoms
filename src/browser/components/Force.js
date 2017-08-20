import React from 'react'
import { connect } from 'react-redux'
import { search } from '../redux/graph'
import { initialize, populate } from '../redux/d3'
// import { populate, init, update, simulate } from '../../d3/utils'
import * as d3 from 'd3'
import $ from 'jquery'

class Force extends React.Component {

    componentDidMount() { this.props.initialize(d3) }

    render() {
        Object.keys(this.props.graph).length
            && this.props.populate(this.props.graph)

        return null
    }



    // const[linkElements, nodeElements, textElements] = update({
    //         linkGroup,
    //     nodeGroup,
    //     textGroup,
    //     nodes,
    //     links,
    //     dragDrop,
    //     search
    //     })

    // simulate(forces, nodeElements, textElements, linkElements, nodes, links, width, height)


    //     return null
}

const mapProps = store => ({ graph: store.graph })
const mapDispatch = { search, initialize, populate }
export default connect(mapProps, mapDispatch)(Force)
