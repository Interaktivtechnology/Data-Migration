'use strict';

import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Router, browserHistory} from 'react-router'
import faker from 'faker'
import moment from 'moment'
import jq from 'jquery'
import ModalConfirm from '../common/ModalConfirm'


class Modal extends Component {

  constructor(props){
    super(props)
    this.state = {
      type : 'Salesforce',
      form : {},
      errorMessage : []
    }
    this._onChange = this._onChange.bind(this)
  }

  componentDidMount(){
    var id = ReactDOM.findDOMNode(this).id

    $('#' + id).modal('show');
    $('#' + id).on('hidden.bs.modal', this.props.handleHideModal);
  }

  _onChange(component){

    var form = this.state.form
    const allowedFormKey = ['name', 'username', 'password', 'token', 'type']

    if(allowedFormKey.indexOf(component.target.name) > -1)
      form[component.target.name] = component.target.value
    else{
      var val = form['additionalSetting'] ? JSON.parse(form['additionalSetting']) : {}
      val[component.target.name] = component.target.value
      form['additionalSetting'] = JSON.stringify(val)
    }

    this.setState({
      form : form
    })
    console.log(this.state.form)
  }

  _onSave(component){
    var id = ReactDOM.findDOMNode(this).id
    var form = this.state.form
    form._csrf = CSRF_TOKEN
    if(this.props.edit)
      jq.put('/api/ds')
    else {
      jq.post('/api/ds',
      form,
      function(res){
        if(res.ok)
        {
          $('#' + id).modal('hide')
        }
      }.bind(this)).
      fail(function(res) {
        var response = JSON.parse(res.responseText)
        if(typeof response.message == 'object')
          this.setState({
            errorMessage : response.message.errors
          })

      }.bind(this))
    }
  }



  render(){
    let additionalSetting = ''

    if(this.state.type == 'Salesforce'){
       additionalSetting = <div>
         <div className="form-group">
          <label>Mode</label>
          <select type="text" name="mode" className="form-control" onChange={this._onChange} value={this.state.form.mode}>
            <option value="dev">Sandbox</option>
            <option value="prod">Production</option>
          </select>
        </div>
         <div className="form-group">
          <label>Password</label>
          <input type="text" name="password" className="form-control" placeholder="Password" onChange={this._onChange} value={this.state.form.password}/>
        </div>
        <div className="form-group">
           <label>Security Token</label>
           <input type="text" name="token" className="form-control" placeholder="Security Token" onChange={this._onChange} value={this.state.form.token} />
         </div>
       </div>
    }
    else if(this.state.type == 'MySQL'){
      additionalSetting = <div>
          <div className="form-group">
           <label>Password</label>
           <input type="text" className="form-control" placeholder="Password" name="password" value={this.state.form.password} />
         </div>
         <div className="form-group">
          <label>Host</label>
          <input type="text" className="form-control" placeholder="Host"  name="additionalSetting"/>
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
              {
                this.state.errorMessage.map((object, key) => {
                  return <div className="alert alert-danger" role="alert">
                    <span className="fa fa-exclamation" aria-hidden="true"></span>
                    <span className="sr-only">Error:</span>
                    {object.message}
                  </div>
                })
              }
              <div className="form-group">
                <label>Data Source Name</label>
                <input type="text" className="form-control" name="name" placeholder="Name" onKeyUp={this._onChange}/>
              </div>
              <div className="form-group">
                <label>Data Source Type</label>
                <select name="" className="form-control" name="type" onChange={this._onChange}>
                  {
                    ['Salesforce', 'MySQL', 'Dynamo Db', 'CSV File', 'JSON File', 'Url'].map((object, key) => {
                      return <option key={object} value={object}>{object}</option>
                    })
                  }
                </select>
              </div>
              <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control" name="username" placeholder="User name" onKeyUp={this._onChange} />
              </div>
              <h3 className="text-center">{this.state.type}</h3>
              <hr />
              {additionalSetting}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={this._onSave.bind(this)}>Save changes</button>
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
      showModal : false,
      rows : []
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
    this._fetchData = this._fetchData.bind(this)
    this._onEdit = this._onEdit.bind(this)
    this._onDelete = this._onDelete.bind(this)
  }
  componentDidMount(){
    this._fetchData()
  }

  _fetchData(){
    this.setState({
      loading : true
    })
    jq.get("/api/ds",
      function(res){

        var rows = []
        for(var i =0 ; i<res.result.length ; i ++)
          rows.push({
            id : res.result[i].id,
            dsName : res.result[i].name,
            ds : res.result[i].type,
            uname : res.result[i].username,
            password: res.result[i].password + res.result[i].token,
            created_date : moment(res.result[i].createdAt).format("ddd, DD MMM YYYY HH:mm")
          })
        this.setState({
          rows : rows,
          loading : false,
          showModalConfirm : false
        })
      }.bind(this)
    )
  }

  _addDataSource(){
    if(document)
      document.title = "InterAktiv ~ Add new data source"
    this.showModal(true)
  }

  showModal(status){
    this.setState({showModal: status})
    if(!status)
      document.title = "InterAktiv ~ Data Source"
  }

  _onEdit(object) {
    this.showModal(true)
  }

  _onDeleteHide(){

  }

  _onDelete(){
    this.setState({
      showModalConfirm : true
    })
  }

  _onDeleteConfirmYes(){
    this.setState({
      showModalConfirm : false
    })
    $('.modal-backdrop').remove()
    this._fetchData()
  }

  _DeleteObject(objectId){
    delete this.state.form[objectId]

  }

  render() {
    return (
      <div className="col-md-12">
        <h1>Data Source Configuration</h1>
        {this.state.showModal ? <Modal handleHideModal={ () => {this.showModal(false); this._fetchData()}} /> : null}
          {this.state.showModalConfirm ? <ModalConfirm title="Delete Data Source" yesCallback={this._onDeleteConfirmYes.bind(this)} handleHideModal={ () => this.setState({showModalConfirm : false})} >
          Deleting this data source will delete all data inside the staging table, do you want to continue?
        </ModalConfirm> : null}
        <div className="row">
          <div className="col-md-4 col-md-offset-4 text-center" >
            <button className="btn btn-primary" onClick={this._addDataSource.bind(this)}>
            <i className="fa fa-plus"/> Add Data Source</button>
          </div>
        </div>
        <div className="col-md-12 table-responsive">
          <table className="table table-bordered table-hover" style={{marginTop: 30, border: '1px solid #ccc'}}>
            <thead>
            <tr>
              {this.columns.map((object, key) => {
                return <th key={object.key}>{object.name}</th>
              })}
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
              {
                this.state.rows.map((object, key) => {
                  return <tr key={key+1000}>
                    <td>{object.id}</td>
                    <td>{object.dsName}</td>
                    <td>{object.ds}</td>
                    <td>{object.uname}</td>
                    <td>{object.password}</td>
                    <td>{object.created_date}</td>
                    <td>
                    <div className="btn-group">
                      <button type="button" className="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Action <span className="caret"></span>
                      </button>
                      <ul className="dropdown-menu">
                        <li><a href="#" onClick={this._onEdit}><i className="fa fa-pencil" /> Edit</a></li>
                        <li><a href="#" onClick={ () => this._onDelete(object)}><i className="fa fa-trash" /> Delete</a></li>
                      </ul>
                    </div>
                    </td>
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
