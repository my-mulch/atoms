import $ from 'jquery'

export function skeleton(graph) {
    const nodes = []
    const links = []

    Object.values(graph).forEach(node => {
        const isParent = node.adj.length
        if (isParent)
            // if node has a non-empty adjacency list
            // we capture links
            links.push(...node.adj.map(
                // links for d3 require a special object
                relatedNode => ({
                    target: node.id,
                    source: relatedNode.id,
                    strength: 0.1
                })
            ))
        // similiar story for nodes
        nodes.push({
            id: node.id, // will hash in future
            label: node.id,
            level: isParent ? 1 : 2
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
        .id(link => link.id)
        .strength(link => link.strength)
        .distance(175)

    const simulation = d3
        .forceSimulation()
        .force('link', linkForce)
        .force('charge', d3.forceManyBody().strength(-150).distanceMax(250))
        .force('center', d3.forceCenter(width / 2, height / 2))

    const dragDrop = d3.drag()
        .on('start', node => {
            node.fx = node.x
            node.fy = node.y
        }).on('drag', node => {
            simulation.alphaTarget(0.7).restart()
            node.fx = d3.event.x
            node.fy = d3.event.y
        }).on('end', node => {
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
