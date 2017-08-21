import React, { Component } from 'react'
import { connect } from 'react-redux';
import { search } from '../redux/graph'
import { suggest, clearCompletions } from '../redux/completions'
import $ from 'jquery'

const Query = ({ search, suggest, completions, clearCompletions }) => (
    <div id="query">
        <form autoComplete="off" className="form-inline search-form"
            onSubmit={(event) => handleSubmit(event, search, clearCompletions)}>
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

const handleSubmit = (event, search, clearCompletions) => {
    event.preventDefault();
    search(event.target.query.value)
    clearCompletions()
    event.target.query.value = ''
}

const handleChange = (event, suggest, clearCompletions) => {
    event.preventDefault();

    event.target.value
        ? suggest(event.target.value)
        : clearCompletions()
}

const mapState = ({ completions }) => ({ completions })
const mapDispatch = { search, suggest, clearCompletions }

export default connect(mapState, mapDispatch)(Query);


