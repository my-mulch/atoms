import React from 'react';

export default (graph) => {
    return (
        <g>
            {
                graph.children && graph.children.map((concept, index) => {

                    const pos = {
                        cx: 1200 - Math.floor(Math.random() * 1200),
                        cy: 1200 - Math.floor(Math.random() * 1200),
                        r: Math.floor(Math.random() * 200),
                        key: index
                    };

                    return <circle {...pos} />
                })
            }
        </g>
    )
}