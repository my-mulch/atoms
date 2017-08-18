import $ from 'jquery'

export function populate(graph) {
    const nodes = []
    const links = []
    graph.forEach((concept, group) => {
        const center = { id: concept.name.toLowerCase(), group, label: concept.name.toUpperCase(), level: 1 }
        concept.children.forEach(relation => {
            links.push({ target: center.id, source: relation.name.toLowerCase(), strength: 0.1 })
            nodes.push({ id: relation.name.toLowerCase(), group: 0, label: relation.name, level: 2 })
        })
        nodes.push(center)
    })

    return [nodes, links]
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

export function simulate(simulation, nodeElements, textElements, linkElements, nodes, links) {

    const width = window.innerWidth
    const height = window.innerHeight

    simulation.nodes(nodes).on('tick', () => {
        nodeElements
            // .attr('cx', node => node.x)
            // .attr('cy', node => node.y)
            .attr('cx', function (node) { return node.x = Math.max(20, Math.min(width - 20, node.x)); })
            .attr('cy', function (node) { return node.y = Math.max(20, Math.min(height - 20, node.y)); })
        textElements
            // .attr('x', node => node.x)
            // .attr('y', node => node.y)
            .attr('x', function (node) { return node.x = Math.abs(Math.max(node.x, Math.min(width - node.x, node.x))) })
            .attr('y', function (node) { return node.y = Math.abs(Math.max(node.y, Math.min(height - node.y, node.y))) })
        linkElements
            .attr('x1', link => link.source.x)
            .attr('y1', link => link.source.y)
            .attr('x2', link => link.target.x)
            .attr('y2', link => link.target.y)
    })

    simulation.force('link').links(links)
    simulation.alphaTarget(0.7).restart()
}

export function update(view) {

    let [linkEntry, linkElements] = domify(
        view.linkGroup,
        view.links,
        { 'stroke-width': 1, 'stroke': 'rgba(50, 50, 50, 0.1)' },
        'line',
        link => link.target.id + link.source.id
    )

    let [nodeEntry, nodeElements] = domify(
        view.nodeGroup,
        view.nodes,
        { 'r': 10, 'fill': node => node.level === 1 ? '#FF4500' : '#D3D3D3' },
        'circle',
        node => node.id
    )

    nodeEntry.call(view.dragDrop)

    let [textEntry, textElements] = domify(
        view.textGroup,
        view.nodes,
        { 'font-size': 15, 'font-weight': 'bold', 'dx': 5, 'dy': -7 },
        'text',
        node => node.id)

    textEntry.text(node => node.label)

    linkElements = linkEntry.merge(linkElements)
    nodeElements = nodeEntry.merge(nodeElements)
    textElements = textEntry.merge(textElements)

    return [linkElements, nodeElements, textElements]
}

export function init(d3) {
    const width = window.innerWidth
    const height = window.innerHeight

    const svg = d3.select('svg')
    svg.attr('width', width).attr('height', height)

    $('g').length ? $('g').remove() : null
    // we use svg groups to logically group the elements together
    const linkGroup = svg.append('g').attr('class', 'links')
    const nodeGroup = svg.append('g').attr('class', 'nodes')
    const textGroup = svg.append('g').attr('class', 'texts')

    // simulation setup with all forces
    const linkForce = d3
        .forceLink()
        .id(function (link) { return link.id })
        .strength(function (link) { return link.strength })
        .distance(80)

    const simulation = d3
        .forceSimulation()
        .force('link', linkForce)
        .force('charge', d3.forceManyBody().strength(-50).distanceMax(250))
        .force('center', d3.forceCenter(width / 2, height / 2))

    const dragDrop = d3.drag().on('start', function (node) {
        node.fx = node.x
        node.fy = node.y
    }).on('drag', function (node) {
        simulation.alphaTarget(0.7).restart()
        node.fx = d3.event.x
        node.fy = d3.event.y
    }).on('end', function (node) {
        if (!d3.event.active) {
            simulation.alphaTarget(0)
        }
        node.fx = null
        node.fy = null
    })

    return [
        width,
        height,
        svg,
        linkGroup,
        nodeGroup,
        textGroup,
        linkForce,
        simulation,
        dragDrop
    ]
}
