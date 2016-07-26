'use strict';

import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Router, browserHistory, Link} from 'react-router'
import Modal from '../common/ModalConfirm'
import * as helper from '../common/Helper'
import moment from 'moment'
import jq from 'jquery'



class MigrationList extends React.Component {

  constructor(props)
  {
    super(props)
    this.state = {
      jombotron : {display: 'block'},
      showModal : false,
      rows : [],
      deletedObj : null,
      errorView : <p></p>
    }
    this._delete = this._delete.bind(this)
    this._showModal = this._showModal.bind(this)
    this.rows = []
  }
  componentDidMount(){
    jq.ajax({
      url: '/api/global-merge',
      data : {
        _csrf : CSRF_TOKEN
      },
      type: 'GET',
      success: function(response) {
        this.setState({
          rows : response.result
        })
      }.bind(this),
      error : function(result)
      {
        this.setState(
          {
            errorView: helper.printErrorView("Unable to get the global merge configuration. Please retry. ",
                      "warning", function(){
                        this.setState({errorView:<p></p>})
                      }.bind(this))
          }
        )
      }.bind(this)
    });

  }

  _addDataSource(){
    if(document)
      document.title = "InterAktiv ~ Add new data source"
    this.props.history.push('/merge/new')
  }

  _showModal(status, obj){
    this.setState({showModal: status, deletedObj : obj})
  }

  _queueMigration(updatedObj, callback){
    let rows = this.state.rows
    jq.ajax({
      url: '/api/global-merge/' + updatedObj.id,
      data : {
        _csrf : CSRF_TOKEN,
        status : 'processing'
      },
      type: 'PUT',
      success: function(response) {
        if(response.ok)
        {
          for(let x in rows){
            if(rows[x] == updatedObj)
              rows[x].status = 'processing'
          }
          this.setState({rows : rows,
            errorView: helper.printErrorView(`Update status "${updatedObj.name}" succesfully done. We'll notify you when the process is done. `,
                      "success", function(){
                        this.setState({errorView:<p></p>})
                      }.bind(this))
          })
        }
      }.bind(this),
      error : function(result)
      {
        this.setState(
          {
            errorView: helper.printErrorView(`Unable to update status "${updatedObj.name}", Please retry. `,
                      "warning", function(){
                        this.setState({errorView:<p></p>})
                      }.bind(this))
          }
        )
      }.bind(this)
    });

  }

  _delete(deletedObj, callback)
  {
    let rows = this.state.rows
    jq.ajax({
      url: '/api/global-merge/' + deletedObj.id,
      data : {
        _csrf : CSRF_TOKEN
      },
      type: 'delete',
      success: function(response) {
        if(response.ok)
        {
          for(let x in rows){
            if(rows[x] == deletedObj)
              delete rows[x]
          }
          this.setState({rows : rows, deletedObj : null})
        }
      }.bind(this),
      error : function(result)
      {
        this.setState(
          {
            errorView: helper.printErrorView("Unable to delete " + deletedObj.name + ". Please retry. ",
                      "warning", function(){
                        this.setState({errorView:<p></p>})
                      }.bind(this))
          }
        )
      }.bind(this)
    });
    callback()
  }


  render() {
    return this.props.children ? React.cloneElement(this.props.children) : (
      <div className="col-md-12">
        <h1>Global Merge Configuration</h1>
        {this.state.showModal ? <Modal object={this.state.deletedObj} handleHideModal={ () => this._showModal(false)} yesCallback={this._delete} >
          By clicking yes, "{this.state.deletedObj.name}" will be deleted. Are you sure to continue?
        </Modal> : null}
        {this.state.errorView}
        <div className="row">
          <div className="col-md-4 col-md-offset-4 text-center" >
            <button className="btn btn-primary" onClick={this._addDataSource.bind(this)}>
            <i className="fa fa-plus"/> New Migration </button>
          </div>
        </div>
        <div className="col-md-12 table-responsive">
          <table className="table table-striped table-bordered" style={{marginTop: 30}}>
            <thead>
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>Name</th>
              <th>Deduplication Logic</th>
              <th>Result</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
              {
                this.state.rows.map((object, key) => {
                  return <tr key={key+1000}>
                    <td>{object.id}</td>
                    <td style={{textTransform:'capitalize'}}>{object.type}</td>
                    <td>{object.name}</td>
                    <td>{object.deduplicationLogic}</td>
                    <td>
                      <p style={{color: 'red'}}>{object.conflict} Conflict</p>
                      <p style={{color: 'green'}}>{object.merged} Merged</p>
                      <p style={{color: '#222'}}>{object.existing} Existing</p>
                      <p style={{color: '#666'}}>{object.new} New</p>
                    </td>
                    <td>{object.status}</td>
                    <td>{moment(object.createdAt).format("ddd, DD-MMMM-YYYY hh:mm a")}</td>
                    <td>
                      <div className="btn-group">
                      <button type="button" className="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Action <span className="caret"></span>
                      </button>
                      <ul className="dropdown-menu">
                        <li className={object.status == 'draft' ? 'hidden' : 'shown'}><Link to={"/migration/fix-conflict/" + object.id}><i className={'fa fa-chain-broken'}></i> Fix Conflict</Link></li>
                        <li className={object.status == 'draft' ? 'shown' : 'hidden'}><Link to={"/merge/edit/" + object.id}><i className={'fa fa-pencil'}></i> Edit Config</Link></li>
                        <li className={object.status == 'draft' ? 'hidden' : 'shown'}><Link to={"/migration/view/" + object.id}><i className={'fa fa-eye'}></i> View Rows</Link></li>
                        <li className={object.status == 'draft' ? 'shown' : 'hidden'}><a href="#" onClick={(e) => { e.preventDefault(); this._queueMigration(object) }}> <i className="fa fa-chain" ></i> Do Merge</a></li>
                        <li className={object.status == 'draft' ? 'shown' : 'hidden'}><a href="#" onClick={(e) => {e.preventDefault(); this._showModal(true, object)}}> <i className="fa fa-trash" ></i> Delete Merge Config</a></li>
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


MigrationList.contextType = {
  router : React.PropTypes.func.isRequired
}

export default MigrationList
