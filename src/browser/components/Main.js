import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
import Chart from './Chart'
import { search } from '../redux/store'

const App = ({ search }) => (
    <div className="wrapper" id="wrapper-large">
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-12 text-center">

                    <canvas className="spirit-bubbles" id="canvas"></canvas>

                    <ul className="return-btn center-block">
                        <li>
                            <a href="#" className="wow slideInLeft">Home <span className="icons-container"><span className="home-icon"></span></span></a>
                        </li>
                        <li>
                            <a href="#" className="wow slideInRight">Return Back <span className="icons-container"><span className="return-icon"></span></span></a>
                        </li>
                    </ul>

                    <h1 className="wow flipInY" data-wow-delay="1.5s">AtomizeThis</h1>

                    <form className="form-inline search-form"
                        onSubmit={evt => {
                            evt.preventDefault();
                            search(evt.target.query.value)
                        }}>

                        <div className="input-group">
                            <span className="input-group-btn">
                                <input name="query" className="form-control" placeholder=" search product"></input>
                            </span>
                        </div>
                    </form>

                    <Chart />
                </div>
            </div>
        </div>
    </div>
)


const mapState = null
const mapDispatch = { search }

export default connect(mapState, mapDispatch)(App);