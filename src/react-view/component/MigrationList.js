'use strict';

import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Router, browserHistory, Link} from 'react-router'
import faker from 'faker'
import moment from 'moment'
import jq from 'jquery'
if (typeof Math != 'object'){
  let Math = {
    random : () => {
      return faker.random.number()
    }
  }
}



class MigrationList extends React.Component {

  constructor(props)
  {
    super(props)
    this.state = {
      jombotron : {display: 'block'},
      showModal : false,
      rows : []
    }
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
        //this.setState({errorView: errorView})
      }.bind(this)
    });

  }

  _addDataSource(){
    if(document)
      document.title = "InterAktiv ~ Add new data source"
    this.props.history.push('/merge/new')
  }

  showModal(status){
    this.setState({showModal: status})
  }

  _queueMigration(){
    alert("Migration has been queued. We'll inform you when it's done.")
  }


  render() {


    return this.props.children ? React.cloneElement(this.props.children) : (
      <div className="col-md-12">
        <h1>Global Merge Configuration</h1>
        {this.state.showModal ? <Modal handleHideModal={ () => this.showModal(false)} /> : null}
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
                      <p style={{color: 'red'}}>{object.conflictRow} Conflict</p>
                      <p style={{color: 'green'}}>{object.successRow} Success</p>
                      <p style={{color: 'aqua'}}>{object.importedRow} Existing</p>
                      <p style={{color: 'aqua'}}>{object.newRow} New</p>
                    </td>
                    <td>{object.status}</td>
                    <td>{moment(object.createdAt).format("ddd, DD-MMMM-YYYY hh:mm a")}</td>
                    <td>
                      <div className="btn-group">
                      <button type="button" className="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Action <span className="caret"></span>
                      </button>
                      <ul className="dropdown-menu">
                        <li><Link to={"/migration/fix-conflict/" + object.id}><i className={'fa fa-chain-broken'}></i> Fix Conflict</Link></li>
                        <li><Link to={"/migration/view/" + object.id}><i className={'fa fa-eye'}></i> View Success</Link></li>
                       <li><Link to={"/migration/success/account/" + object.id}><i className={'fa fa-eye'}></i> View Account</Link></li>
                       <li><Link to={"/migration/success/opportunity/" + object.id}><i className={'fa fa-eye'}></i> View Opportunity</Link></li>
                       <li role="separator" className="divider"></li>
                        <li><a href="#" onClick={this._queueMigration}>Queue Migration!</a></li>
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
