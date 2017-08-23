import React from 'react'
import Splash from './Splash'
import Force from './Force'

export default () => (
    <div className="wrapper" id="wrapper-large">
        <div className="container-fluid">
            <Splash />
        </div>
        <div className="forceArea">
            <Force />
        </div>
    </div>
)
