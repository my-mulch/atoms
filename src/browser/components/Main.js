import React from 'react'
import Splash from './Splash'
import Force from './Force'
import Query from './Query'

export default () => (
    <div className="wrapper" id="wrapper-large">
        <div className="container-fluid">
            <Splash />
            <Force />
        </div>
        <div className="container-fluid">
            <Query />
        </div>
    </div>
)
