'use strict';

import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Router, browserHistory} from 'react-router'
import faker from 'faker'
import moment from 'moment'

import meta from './sample-meta'
import meta2 from './sample-meta2'

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
          Data Source {i+1}
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
          <option value='leads'>Opportunities</option>
          <option value='activities'>Activities</option>
          <option value='notes_attachment'>Notes & Attachment</option>
        </select>
        <input type="text" className="form-control"   placeholder = "Filter" />
      </th>)
    }


    return (
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
          <tr>
            {thList}
            <th>Transformation / Formula</th>
          </tr>
          <tr>
            {thListSelect}
            <th><button className="btn btn-primary btn-sm"><i className="fa fa-refresh"></i> Sync</button></th>
          </tr>
          </thead>
          <tbody>
          {
            meta.fields.map((object, key) => {
              var cols = []

              cols.push(<td key={10000}><input type="checkbox" /> {object.fullName}</td>)
              cols.push(<td><input type="checkbox" />
              <select className="form-control">
                {meta2.fields.map((object2, key2) =>{
                  return <option value={object2.name} selected={object.fullName == object2.name}>{object2.name}</option>
                })}

              </select>
              <button className="btn btn-success btn-sm"><i className="fa fa-plus"></i> New field</button>
              </td>)
              return <tr key={object.fullName}>
                {cols}
                <td><textarea type="text" className="form-control" placeholder="Regex or Formula"></textarea></td>
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
        <h1>Merge Row Configuration</h1>
        <div className="col-md-4 col-md-offset-4 text-center" style={{marginTop: 20, marginBottom: 20}}>
          <button onClick={() => this._remCols()} className="btn btn-primary btn-sm"><i className="fa fa-save"></i> Save</button>
        </div>
        <div className="clearfix"></div>
        <MigrationTable cols={this.state.cols}></MigrationTable>
      </div>
    );
  }
}
