'use strict';

import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Router, browserHistory, withRouter} from 'react-router'
import faker from 'faker'
import moment from 'moment'


class ConflictTable extends React.Component {

  constructor(props)
  {
    super(props)
    this.state = {
      mergedRow : this.props.mergedRow,
      rows : []
    }
  }
  componentDidMount(){

    this.setState({
      mergedRow : this.props.mergedRow,
      rows : this._getData()
    })
  }
  _getData(){
    var rows = []
    for(var i=0; i<25;i++){
      rows.push({
        Id : faker.random.uuid(),
        Name : faker.name.findName(),
        CreatedDate : faker.date.past(),
        OwnerId : faker.name.findName()
      })
    }
    return rows
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      mergedRow : nextProps.mergedRow
    })
  }

  _next(){
    if(Object.keys(this.state.mergedRow).length < 2){
      alert("Please select min 2 rows")
    }
    else{
      var keys = ''
      Object.keys(this.state.mergedRow).forEach((obj) => {
        keys += obj + ","
      })
      this.props.router.push({pathname : '/migration/fix-conflict/' + this.props.id + '/merge', query:{rowId : keys}})
    }
  }

  _checkMergedRow(object, val){
    var mergedRow = this.state.mergedRow

    if(val.target.checked)
    {
      if(Object.keys(mergedRow).length < 3)
        mergedRow[object.Id] = object
      else val.preventDefault()
    }
    else{
      delete mergedRow[object.Id]
    }

    this.setState({
      mergedRow: mergedRow
    })
  }

  render () {
    return (
      <div className="table-responsive">
        <p>Row Selected : {Object.keys(this.state.mergedRow).length} row(s).</p>
        <table className="table table-striped table-bordered table-condensed">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Created Date</th>
              <th>Record Owner</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.rows.map((object, key) => {
                return <tr key={key+2000}>
                <td><input type="checkbox" value={object.Id} onChange={ (val) => this._checkMergedRow(object, val)} /></td>
                <td>{object.Name}</td>
                <td>{moment(object.CreatedDate).format("ddd, DD/MM/YYYY")}</td>
                <td>{object.OwnerId}</td>
                </tr>
              })
            }
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4} className="text-right">
                <button className="btn btn-primary" onClick={this._next.bind(this)}>
                Next <i className="fa fa-angle-right"/>  </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  }
}


class MigrationRow extends React.Component {

  constructor(props)
  {
    super(props)
    this.state = {
      jombotron : {display: 'block'},
      cols : 2
    }

  }
  componentWillMount(){
    
  }

  render() {
    let {id} = this.props.params
    return (
      <div className="col-md-12">
        <h2>Fix Conflict on id : {id}</h2>
        <p className="subtitle">Please select up to three records that you wish to merge into one.
 You can undo your merging process by revert action in Migration List menu.</p>
        <div className="clearfix"></div>

        <div className="row" style={{marginBottom: 20}}>
          <div className="col-md-12">
            <h4>Migration Detail</h4>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label className="col-md-5 col-sm-6">Name</label>
              <span className="col-md-1 col-sm-hidden">:</span>
              <p className="col-md-6 col-sm-6">Migration for Account </p>
            </div>
            <div className="form-group ">
              <label className="col-md-5 col-sm-6">Object Name</label>
              <span className="col-md-1 col-sm-hidden col-xs-hidden">:</span>
              <p className="col-md-6 col-sm-6">Account </p>
            </div>
            <div className="form-group">
              <label className="col-md-5">From</label>
              <span className="col-md-1 col-sm-hidden col-xs-hidden">:</span>
              <p className="col-md-6">Swift </p>
            </div>
            <div className="form-group">
              <label className="col-md-5">To</label>
              <span className="col-md-1 col-sm-hidden col-xs-hidden">:</span>
              <p className="col-md-6">Air Energi </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="col-md-5">Created By</label>
              <span className="col-md-1 col-sm-hidden col-xs-hidden">:</span>
              <p className="col-md-6 col-sm-6">eko@interaktiv.sg</p>
            </div>
            <div className="form-group">
              <label className="col-md-5">Conflict</label>
              <span className="col-md-1 col-sm-hidden col-xs-hidden">:</span>
              <p className="col-md-6">22</p>
            </div>
            <div className="form-group">
              <label className="col-md-5">Success</label>
              <span className="col-md-1 col-sm-hidden col-xs-hidden">:</span>
              <p className="col-md-6">432</p>
            </div>
            <div className="form-group">
              <label className="col-md-5">Completion</label>
              <span className="col-md-1 col-sm-hidden col-xs-hidden">:</span>
              <div className="col-md-6">
                <div className="progress ">
                  <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow={80.32} aria-valuemin="0" aria-valuemax="100" style={{width: 80 + "%"}}>
                    {(80.32).toFixed(2)} %
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {this.props.children || (<div>
              <h4>Conflict Row</h4>
              <hr />
             <ConflictTable mergedRow={[]} id={id} router={this.props.router} /> </div>)}

          </div>
        </div>
      </div>
    );
  }
}
MigrationRow.contextType = {
  router : React.PropTypes.func.isRequired
}

export {ConflictTable}
export default withRouter(MigrationRow)
