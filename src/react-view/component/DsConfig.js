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
      errorMessage : [],
      rows : []
    }
    this._onChange = this._onChange.bind(this)
  }

  componentDidMount(){
    var id = ReactDOM.findDOMNode(this).id

    $('#' + id).modal('show');
    $('#' + id).on('hidden.bs.modal', this.props.handleHideModal);
    if(this.props.object)
      this.setState({
        form : {
          name : this.props.object.dsName,
          password : this.props.object.password,
          mode  : JSON.parse(this.props.object.additionalSetting).mode,
          username :  this.props.object.uname,
          type :  this.props.object.ds,
          token : this.props.object.token,
        }
      })
  }

  _onChange(component){

    var form = this.state.form
    const allowedFormKey = ['name', 'username', 'password', 'token', 'type']

    if(allowedFormKey.indexOf(component.target.name) > -1)
      form[component.target.name] = component.target.value
    else{
      var val = form['additionalSetting'] ? JSON.parse(form['additionalSetting']) : {}
      form[component.target.name] = component.target.value
      val[component.target.name] = component.target.value
      form['additionalSetting'] = JSON.stringify(val)
    }
    this.setState({
      form : form
    })

  }

  _onSave(component){
    var id = ReactDOM.findDOMNode(this).id
    var form = this.state.form
    form._csrf = CSRF_TOKEN

    jq.ajax({
      url : '/api/ds' + (this.props.object ? '/' + this.props.object.id : '' ),
      type: this.props.object == undefined ? "POST" : "PUT",
      data : form,
      success : (res) => {
        if(res.ok)
        {
          $('#' + id).modal('hide')
        }
      },
      error :function (res){
        var response = JSON.parse(res.responseText)
        if(typeof response.message == 'object')
          this.setState({
            errorMessage : response.message.errors
          })
      }.bind(this)
    })

  }



  render(){
    let additionalSetting = ''

    if(this.state.type == 'Salesforce'){
       additionalSetting = <div>
         <div className="form-group">
          <label>Mode</label>
          <select type="text" name="mode" className="form-control" onChange={this._onChange} value={this.state.form.mode}>
            <option value="">----</option>
            <option value="dev">Sandbox</option>
            <option value="prod">Production</option>
          </select>
        </div>
         <div className="form-group">
          <label>Password &amp; Security Token</label>
          <input type="text" name="password" className="form-control" placeholder="Password" onChange={this._onChange} value={this.state.form.password}/>
        </div>
        <div className="form-group">
           <label> Security Token</label>
           <input type="text" name="token" className="form-control" placeholder="Security Token" onChange={this._onChange} value={this.state.form.token}/>
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
                <input type="text" className="form-control" name="name" placeholder="Name" onChange={this._onChange} value={this.state.form.name}/>
              </div>
              <div className="form-group">
                <label>Data Source Type</label>
                <select  className="form-control" name="type" onChange={this._onChange} >
                  {
                    ['', 'Salesforce', 'MySQL', 'Dynamo Db', 'CSV File', 'JSON File', 'Url'].map((object, key) => {
                      return <option key={object} value={object} selected={this.state.form.type == object ? 'selected' : ''}>{object}</option>
                    })
                  }
                </select>
              </div>
              <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control" name="username" placeholder="User name" onChange={this._onChange} value={this.state.form.username} />
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
      showModal : false,
      rows : [],
      objectSelected : null,
      errorView : (<p></p>)
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
            password: res.result[i].password,
            token : res.result[i].token,
            additionalSetting : res.result[i].additionalSetting,
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
    this.setState({
      objectSelected : undefined
    })
  }

  showModal(status){
    this.setState({showModal: status})
    if(!status)
      document.title = "InterAktiv ~ Data Source"
  }

  _onEdit(object) {
    this.showModal(true)
    this.setState({
      objectSelected : object
    })
  }

  _onDeleteHide(){

  }

  _onDelete(object){
    this.setState({
      showModalConfirm : true,
      objectSelected : object
    })

  }

  _onDeleteConfirmYes(result, callback){

    this.setState({
      showModalConfirm : false
    })
    let errorView = <div className="alert alert-warning alert-dismissible" role="alert">
                  <button type="button" className="close" onClick={() => this.setState({errorView : <p></p>})} aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <strong>Delete!</strong> En error occured, don't worry we'll fix this.
                </div>


    callback()
    jq.ajax({
      url: '/api/ds/' + result.id,
      data : {
        _csrf : CSRF_TOKEN
      },
      type: 'DELETE',
      success: function(result2) {

        if(result2.ok)
        {
          for(var i in this.state.rows)
          {

            if(this.state.rows[i].id == result.id){
              delete this.state.rows[i]
              console.log("find one")
            }
          }
          this.setState({
            rows : this.state.rows
          })
        }
        else {
          this.setState({errorView: errorView})
        }

      }.bind(this),
      error : function(result)
      {
        this.setState({errorView: errorView})
      }.bind(this)
    });

  }

  _DeleteObject(objectId){
    delete this.state.form[objectId]

  }

  render() {
    return (
      <div className="col-md-12">
        <h1>Data Source Configuration</h1>
        {this.state.showModal ? <Modal object={this.state.objectSelected} handleHideModal={ () => {this.showModal(false); this._fetchData()}} /> : null}
          {this.state.showModalConfirm ? <ModalConfirm ref='modalConfirm' title="Delete Data Source" object={this.state.objectSelected} yesCallback={this._onDeleteConfirmYes.bind(this)} handleHideModal={ () => this.setState({showModalConfirm : false})} >
          Deleting this data source will delete all data inside the staging table, do you want to continue?
        </ModalConfirm> : null}
        <div className="row">
          <div className="col-md-4 col-md-offset-4 text-center" >
            <button className="btn btn-primary" onClick={this._addDataSource.bind(this)}>
            <i className="fa fa-plus"/> Add Data Source</button>
          </div>
        </div>
        {this.state.errorView}
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
                        <li><a href="#" onClick={ () => this._onEdit(object)}><i className="fa fa-pencil" /> Edit</a></li>
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
