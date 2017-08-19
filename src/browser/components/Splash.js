import React, { Component } from 'react'
import { connect } from 'react-redux';
import { search } from '../redux/concepts'
import { suggest } from '../redux/suggest'
import $ from 'jquery'

const Splash = ({ search, suggest, completions }) => (
    <div id="splash">
        <h1>atomizer</h1>
        <form autoComplete="off" className="form-inline search-form" onSubmit={handleSubmit} onChange={handleChange}>
            <div className="input-group">
                <span className="input-group-btn">
                    <input name="query" className="form-control" placeholder="Search" value={}></input>
                </span>
            </div>
            <ul className="dropdown">{
                completions && completions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                ))
            }</ul>
        </form>
    </div>
)

const handleSubmit = (event, search) => {
    event.preventDefault();
    console.log(event.target.query.value)
    $("html, body").animate({ scrollTop: 9999 }, 1000);
}

const handleChange = (event, suggest) => {
    event.preventDefault();
    suggest()
}

const mapState = ({ completions }) => ({ completions })
const mapDispatch = { search, suggest }

export default connect(mapState, mapDispatch)(Splash);


