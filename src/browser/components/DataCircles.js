import React from 'react';

const renderCircles = (props) => {
    return (coords, index) => {
        const circleProps = {
            cx: props.height / 2,
            cy: props.width / 2,
            r: 30,
            key: index
        };
        return <circle {...circleProps} />;
    };
};

export default (props) => {
    return <g>{props.data.map((point, index) => {
        return renderCircles(props)(point, index)
    })}</g>
}