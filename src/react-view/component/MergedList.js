'use strict';

import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Router, browserHistory, withRouter, Link} from 'react-router'
import jq from 'jquery'
import moment from 'moment'
import * as helper from '../common/Helper'


class MergedTable extends React.Component {
  render () {
    let warning = this.props.rows.length == 0 ?
    <td colSpan={6}><h3>No records found.</h3></td> : ''
    return (
      <div className="table-responsive">

        <table className="table table-striped table-bordered table-condensed">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Status</th>
              <th>Record Owner</th>
              <th>Created Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {warning}
            {
              this.props.rows.map((object, key) => {
                return <tr key={key+2000}>
                <td><a target="_blank" href={`https://login.salesforce.com/${object.OldId ? object.OldId : object.Id}`}>{object.OldId ? object.OldId : object.Id}</a></td>
                <td>{object.Name}</td>
                <td>{object.status}</td>
                <td>{object.OwnerId}</td>
                <td>{moment(object.CreatedDate).format("ddd, DD/MM/YYYY hh:mm a")}</td>
                <td><Link to={"/merge/view/detail/" + object._id}>
                  <button type="button" className="btn btn-success btn-sm"> <i className="fa fa-eye"></i> View Detail</button>
                </Link></td>
                </tr>
              })
            }
          </tbody>
          <tfoot>
            <tr>
              <td  colSpan={5}><p className="text-right">Page {this.props.page} Of {this.props.pageSize}</p></td>
              <td className="text-right">
                {
                  this.props.page <= 1 ? '' :
                  <button className="btn btn-primary" onClick={this.props.next} data-page={this.props.page - 2}>
                  Prev <i className="fa fa-angle-left"/>  </button>
                }
                {
                  this.props.page == this.props.pageSize ? '' :
                  <button className="btn btn-primary" onClick={this.props.next} data-page={this.props.page}>
                  Next <i className="fa fa-angle-right"/>  </button>
                }


              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  }
}

MergedTable.propTypes= {
  rows : React.PropTypes.array.isRequired,
  next : React.PropTypes.func.isRequired,
}
MergedTable.defaultProps = {
  rows : [],
}


class MergedList extends React.Component {

  constructor(props)
  {
    super(props)
    this.state = {
      migrationObj : {},
      errorView : <p></p>,
      rows : [],
      page : 0,
      pageSize : 0
    }

  }
  componentDidMount(){
    let {id} = this.props.params
    jq.ajax({
      url : '/api/global-merge/' + id,
      type : "GET",
      success : function(response){
        this.setState({
          migrationObj : response.result
        })
      }.bind(this),
      error : function(err)
      {
        this.setState({
          errorView : helper.printErrorView("An error occured", "danger", () => {
            this.setState({
              errorView : <p></p>
            })
          })
        })
      }.bind(this)
    })
    this._fetchData(0)
  }

  _fetchData(page)
  {
    let {id} = this.props.params
    jq.ajax({
      url : `/api/global-merge/merged/${id}/${page}`,
      type : "GET",
      success : function(response){
        this.setState({
          rows : response.result,
          page : parseInt(page) + 1,
          pageSize : response.pageSize
        })
      }.bind(this),
      error : function(err)
      {
        this.setState({
          errorView : helper.printErrorView("An error occured", "danger", () => {
            this.setState({
              errorView : <p></p>
            })
          })
        })
      }.bind(this)
    })
  }
  _next(component)
  {
    this._fetchData(component.target.getAttribute('data-page'))
  }

  render() {
    let {id} = this.props.params
    return (
      <div className="col-md-12">
        <h2>Merged List : {id}</h2>
        {this.state.errorView}
        <p className="subtitle">These are result of merged configuration.</p>
        <div className="clearfix"></div>

        <div className="row" style={{marginBottom: 20}}>
          <div className="col-md-12">
            <h4>Migration Detail</h4>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-sm-6">
            <div className="form-group">
              <label className="col-md-5 col-sm-6">Name</label>
              <span className="col-md-1 col-sm-1 col-xs-hidden">:</span>
              <p className="col-md-6 col-sm-6">{this.state.migrationObj.name} </p>
            </div>
            <div className="form-group">
              <label className="col-md-5 col-sm-6">Deduplication Logic</label>
              <span className="col-md-1 col-sm-1 col-xs-hidden">:</span>
              <p className="col-md-6 col-sm-6">{this.state.migrationObj.deduplicationLogic} </p>
            </div>
            <div className="form-group">
              <label className="col-md-5">Created Date</label>
              <span className="col-md-1 hidden-sm hidden-xs">:</span>
              <p className="col-md-5 col-sm-5">{moment(this.state.migrationObj.createdAt).format("ddd, DD-MMMM-YYYY hh:mm a")}</p>
            </div>
            <div className="form-group">
              <label className="col-md-5">Last Modified Date</label>
              <span className="col-md-1 hidden-sm hidden-xs">:</span>
              <p className="col-md-5 col-sm-5">{moment(this.state.migrationObj.updatedAt).format("ddd, DD-MMMM-YYYY hh:mm a")}</p>
            </div>
          </div>
          <div className="col-md-6 col-sm-6">
            <div className="form-group">
              <label className="col-md-5 col-sm-5">Created By</label>
              <span className="col-md-1 col-sm-1 hidden-xs">:</span>
              <p className="col-md-5 col-sm-5">eko@interaktiv.sg</p>
            </div>
            <div className="form-group">
              <label className="col-md-5 col-sm-5">Merged</label>
              <span className="col-md-1 col-sm-1 hidden-xs">:</span>
              <p className="col-md-5 col-sm-5">{this.state.migrationObj.merged}</p>
            </div>
            <div className="form-group">
              <label className="col-md-5 col-sm-5">Existing</label>
              <span className="col-md-1 col-sm-1 hidden-xs">:</span>
              <p className="col-md-5 col-sm-5">{this.state.migrationObj.existing}</p>
            </div>
            <div className="form-group">
              <label className="col-md-5 col-sm-5">New</label>
              <span className="col-md-1 col-sm-1 hidden-xs">:</span>
              <p className="col-md-5 col-sm-5">{this.state.migrationObj.new}</p>
            </div>
            <div className="form-group">
              <label className="col-md-5">Status</label>
              <span className="col-md-1 hidden-sm hidden-xs">:</span>
              <p className="col-md-5 col-sm-5" style={{textTransform: 'capitalize'}}>{this.state.migrationObj.status}</p>
            </div>

          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {this.props.children || (<div>
              <h4>Merged Row</h4>
              <hr />
             <MergedTable rows={this.state.rows} page={this.state.page} pageSize={this.state.pageSize} next={this._next.bind(this)} /> </div>)}

          </div>
        </div>
      </div>
    );
  }
}
MergedList.contextType = {
  router : React.PropTypes.func.isRequired
}

export {MergedTable}
export default withRouter(MergedList)
