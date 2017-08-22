import React from 'react';
import { connect } from 'react-redux';
// import { search } from '../redux/concepts'
// import { getSuggestions } from '../redux/suggestions'

const Modal = () => (
        <div className="container">

            {/*CURRENTLY TRIGGERED BY A BUTTON*/}
            <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button>

            <div className="modal fade" id="myModal" role="dialog">
                <div className="modal-dialog">

                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Floyd Mayweather Jr.</h4>
                        </div>
                        <div className="modal-body">
                            <p>Floyd Mayweather Jr. is, undoubtedly, a trash human.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
)

const mapState = null
const mapDispatch = null
export default connect(mapState, mapDispatch)(Modal);

