'use strict';

import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Router, browserHistory} from 'react-router'
import faker from 'faker'
import moment from 'moment'



class Modal extends Component {

  constructor(props){
    super(props)
    this.state = {
      type : 'Salesforce'
    }
  }

  componentDidMount(){
    var id = ReactDOM.findDOMNode(this).id

    $('#' + id).modal('show');
    $('#' + id).on('hidden.bs.modal', this.props.handleHideModal);
  }

  _onChange(value){
    this.setState({
      type : value
    })
  }

  render(){
    let additionalSetting = ''

    if(this.state.type == 'Salesforce'){
       additionalSetting = <div>
         <div className="form-group">
          <label>Mode</label>
          <select type="text" className="form-control">
            <option value="dev">Sandbox</option>
            <option value="prod">Production</option>
          </select>
        </div>
         <div className="form-group">
          <label>Password</label>
          <input type="text" className="form-control" placeholder="Password" />
        </div>
        <div className="form-group">
           <label>Security Token</label>
           <input type="text" className="form-control" placeholder="Security Token" />
         </div>
       </div>
    }
    else if(this.state.type == 'MySQL'){
      additionalSetting = <div>
          <div className="form-group">
           <label>Password</label>
           <input type="text" className="form-control" placeholder="Password" />
         </div>
         <div className="form-group">
          <label>Host</label>
          <input type="text" className="form-control" placeholder="Host" />
        </div>
        <div className="form-group">
         <label>Port</label>
         <input type="text" className="form-control" placeholder="Port" />
       </div>
      </div>
    }

    return (
      <div  id="mdlApp" className="modal fade" ref="modal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">Add New Data Source</h4>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Data Source Name</label>
                <input type="text" className="form-control" placeholder="Name" />
              </div>
              <div className="form-group">
                <label>Data Source Type</label>
                <select name="" className="form-control" onChange={(val) => this._onChange(val.target.value)}>
                  {
                    ['Salesforce', 'MySQL', 'Dynamo Db', 'CSV File', 'JSON File', 'Url'].map((object, key) => {
                      return <option key={object} value={object}>{object}</option>
                    })
                  }
                </select>
              </div>
              <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control" placeholder="User name" />
              </div>
              <h3 className="text-center">{this.state.type}</h3>
              <hr />
              {additionalSetting}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    )
  }


}
Modal.propTypes = {
  handleHideModal: React.PropTypes.func.isRequired
}


export default class DsConfig extends React.Component {

  constructor(props)
  {
    super(props)
    this.state = {
      jombotron : {display: 'block'},
      showModal : false
    }
    this.columns = [
      {
        key: 'id',
        name: 'ID',
        width: 80
      },
      {
        key : 'dsName',
        name : 'DS Name'
      },
      {
        key: 'ds',
        name: 'DS Type'
      },
      {
        key: 'uname',
        name: 'Username'
      },
      {
        key : 'password',
        name : 'Password/Token'
      },
      {
        key : 'created_date',
        name : 'Created Date'
      }
    ]
    this.rows = []
  }
  componentWillMount(){
    for(var i=0;i< 10;i++)
      this.rows.push({
        id : faker.random.number(),
        dsName : i%5 == 0 ? 'Air Swift' : faker.internet.domainName(),
        ds : ['Salesforce', 'MySQL', 'Dynamo Db', 'CSV File', 'JSON File', 'Url'][i%5],
        uname : faker.internet.userName(),
        password: '*********',
        created_date : moment(faker.date.recent()).format("ddd, DD MMM YYYY HH:mm")
      })
  }

  _addDataSource(){
    if(document)
      document.title = "InterAktiv ~ Add new data source"
    this.showModal(true)
  }

  showModal(status){
    this.setState({showModal: status})
  }
  render() {
    return (
      <div className="col-md-12">
        <h1>Data Source Configuration</h1>
        {this.state.showModal ? <Modal handleHideModal={ () => this.showModal(false)} /> : null}
        <div className="row">
          <div className="col-md-4 col-md-offset-4 text-center" >
            <button className="btn btn-primary" onClick={this._addDataSource.bind(this)}>
            <i className="fa fa-plus"/> Add Data Source</button>
          </div>
        </div>
        <div className="col-md-12 table-responsive">
          <table className="table table-bordered" style={{marginTop: 30}}>
            <thead>
            <tr>
              {this.columns.map((object, key) => {
                return <th key={object.key}>{object.name}</th>
              })}
            </tr>
            </thead>
            <tbody>
              {
                this.rows.map((object, key) => {
                  return <tr key={key+1000}>
                    <td>{object.id}</td>
                    <td>{object.dsName}</td>
                    <td>{object.ds}</td>
                    <td>{object.uname}</td>
                    <td>{object.password}</td>
                    <td>{object.created_date}</td>
                  </tr>
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
