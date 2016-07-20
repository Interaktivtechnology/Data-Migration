'use strict';

import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Router, browserHistory, withRouter} from 'react-router'
import faker from 'faker'
import moment from 'moment'


class MigrationConfig extends React.Component {

  constructor(props)
  {
    super(props)
    this.state = {
      cols : this.props,
      ds1 : localStorage.getItem('ds1'),
      ds2 : localStorage.getItem('ds2'),
      obj1 : localStorage.getItem('obj1'),
      obj2 : localStorage.getItem('obj2'),
      fil1 : localStorage.getItem('fil1'),
      fil2 : localStorage.getItem('fil2'),
      sconf : localStorage.getObj('sconf'),
      dsel : localStorage.getObj('dsel'),
      dconf : localStorage.getObj('dconf'),
      fil : localStorage.getObj('fil')
    }
    }
  componentDidMount(){
    this.setState({
      cols : this.props.cols
    })
  }
<<<<<<< HEAD
  componentWillReceiveProps(nextProps){
=======
  componentWillyReceiveProps(nextProps){
>>>>>>> 1a65ace37574ee2affef950003a62caec76f9bfb
    this.setState({
      cols : nextProps.cols
    })
  }

  render () {
  return (
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
          <tr>
            <th>DataSource 1</th>
            <th>DataSource 2</th>
            <th>Transformation / Formula</th>
          </tr>
          <tr>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr>
          <td key={100}>{this.state.ds1}</td>
          <td key={101}>{this.state.ds2}</td>
          <td key={102}></td>
          </tr>
          <tr>
          <td key={103}>{this.state.obj1}</td>
          <td key={104}>{this.state.obj2}</td>
          <td key={105}></td>
          </tr>
          <tr>
          <td key={106}>{this.state.fil1}</td>
          <td key={107}>{this.state.fil2}</td>
          <td key={108}></td>
          </tr>
          {
            this.state.sconf.map((object, key) => {
              return <tr>
              <td key={110}>{object.Name}:{object.Value}</td>
              <td key={111}>{this.state.dsel[object.Name]}:{this.state.dconf[object.Name]}</td>
              <td key={112}>{this.state.fil[object.Name]}</td>
              </tr>
            })
          }
          </tbody>
          <tfoot></tfoot>
        </table>
      </div>
    )
  }
}


class MigrationSave extends React.Component {

  constructor(props)
  {
    super(props)
    this.state = {
      jombotron : {display: 'block'},
      cols : 2,
    }
    this._remCols = this._remCols.bind(this)
    this._addCols = this._addCols.bind(this)
  }
  componentWillMount(){
  }
  componentDidMount(){
  }

  _addCols () {
    this.state.cols += 1
    this.setState({
      cols : this.state.cols
    })
  }
  _remCols(){
    this.state.cols -= 1
    this.setState({
      cols : this.state.cols
    })

  }

  render() {
    return (
      <div className="col-md-12">
        <h1>Object Field Merging</h1>
        <MigrationConfig router={this.props.router} cols={this.state.cols}></MigrationConfig>
		</div>
        );
  }
}
MigrationSave.contextType = {
  router : React.PropTypes.func.isRequired
}
export {MigrationConfig}
export default withRouter(MigrationSave)
