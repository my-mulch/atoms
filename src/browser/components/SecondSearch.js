import React from 'react'
import { connect } from 'react-redux';
import { search } from '../redux/concepts'
import { getSuggestions } from '../redux/suggestions'

import Force from './Force'

const SecondSearch = ({search, getSuggestions, suggestions}) => (
    <div id="SecondSearch">
        <form
            autoComplete="off"
            className="form-inline search-form"
            onSubmit={evt => {
                evt.preventDefault();
                search(evt.target.query.value)
            }}
            onChange={evt => {
                evt.preventDefault();
                getSuggestions(evt.target.value)
            }}
        >
            <div className="input-group">
                    <span className="input-group-btn">
                        <input name="query" className="form-control" placeholder="Search"></input>
                    </span>
            </div>
            <ul className="dropdown">
                {
                    suggestions && suggestions.map((suggestion, index) => {
                        return <li key={index}>{suggestion}</li>
                    })
                }
            </ul>
        </form>
    </div>
)


const mapState = ( { suggestions_reducer } ) => ({ suggestions: suggestions_reducer })
const mapDispatch = { search, getSuggestions }

export default connect(mapState, mapDispatch)(SecondSearch);
