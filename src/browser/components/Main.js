import React, { Component } from 'react';
import axios from 'axios'

class App extends Component {
  render() {
    return (
        <div className="wrapper" id="wrapper-large">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 text-center">

                        <canvas className="spirit-bubbles" id="canvas"></canvas>

                        <ul className="return-btn center-block">
                            <li>
                                <a href="#" className="wow slideInLeft">Home <span className="icons-container"><span className="home-icon"></span></span></a>
                            </li>
                            <li>
                                <a href="#" className="wow slideInRight">Return Back <span className="icons-container"><span className="return-icon"></span></span></a>
                            </li>
                        </ul>

                        <h1 className="wow flipInY" data-wow-delay="1.5s">AtomizeThis</h1>

                        <form className="form-inline search-form" 
                            onSubmit={evt => {
                            evt.preventDefault();  
                            axios.post('/query', {
                                query: evt.target.query.value
                            }).then(concepts => {
                                console.log(concepts)
                                const head = document.createElement('h1')
                                document.body.appendChild(head)
                                head.innerText = concepts.data.name

                                concepts.data.children.map(concept => {
                                    const element = document.createElement('h3')
                                    console.log(concept)
                                    element.innerText = concept.name + ' weights ' + concept.numOccur
                                    document.body.appendChild(element)
                                })
                            })
                        }}>
                            <div className="input-group">
                                <span className="input-group-btn">
                                        <input name="query" className="form-control" placeholder=" search product"></input>
                                </span>
                            </div>
                        </form>

                        <ul className="social-icons center-block">
                            <li>
                                <a className="hvr-icon-wobble-vertical wow slideInLeft" data-wow-delay="3.5s" href="#"><i className="fa fa-fw fa-google-plus"></i></a>
                            </li>
                            <li>
                                <a className="hvr-icon-wobble-vertical wow slideInLeft" data-wow-delay="2.5s" href="#"><i className="fa fa-fw fa-facebook"></i></a>
                            </li>
                            <li>
                                <a className="hvr-icon-wobble-vertical wow fadeIn" data-wow-delay="2s" href="#"><i className="fa fa-fw fa-youtube"></i></a>
                            </li>
                            <li>
                                <a className="hvr-icon-wobble-vertical wow slideInRight" data-wow-delay="2.5s" href="#"><i className="fa fa-fw fa-twitter"></i></a>
                            </li>
                            <li>
                                <a className="hvr-icon-wobble-vertical wow slideInRight" data-wow-delay="3.5s" href="#"><i className="fa fa-fw fa-instagram"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default App;