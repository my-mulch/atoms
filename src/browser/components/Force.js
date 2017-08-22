import * as d3 from 'd3'
import React from 'react'

import { connect } from 'react-redux'
import { search } from '../redux/graph'
import { initialize, populate, draw } from '../redux/diagram'
import { simulate, feature, init } from '../../d3/utils'



class Force extends React.Component {
    // componentDidMount() { createDiagram(this.props) }
    componentDidUpdate() { console.log(this.props) }

    constructor() {
        super()
        this.state = {
            nodes: [],
            links: [],
            linkForce: null,
            simulation: null,
            dragDrop: null
        }
    }

    render() {
        return (
            <svg ref={(svg) => {
                const width = window.innerWidth
                const height = window.innerHeight

                const d3svg = d3.select(svg)
                d3svg.attr('width', width).attr('height', height)

                // we use d3svg groups to logically group the elements together
                const linkGroup = d3svg.append('g').attr('class', 'links')
                const nodeGroup = d3svg.append('g').attr('class', 'nodes')
                const textGroup = d3svg.append('g').attr('class', 'texts')

                // simulation setup with all forces
                this.setState({ linkForce: init(feature.LINK_FORCE) })
                this.setState({ simulation: init(feature.SIMULATION) })
                this.setState({ dragDrop: init(feature.DRAG_DROP) })
            }} />
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
