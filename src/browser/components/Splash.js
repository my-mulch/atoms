import React, {Component} from 'react'
import { connect } from 'react-redux';
import { search } from '../redux/concepts'
import { getSuggestions } from '../redux/suggestions'
import $ from 'jquery'
// import SecondSearch from './SecondSearch'

import Force from './Force'

class Splash extends Component {

    constructor() {
        super();
        this.state = {
            selectedSuggestion: null
        }
    }

    render() {
        return (
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
                                    // this.props.search(evt.target.query.value)
                                    console.log(this.state.selectedSuggestion)
                                    this.props.search(this.state.selectedSuggestion)
                                    $("html, body").animate({scrollTop: 9999}, 1000);
                                }}
                                onChange={evt => {
                                    evt.preventDefault();
                                    this.setState({selectedSuggestion: evt.target.value})
                                    this.props.getSuggestions(evt.target.value ? evt.target.value : ' ')
                                }}
                            >
                                <div className="input-group">
                    <span className="input-group-btn">
                        <input name="query" className="form-control" placeholder="Search" value={this.state.selectedSuggestion}></input>
                    </span>
                                </div>
                                <ul className="dropdown">
                                    {
                                        this.props.suggestions && this.props.suggestions.map((suggestion, index) => {
                                            if (this.props.suggestions === null) return null;
                                            return <li key={index} onClick={() => {
                                                this.setState({selectedSuggestion: suggestion})
                                            }}>{suggestion}</li>
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
    }
}

const mapState = ({suggestions_reducer}) => ({suggestions: suggestions_reducer})
const mapDispatch = {search, getSuggestions}

export default connect(mapState, mapDispatch)(Splash);
