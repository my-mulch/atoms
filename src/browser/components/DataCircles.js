import React from 'react';

export default (graph) => {

    // creates random sizes for concept circles, will allocate to most related topics below. See relational score.
    let sizes
    if (graph.children)
        sizes = Array(graph.children.length)
            .fill(null).map(rel => Math.floor(Math.random() * 150))
            .sort((a, b) => a - b)

    return (
        <g>
            {
                graph.children && graph.children.sort((a, b) => b.numOccur - a.numOccur).map((concept, index) => {
                    const x = 2100 - Math.floor(Math.random() * 2000)
                    const y = 2100 - Math.floor(Math.random() * 2000)
                    const relationalScore = sizes.pop()

                    const tAttrs = {
                        fill: 'black',
                        fontSize: '50px',
                        stroke: 'black',
                        x: x - 100,
                        y
                    }

                    const cAttrs = {
                        r: relationalScore,
                        fill: 'pink',
                        stroke: 'white',
                        cx: x,
                        cy: y
                    }

                    return (
                        <g key={index}>
                            <circle {...cAttrs} />
                            <text {...tAttrs}>{concept.name}</text>
                        </g>
                    )
                })
            }
        </g>
    )
}