import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
import Force from './Force'
import { search } from '../redux/store'

const App = ({ search }) => (
    <div className="wrapper" id="wrapper-large">
        <div className="container-fluid">
            <h1 className="wow flipInY" data-wow-delay="1.5s">AtomizeThis</h1>

            <form
                className="form-inline search-form"
                onSubmit={evt => { evt.preventDefault(); search(evt.target.query.value) }}>
                <div className="input-group">
                    <span className="input-group-btn">
                        <input name="query" className="form-control" placeholder=" search product"></input>
                    </span>
                </div>
            </form>

            <Force />
        </div>
    </div>
)


const mapState = null
const mapDispatch = { search }

export default connect(mapState, mapDispatch)(App);