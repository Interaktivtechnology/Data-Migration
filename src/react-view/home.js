'use strict';

import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Router, browserHistory} from 'react-router'

import rootRoute from './routes'


export default class App extends React.Component {

  constructor(props)
  {
    super(props)
    this.state = {
      jombotron : {display: 'block'}
    }
  }
  componentWillMount(){

  }
  render() {
    return (
      <div>
        <h1>Welcome to Migration Tools</h1>
        <div className="jumbotron" style={this.state.jumbotron}>
          <p>You can try to config your migration setting.</p>
        </div>
      </div>
    );
  }
}
