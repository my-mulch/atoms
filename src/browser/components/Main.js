import React from 'react'
import Splash from './Splash'
import Force from './Force'
import Query from './Query'
import Display from './Display'

export default () => (
    <div className="wrapper" id="wrapper-large">
        <div className="container-fluid">
            <Splash />
            <Display />
            <Force />
        </div>
    </div>
)

    // <div className="container-fluid">
    //     <Query />
    // </div>
