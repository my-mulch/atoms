import React from 'react'
import { connect } from 'react-redux'
import { search } from '../redux/concepts'
import { getSuggestions } from '../redux/suggestions'
import Force from './Force'


const Main = ({ search, getSuggestions, suggestions }) => (
    <div className="wrapper" id="wrapper-large">
        <div className="container-fluid">
            <h1 className="wow flipInY" data-wow-delay="1.5s">Atomizer</h1>

            <form
                className="form-inline search-form"
                onSubmit={evt => { evt.preventDefault(); search(evt.target.query.value) }}
            // onChange={evt => { evt.preventDefault(); getSuggestions(evt.target.value) }}
            >
                <div className="input-group">
                    <span className="input-group-btn">
                        <input name="query" className="form-control" placeholder=" search product"></input>
                    </span>
                </div>
            </form>
            {suggestions && suggestions.map((suggestion, index) => {
                return <li key={index}>{suggestion}</li>
            })}
            <Force />
        </div>
    </div>
)


const mapState = ({ suggestions_reducer }) => ({ suggestions: suggestions_reducer })
const mapDispatch = { search, getSuggestions }
export default connect(mapState, mapDispatch)(Main);
