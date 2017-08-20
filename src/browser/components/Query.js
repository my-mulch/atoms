import React, { Component } from 'react'
import { connect } from 'react-redux';
import { search } from '../redux/graph'
import { suggest, clearSuggestions } from '../redux/autoComplete'
import $ from 'jquery'

const Query = ({ search, suggest, completions, clearSuggestions }) => (
    <div id="query">
        <form autoComplete="off" className="form-inline search-form"
            onSubmit={(event) => handleSubmit(event, search, clearSuggestions)}
            onChange={(event) => handleChange(event, suggest, clearSuggestions)}>
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

const handleSubmit = (event, search, clearSuggestions) => {
    event.preventDefault();
    search(event.target.query.value)
    clearSuggestions()
    event.target.query.value = ''
}

const handleChange = (event, suggest, clearSuggestions) => {
    event.preventDefault();

    event.target.value
        ? suggest(event.target.value)
        : clearSuggestions()
}

const mapState = ({ completions }) => ({ completions })
const mapDispatch = { search, suggest, clearSuggestions }

export default connect(mapState, mapDispatch)(Query);


