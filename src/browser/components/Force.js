import * as d3 from 'd3'
import React from 'react'

import { connect } from 'react-redux'
import { search } from '../redux/graph'
import { simulate, feature, creator } from '../../d3/utils'



class Force extends React.Component {

    componentDidUpdate() { 
        Object.values(this.props.graph)
    }

    render() {
        return (
            <svg ref={(svg) => {
                this.width = window.innerWidth
                this.height = window.innerHeight

                this.svg = d3.select(svg)
                this.svg.attr('width', this.width).attr('height', this.height)

                const init = creator.bind(this)

                // simulation setup with all forces
                this.linkForce = init(feature.LINK_FORCE)
                this.simulation = init(feature.SIMULATION)
                this.dragDrop = init(feature.DRAG_DROP)

                // we use this.svg groups to logically group the elements together
                this.linkGroup = this.svg.append('g').attr('class', 'links')
                this.nodeGroup = this.svg.append('g').attr('class', 'nodes')
                this.textGroup = this.svg.append('g').attr('class', 'texts')

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

const mapProps = ({ graph }) => ({ graph })
const mapDispatch = { search }
export default connect(mapProps, mapDispatch)(Force)
