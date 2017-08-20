import * as d3 from 'd3'
import React from 'react'

import { connect } from 'react-redux'
import { search } from '../redux/graph'
import { initialize, populate, draw } from '../redux/diagram'
import { simulate } from '../../d3/utils'


class Force extends React.Component {
    componentDidMount() { this.props.initialize(d3) }
    render() { return forceDiagram(this.props) }
}

const forceDiagram = ({ populate, draw, graph, diagram }) => {
    if (Object.keys(graph).length) {
        populate(graph)
        draw(diagram)
        simulate(diagram)
    }
    return null
}

const mapProps = ({ graph, diagram }) => ({ graph, diagram })
const mapDispatch = { search, initialize, populate, draw }
export default connect(mapProps, mapDispatch)(Force)
