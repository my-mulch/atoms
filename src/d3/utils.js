import * as d3 from 'd3'


export function populate(graph) {

        this.links.push(...graph.updated.links.map(
            // links for d3 require special form
            source => ({
                target: graph.updated.parent.id,
                source: source.id,
                strength: 0.1
            })
        ))
        
        this.nodes.push(...Object.values(graph.updated.nodes).map(
            // nodes for d3 require special form
            node => ({
                id: node.id,
                label: node.id,
                level: 2
            })
        ))
}

function domify(group, items, attributes, selection, tagFn) {
    const elements = group.selectAll(selection).data(items, tagFn)
    elements.exit().remove()

    const entryPoint = elements.enter().append(selection)
    Object.keys(attributes).forEach(attribute => {
        const setting = attributes[attribute]
        entryPoint.attr(attribute, setting)
    })

    return [entryPoint, elements]
}

export function draw() {
    let [linkEntry, linkElements] = domify(
        this.linkGroup,
        this.links,
        { 'stroke-width': 1, 'stroke': 'rgba(234, 220, 233, 0.5)' },
        'line',
        link => link.target.id + link.source.id
    )

    let [nodeEntry, nodeElements] = domify(
        this.nodeGroup,
        this.nodes,
        { 'r': 14, 'fill': node => node.level === 1 ? '#F9D463' : '#7084a3' },
        'circle',
        node => node.id
    )

    nodeEntry.call(this.dragDrop)
    nodeEntry.on('click', node => this.search(node.label))
    nodeEntry.on('hover', console.log)

    let [textEntry, textElements] = domify(
        this.textGroup,
        this.nodes,
        { 'font-size': 13, 'dx': 7, 'dy': -10, 'fill': 'white', 'font-weight': 'bold' },
        'text',
        node => node.id
    )

    textEntry.text(node => node.label)

    this.linkElements = linkEntry.merge(linkElements)
    this.nodeElements = nodeEntry.merge(nodeElements)
    this.textElements = textEntry.merge(textElements)

}


export function simulate() {

    this.simulation.nodes(this.nodes).on('tick', () => {
        this.nodeElements
            .attr('cx', node => node.x = Math.max(20, Math.min(this.width - 20, node.x)))
            .attr('cy', node => node.y = Math.max(20, Math.min(this.height - 20, node.y)))
        this.textElements
            .attr('x', node => node.x = Math.abs(Math.max(node.x, Math.min(this.width - node.x, node.x))))
            .attr('y', node => node.y = Math.abs(Math.max(node.y, Math.min(this.height - node.y, node.y))))
        this.linkElements
            .attr('x1', link => link.source.x)
            .attr('y1', link => link.source.y)
            .attr('x2', link => link.target.x)
            .attr('y2', link => link.target.y)
    })

    this.simulation.force('link').links(this.links)
    this.simulation.alphaTarget(0.7).restart()
}

const LINK_FORCE = 'LINK_FORCE'
const SIMULATION = 'SIMULATION'
const DRAG_DROP = 'DRAG_DROP'

export const feature = {
    LINK_FORCE,
    SIMULATION,
    DRAG_DROP
}


export function init(feature) {
    switch (feature) {
        case LINK_FORCE:
            return d3.forceLink()
                .id(link => link.id)
                .strength(link => link.strength)
                .distance(175)

        case SIMULATION:
            return d3.forceSimulation()
                .force('link', this.linkForce)
                .force('charge', d3.forceManyBody().strength(-225).distanceMax(500))
                .force('center', d3.forceCenter(this.width / 2, this.height / 2))

        case DRAG_DROP:
            return d3.drag()
                .on('start', node => {
                    node.fx = node.x
                    node.fy = node.y
                }).on('drag', node => {
                    this.simulation.alphaTarget(0.7).restart()
                    node.fx = d3.event.x
                    node.fy = d3.event.y
                }).on('end', node => {
                    if (!d3.event.active) {
                        this.simulation.alphaTarget(0)
                    }
                    node.fx = null
                    node.fy = null
                })

        default: throw new Error(`Cannot init ${feature}`)
    }
}
