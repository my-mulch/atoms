import React, { Component } from 'react'
import { connect } from 'react-redux';
import { search } from '../redux/graph'
import { suggest, clearCompletions, select } from '../redux/completions'
import $ from 'jquery'

class Query extends Component {
    constructor() {
        super()
        this.state = {
            value: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    render() {
        const { completions, search, suggest, clearCompletions } = this.props

        return (
            <div id="query" >
                <form autoComplete="off" className="search-form"
                    onSubmit={(event) => this.handleSubmit(event, search, clearCompletions)}>
                    <div className="input-group">
                        <div>
                            <input
                                name="query"
                                className="form-control"
                                value={this.state.value}
                                onChange={(event) => this.handleChange(event, suggest, clearCompletions)}
                            />
                        </div>
                        <ul>{
                            completions &&
                            completions.map((suggestion, index) => (
                                <li key={index} onClick={(event) => this.handleClick(suggestion, clearCompletions)}>{suggestion}</li>
                            ))}
                        </ul>
                    </div>
                </form>
            </div >
        )
    }

    handleSubmit(event, search, clearCompletions) {
        event.preventDefault()
        search(this.state.value)
        clearCompletions()
        this.setState({ value: '' })
        $("html, body").animate({ scrollTop: 10000 }, 1000);
    }

    handleChange(event, suggest, clearCompletions) {
        event.preventDefault()
        clearCompletions()
        this.setState({ value: event.target.value})
        suggest(event.target.value)
    }

    handleClick(value, clearCompletions) {
        this.setState({ value: value })
        clearCompletions()
    }
}


const mapState = ({ completions }) => ({ completions })
const mapDispatch = { search, suggest, select, clearCompletions }

export default connect(mapState, mapDispatch)(Query);


