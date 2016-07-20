'use strict';

import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Router, browserHistory, withRouter} from 'react-router'
import faker from 'faker'
import moment from 'moment'
import {ModalLoading} from '../common/Modal'
import MetaDataSample, {AccountExample}  from './sample-meta'



class MigrationRowDetail extends React.Component {

  constructor(props)
  {
    super(props)
    this.state = {
      jombotron : {display: 'block'},
      rowsMerged : [],
      //meta : MetaDataSample.fields,
      detailRow : [],
      mergeResult : {},
      showLoading : true
    }
    this._getMetaData = this._getMetaData.bind(this)
    this._pickMain = this._pickMain.bind(this)
  }
  componentWillMount(){
    this.setState({
      rowsMerged : this.props.query,
      detailRow : AccountExample(3)
    })
  }

  componentDidMount(){
    setTimeout(() => {
      this.refs.modalLoading._hide()
      this.setState({showLoading:false})

    }, 1500)
  }

  _pickMain(columnNo, object, val)
  {
    var detailRow = this.state.detailRow,
    mergeResult = this.state.mergeResult
    mergeResult[object.fullName] = mergeResult[object.fullName] ? mergeResult[object.fullName] : []


    if(val.target.checked){
      if(mergeResult[object.fullName].indexOf(val.target.value) < 0)
        mergeResult[object.fullName].push(val.target.value)
    }
    else{
      var position = mergeResult[object.fullName].indexOf(val.target.value)
      if( position > -1)
        delete mergeResult[object.fullName][position]
    }
    this.setState({
      mergeResult : mergeResult
    })
  }

  _checkAll(val){
    var mergeResult = this.state.mergeResult
    this.state.meta.map((object, key)=>{
      mergeResult[object.fullName]  = mergeResult[object.fullName] ? mergeResult[object.fullName] : []
      if(val.target.checked){
        if(mergeResult[object.fullName].indexOf(this.state.detailRow[val.target.value][object.fullName]) < 0)
          mergeResult[object.fullName].push(this.state.detailRow[val.target.value][object.fullName])
      }
      else{
        var position = mergeResult[object.fullName].indexOf(this.state.detailRow[val.target.value][object.fullName])
        if( position > -1)
          delete mergeResult[object.fullName][position]
      }
    })
    this.setState({
      mergeResult : mergeResult
    })
  }

  _getMetaData(){

  }


  _save(){
    this.setState({showLoading : true})
    setTimeout(() => {
      this.refs.modalLoading._hide()
      this.setState({showLoading : false})
      this.props.router.replace('/migration/fix-conflict/' + this.props.params.id)
    }, 1500)

  }

  render() {
    let { query } = this.props.location

    query = query.rowId.split(',')
    var th1 = [], th2 = []
    for(var x = 0 ; x < query.length ; x++){
      if(query[x] != ''){
        th1.push(
          <th key={x + 'header_obj'}>
            {'Object' + x}
          </th>
        )
        th2.push(
          <th key={x + 'header'}>
            {query[x]}
            <br />
            <p className="text-center">
            <input type="checkbox" onChange={this._checkAll.bind(this)} value={x} />
            </p>
          </th>
        )
      }
    }

    return (
      <div className="row">
        {this.state.showLoading ? <ModalLoading ref="modalLoading" handleHideModal={ () => this.setState({showLoading : false })} /> : null}
        <div className="col-md-12">
          <h4>Merging Row</h4>
          <hr />
          <p className="subtitle">Select the values that you want to retain in the merged record. Highlighted rows indicate fields that contain conflicting data. The Master Record selected will retain read-only and hidden field values. The oldest Created By date and user will be retained in the merged record.</p>
          <div className="clearfix"></div>
        </div>
        <div className="col-md-12 col-lg-12">
          <div className="text-center">
            <button className="btn btn-primary" onClick={this._save.bind(this)}><i className="fa fa-save"/> Save</button>
          </div>
          <div className="table-responsive">

            <table className="table table-condensed table-striped">
              <thead>
                <tr>
                  <th rowSpan={2}>#</th>
                  {th1}
                  <th rowSpan={2} style={{verticalAlign : 'middle'}}>Merged Object Result</th>
                </tr>
                <tr>
                  {th2}
                </tr>

              </thead>
              <tbody>
                {this.state.meta.map((object, index) => {
                  var td = []
                  for(var x = 0 ; x<th1.length;x++){
                    var checked = false
                    if(this.state.mergeResult[object.fullName])
                      checked = this.state.mergeResult[object.fullName].indexOf(this.state.detailRow[x][object.fullName]) > -1

                    td.push(
                      <td>
                        <input checked={checked} type="checkbox" value={this.state.detailRow[x][object.fullName]} onChange={(val) => this._pickMain(this.state.detailRow[x][object.fullName], object, val)} /> {this.state.detailRow[x][object.fullName]}
                      </td>
                    )
                  }
                  return <tr>
                    <td>{object.label ? object.label : object.fullName}</td>
                    {td}
                    <td>
                      {
                        typeof this.state.mergeResult[object.fullName] == 'array' ?
                          this.state.mergeResult[object.fullName].concat(' ') :this.state.mergeResult[object.fullName] }
                    </td>
                  </tr>
                })}

              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}


MigrationRowDetail.contextType = {
  router : React.PropTypes.func.isRequired
}

export default withRouter(MigrationRowDetail)
