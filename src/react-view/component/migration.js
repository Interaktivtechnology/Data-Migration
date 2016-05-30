'use strict';

import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Router, browserHistory} from 'react-router'




export default class Migration extends React.Component {

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
      <div className="col-md-12">
        <h1>Data Source Configuration</h1>
        <div className="col-md-4 col-md-offset-4">
          <button className="btn btn-primary">Migration</button>
        </div>
      </div>
    );
  }
}
