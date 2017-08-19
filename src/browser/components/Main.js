import React from 'react'
import { connect } from 'react-redux'
import { search } from '../redux/concepts'
import { getSuggestions } from '../redux/suggestions'
import Splash from './Splash'
import SecondSearch from './SecondSearch'
import Force from './Force'

const Main = ({ search, getSuggestions, suggestions }) => (
        
        <Splash />
        <Force />
)

const mapState = ({ suggestions_reducer }) => ({ suggestions: suggestions_reducer })
const mapDispatch = { search, getSuggestions }
export default connect(mapState, mapDispatch)(Main);
