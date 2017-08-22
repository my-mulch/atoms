import * as d3 from 'd3'
import React from 'react'

import { connect } from 'react-redux'
import { search } from '../redux/graph'
import { initialize, populate, draw } from '../redux/diagram'
import { simulate } from '../../d3/utils'


class Force extends React.Component {
    componentDidMount() { createDiagram(this.props) }
    componentDidUpdate() { updateDiagram(this.props) }
    render() {
        return (
            <div id="svg-container"></div>
        )
    }
}

const createDiagram = ({ initialize }) => initialize(d3)
const updateDiagram = ({ populate, draw, graph, diagram }) => {
    populate(graph)
    draw(diagram)
    simulate(diagram)
    return null
}

const mapProps = ({ graph, diagram }) => ({ graph, diagram })
const mapDispatch = { search, initialize, populate, draw }
export default connect(mapProps, mapDispatch)(Force)
