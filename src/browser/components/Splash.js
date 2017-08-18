import React from 'react'
import { connect } from 'react-redux';
import { search } from '../redux/concepts'
import { getSuggestions } from '../redux/suggestions'
import $ from 'jquery'

import SecondSearch from './SecondSearch'
import Force from './Force'

const Splash = ({search, getSuggestions, suggestions}) => (
    <div>
        <section>
            <div className="wrapper" id="wrapper-large">
                <div className="container-fluid">
                    <h1 className="wow flipInY" data-wow-delay="1.5s">atomizer</h1>
                    <form
                        autoComplete="off"
                        className="form-inline search-form"
                        onSubmit={evt => {
                            evt.preventDefault();
                            search(evt.target.query.value)
                            $("html, body").animate({ scrollTop: 9999 }, 1000);
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
            </div>
        </section>
        <section>
            <div id="force">
                <Force/>
            </div>
        </section>
    </div>
)

const mapState = ( { suggestions_reducer } ) => ({ suggestions: suggestions_reducer })
const mapDispatch = { search, getSuggestions }

export default connect(mapState, mapDispatch)(Splash);
