import $ from 'jquery'

export function skeleton(graph) {
    const nodes = []
    const links = []
    const dups = new Set()

    graph.forEach(concept => dups.add(concept.title.toLowerCase()))

    graph.forEach((concept, group) => {
        const center = { id: concept.title.toLowerCase(), group, label: concept.title.toUpperCase(), level: 1 }
        nodes.push(center)

        concept.relations.forEach(relation => {
            const relationNormalized = relation.title.toLowerCase()
            links.push({ target: center.id, source: relationNormalized, strength: 0.1 })

            if (dups.has(relationNormalized)) return
            else dups.add(relationNormalized)
            nodes.push({ id: relationNormalized, group, label: relation.title, level: 2 })
        })

    })

    return { nodes, links }
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

export function simulate({ simulation, nodeElements, textElements, linkElements, nodes, links, width, height }) {

    simulation.nodes(nodes).on('tick', () => {
        nodeElements
            .attr('cx', node => node.x = Math.max(20, Math.min(width - 20, node.x)))
            .attr('cy', node => node.y = Math.max(20, Math.min(height - 20, node.y)))
        textElements
            .attr('x', node => node.x = Math.abs(Math.max(node.x, Math.min(width - node.x, node.x))))
            .attr('y', node => node.y = Math.abs(Math.max(node.y, Math.min(height - node.y, node.y))))
        linkElements
            .attr('x1', link => link.source.x)
            .attr('y1', link => link.source.y)
            .attr('x2', link => link.target.x)
            .attr('y2', link => link.target.y)
    })

    simulation.force('link').links(links)
    simulation.alphaTarget(0.7).restart()
}

export function rendering(diagram) {
    let [linkEntry, linkElements] = domify(
        diagram.linkGroup,
        diagram.links,
        { 'stroke-width': 1, 'stroke': 'rgba(234, 220, 233, 0.5)' },
        'line',
        link => link.target.id + link.source.id
    )

    let [nodeEntry, nodeElements] = domify(
        diagram.nodeGroup,
        diagram.nodes,
        { 'r': 14, 'fill': node => node.level === 1 ? '#F9D463' : '#7084a3' },
        'circle',
        node => node.id
    )

    nodeEntry.call(diagram.dragDrop)
    nodeEntry.on('click', node => diagram.search(node.label))

    let [textEntry, textElements] = domify(
        diagram.textGroup,
        diagram.nodes,
        { 'font-size': 13, 'dx': 7, 'dy': -10, 'fill': 'white', 'font-weight': 'bold' },
        'text',
        node => node.id
    )

    textEntry.text(node => node.label)

    linkElements = linkEntry.merge(linkElements)
    nodeElements = nodeEntry.merge(nodeElements)
    textElements = textEntry.merge(textElements)

    return { linkElements, nodeElements, textElements }
}

export function diagram(d3) {
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
        .distance(175)

    const simulation = d3
        .forceSimulation()
        .force('link', linkForce)
        .force('charge', d3.forceManyBody().strength(-225).distanceMax(500))
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

    return {
        width,
        height,
        svg,
        linkGroup,
        nodeGroup,
        textGroup,
        linkForce,
        simulation,
        dragDrop
    }
}
