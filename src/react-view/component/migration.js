'use strict';

import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Router, browserHistory} from 'react-router'
import faker from 'faker'
import moment from 'moment'

import meta from './sample-meta'

class MigrationTable extends React.Component {

  constructor(props)
  {
    super(props)
    this.state = {
      cols : this.props
    }
    this.option = []

    for(var i=0; i<10;i++){
      this.option.push(
        <option value={i} key={i+1000}>{(i%5 == 0 && i < 5? 'Swift' : 'Air Energi' ) ||
         faker.internet.domainName()} ~ {['Salesforce', 'MySQL', 'Dynamo Db', 'CSV File', 'JSON File', 'Url'][i%5]}</option>
      )
    }

  }
  componentDidMount(){
    this.setState({
      cols : this.props.cols
    })
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      cols : nextProps.cols
    })
  }



  render () {
    var thListSelect = [], thList = [], tBody = []

    for(var i=0;i<this.state.cols;i++){
      thList.push(
        <th key={i+10000} className="text-center">
          {i == this.state.cols - 1 ? "Destination" : "Data Source"}
        </th>
      )
       thListSelect.push(<th key ={i+2000}>
        <select name={'DataSource' + i} className="form-control" >
          {this.option}
        </select>
        <select name={'DataSource' + i} className="form-control">
          <option>---Object--- </option>
          <option value='account'>Account</option>
          <option value='contact'>Contact</option>
          <option value='leads'>Leads</option>
        </select>
      </th>)
    }


    return (
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
          <tr>
            {thList}
            <th>Transformation</th>
            <th>Action</th>
          </tr>
          <tr>
            {thListSelect}
            <th></th>
            <th><button className="btn btn-primary btn-sm"><i className="fa fa-refresh"></i> Sync</button></th>
          </tr>
          </thead>
          <tbody>
            {
              meta.fields.map((object, key) => {
                var cols = []
                for(var x =0;x<this.state.cols;x++)
                  cols.push(<td key={10000+x}><input type="checkbox" /> {object.fullName}</td>)
                return <tr key={object.fullName}>
                  {cols}
                  <td><textarea type="text" className="form-control" placeholder="Regex or Formula"></textarea></td>
                  <td><button className="btn btn-inverse btn-sm"><i className="fa fa-save"></i> Save</button></td>
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


export default class Migration extends React.Component {

  constructor(props)
  {
    super(props)
    this.state = {
      jombotron : {display: 'block'},
      cols : 2
    }
    this._remCols = this._remCols.bind(this)
    this._addCols = this._addCols.bind(this)
  }
  componentWillMount(){

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
        <h1>Migrate Now!</h1>
        <div className="col-md-4 col-md-offset-4 text-center" style={{marginTop: 20, marginBottom: 20}}>
          <button onClick={() => this._addCols()} className="btn btn-default btn-sm"><i className="fa fa-plus"></i> Attach DataSource</button>
          <button onClick={() => this._remCols()} className="btn btn-warning btn-sm"><i className="fa fa-minus"></i> Remove DataSource</button>
        </div>
        <div className="clearfix"></div>
        <MigrationTable cols={this.state.cols}></MigrationTable>
      </div>
    );
  }
}
