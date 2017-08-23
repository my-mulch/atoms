import * as d3 from 'd3'
import React from 'react'
import $ from 'jquery'

import { connect } from 'react-redux'
import { search, clear } from '../redux/graph'
import { simulate, feature, init, draw, populate } from '../../d3/utils'

import Modal from './Modal'

class Force extends React.Component {

    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidUpdate() {
        this.populate(this.props.graph)
        this.draw()
        this.simulate()
    }

    componentDidMount() {
        console.log('MOUNTING')
        this.width = window.innerWidth
        this.height = window.innerHeight * 0.93

        this.svg = d3.select('svg')
        this.svg.attr('width', this.width).attr('height', this.height)

        this.init = init.bind(this)
        this.populate = populate.bind(this)
        this.draw = draw.bind(this)
        this.simulate = simulate.bind(this)
        this.search = this.props.search

        // simulation setup with all forces
        this.linkForce = this.init(feature.LINK_FORCE)
        this.simulation = this.init(feature.SIMULATION)
        this.dragDrop = this.init(feature.DRAG_DROP)

        // we use this.svg groups to logically group the elements together
        this.linkGroup = this.svg.append('g').attr('class', 'links')
        this.nodeGroup = this.svg.append('g').attr('class', 'nodes')
        this.textGroup = this.svg.append('g').attr('class', 'texts')

        this.nodes = []
        this.links = []
    }

    handleSubmit(event) {
        event.preventDefault()
        this.nodes = []
        this.links = []
        this.props.clear()
        $("html, body").animate({ scrollTop: 0 }, 500);
    }

    render() {
        return (
            Object.keys(this.props.graph.updated.nodes).length ? <form onSubmit={event => this.handleSubmit(event)}>
                <button type="submit" className="button">Clear All</button>
            </form> : null
        )
    }
}

const mapProps = ({ graph }) => ({ graph })
const mapDispatch = { search, clear }
export default connect(mapProps, mapDispatch)(Force)
