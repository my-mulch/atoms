import React, { Component } from 'react'
import { connect } from 'react-redux';
import { search } from '../redux/graph'
import { suggest, clearSuggestions } from '../redux/autoComplete'
import $ from 'jquery'

const Splash = ({ search, suggest, completions, clearSuggestions }) => (
    <div id="splash">
        <h1>atomizer</h1>
        <form autoComplete="off" className="form-inline search-form"
            onSubmit={(event) => handleSubmit(event, search)}
            onChange={(event) => handleChange(event, suggest)}>
            <div className="input-group">
                <span className="input-group-btn">
                    <input name="query" className="form-control" placeholder="Search"></input>
                </span>
            </div>
            <ul className="dropdown">{
                completions &&
                completions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                ))
            }</ul>
        </form>
    </div>
)

const handleSubmit = (event, search) => {
    event.preventDefault();
    search(event.target.query.value)
    $("html, body").animate({ scrollTop: 10000000 }, 1000);
}

const handleChange = (event, suggest) => {
    event.preventDefault();

    event.target.value
        ? suggest(event.target.value)
        : console.log()
}

const clearSearchBar = () => {

}

const mapState = ({ completions }) => ({ completions })
const mapDispatch = { search, suggest, clearSuggestions }

export default connect(mapState, mapDispatch)(Splash);


