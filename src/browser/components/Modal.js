import React from 'react';
import { connect } from 'react-redux';
import { search } from '../redux/concepts'
import { getSuggestions } from '../redux/suggestions'

const Modal = ({search, getSuggestions, suggestions}) => (
        <div class="container">

            {/*CURRENTLY TRIGGERED BY A BUTTON*/}
            <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button>

            <div class="modal fade" id="myModal" role="dialog">
                <div class="modal-dialog">

                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">Floyd Mayweather Jr.</h4>
                        </div>
                        <div class="modal-body">
                            <p>Floyd Mayweather Jr. is, undoubtedly, a trash human.</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
)

const mapState = ( { suggestions_reducer } ) => ({ suggestions: suggestions_reducer })
const mapDispatch = { search, getSuggestions }
export default connect(mapState, mapDispatch)(Modal);

