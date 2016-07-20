'use strict';

import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Router, browserHistory} from 'react-router'
import {SF_REQUEST} from '../global'
import moment from 'moment'

const _FORM = {}
const _META = [{fields : []}, {fields : []}]

class MergeTable extends React.Component {

  constructor(props)
  {
    super(props)
    this.state = {
      cols : this.props,
      option : [],
      meta : [{fields : []}, {fields : []}],
      dataSource : [{} , {}],
      errorMessage : <p></p>,
      syncing : false,
      form : {}
    }
  }
  componentDidMount(){
    if(this.props.currentState)
      this.setState(this.props.currentState)
    this.setState({
      cols : this.props.cols,
      meta : _META,
      form : _FORM
    })
    $.ajax({
      url   : '/api/ds',
      type  : "GET",
      success : function(response){
        this.setState({
          option : response.result
        })
      }.bind(this)
    })
  }


  componentShouldUpdate(nextProps){
    return nextProps.cols == this.props.cols
  }



  sync(key : nummber){

    //Return if state still syncing
    if(this.state.syncing) return
    this.setState({
      syncing : true
    })


    let dataSource = this.state.dataSource
    let errorView = <div className="alert alert-warning alert-dismissible" role="alert">
                  <button type="button" className="close" onClick={() => this.setState({errorMessage : <p></p>})} aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <strong>Sync Meta Data</strong> En error occured, your haven't picked object or data source.
                </div>
    let meta = this.state.meta
    dataSource[key] = dataSource[key] ? dataSource[key] : {}
    if(dataSource[key].dataSourceId && dataSource[key].objectName){
      $.ajax({
        url : '/api/migration/describe-object/' + dataSource[key].dataSourceId + "/" + dataSource[key].objectName,
        method : "GET",
        success : function(response){
          if(response.ok)
          {
            meta[key] = response.result
            this.setState({
              meta : meta[key] ? meta : this.state.meta ,
              syncing : false
            })
            Object.assign(_META, this.state.meta)
          }
          else
            this.setState({
              errorMessage : errorView,
              syncing : false
            })
        }.bind(this),
        error : function(response){
          this.setState({
            errorMessage : errorView,
            syncing : false
          })
        }.bind(this)
      })
      this.setState({
        dataSource : dataSource
      })
    }
    else
      this.setState({
        errorMessage :errorView,
        syncing : false
      })

  }

  _dataSourceChange(component)
  {
    let dataSource = this.state.dataSource, index = component.target.getAttribute('data-key')
    dataSource[index] = dataSource[index] ? dataSource[index] : {}
    dataSource[index].dataSourceId = component.target.value
    this.setState({
      dataSource:dataSource
    })
  }


  _objectChange(component)
  {
    let dataSource = this.state.dataSource, index = component.target.getAttribute('data-key')
    dataSource[index] = dataSource[index] ? dataSource[index] : {}
    dataSource[index].objectName = component.target.value
    this.setState({
      dataSource : dataSource
    })
  }


  _checkboxChanged(component)
  {
    let form  = this.state.form
    if(component.target.nextSibling){
      component.target.value = component.target.nextSibling.value ? component.target.nextSibling.value : component.target.value
      form[component.target.value] = form[component.target.value] ? form[component.target.value] : {}
      if(component.target.checked)
        form[component.target.value].source = component.target.nextSibling.value ? 'ds2' : 'ds1'
      else
        form[component.target.value].source = ''
    }
    this.setState({
      form : form
    })
    console.log(this.state.form)
  }

  _onChangeFieldSelectBox(component)
  {
    let form  = this.state.form
    component.target.previousSibling.value = component.target.value
    component.target.previousSibling.checked = true
    form[component.target.value] = form[component.target.value] ? form[component.target.value] : {}
    form[component.target.value].source = 'ds2'
    this.setState({
      form : form
    })
  }

  _formulaOnChange(component)
  {
    let form  = this.state.form
    form[component.target.name] = form[component.target.name] ? form[component.target.name] : {}
    form[component.target.name].formula = component.target.value

    this.setState({
      form : form
    })
    console.log(form)
  }

  render () {
    var thListSelect = [], thList = [], tBody = []

    for(var i=0;i<this.props.cols;i++){
      thList.push(
        <th key={i+10000} className="text-center">
          Data Source {i+1}
        </th>
      )
       thListSelect.push(<th key ={i+2000}>
         <select name={'DataSource' + i} className="form-control" onChange={this._dataSourceChange.bind(this)} data-key={i}>
           <option value=''></option>
           {this.state.option.map((object, key) => {
             return <option value={object.id} selected={this.state.dataSource[i].dataSourceId == object.id ? 'selected' : ''}
              key={key+object}>{object.name}</option>
           })}
         </select>
         <select name={'DataSource' + i} className="form-control" onChange={this._objectChange.bind(this)} data-key={i}>
           <option>---Object--- </option>
           <option value='account' >Account</option>
           <option value='contact'>Contact</option>
           <option value='opportunity'>Opportunity</option>
           <option value='activities'>Activities</option>
           <option value='attachment'>Notes & Attachment</option>
         </select>
         <input type="text" className="form-control"   placeholder = "Filter" />
         <div className="text-center">
            <button className="btn btn-warning btn-sm text-center btn-block" value={i} onClick={this.sync.bind(this, i)}>
            <i className="fa fa-refresh"></i> {this.state.syncing ? 'Syncing...' : 'Sync'}</button>
         </div>

      </th>)
    }

    let unMappedData = []
    if(this.state.meta[0].fields.length > 0 && this.state.meta[1].fields.length > 0)
    {
      for(var x = 0 ; x < this.state.meta[1].fields.length ; x++)
      {
        var found = false
        for(var y =0; y < this.state.meta[0].fields.length; y++)
        {
          if(this.state.meta[0].fields[y].fullName == this.state.meta[1].fields[x].fullName)
            found = true
        }
        if(!found)
          unMappedData.push(this.state.meta[1].fields[x])
      }
    }

    return (
      <div className="table-responsive">
        {this.state.errorMessage}

        <table className="table table-striped table-bordered">
          <thead>
          <tr>
            {thList}
            <th rowSpan={2} style={{verticalAlign: 'mid'}} className="text-center">Transformation / Formula</th>
          </tr>
          <tr>
            {thListSelect}

          </tr>
          </thead>
          <tbody>
          {
            this.state.meta[0].fields.map((field, index) => {
              let cols = []
              let data = this.state.form[field.fullName]
              cols.push(<td key={10000}><input type="checkbox" checked={ data ? data.source == 'ds1' : false} value={field.fullName } data-key={'ds1'} onChange={this._checkboxChanged.bind(this)} /> {field.label ? field.label : field.fullName} <br />
                <strong>DataType :</strong> {field.type ? field.type : "default" }
              </td>)
              cols.push(<td><input type="checkbox" checked={ data ? data.source == 'ds2' : false} name={'cols[1]' + field.fullName} data-key={'ds2'} onChange={this._checkboxChanged.bind(this)}  />
              <select className="form-control" onChange={this._onChangeFieldSelectBox.bind(this)}>
                <option></option>
                {
                    this.state.meta[1].fields.map((field2, index2) =>{
                      return <option value={field2.fullName} selected={field2.fullName == field.fullName}>{field2.label ? field2.label : field2.fullName}</option>
                    })
                }
              </select>
              </td>)
              return <tr key={field.fullName}>
                {cols}
                <td><textarea type="text" name={field.fullName} className="form-control" onChange={this._formulaOnChange.bind(this)} placeholder="Regex or Formula"></textarea></td>
              </tr>
            })
          }
          {

            unMappedData.map((field, index) => {
              return <tr>
                <td></td>
                <td><input type="checkbox" value={field.fullName} onChange={this._checkboxChanged.bind(this)} /> {field.label ? field.label : field.fullName} <br />
                <strong>Data Type</strong>: {field.type ? field.type : 'Default'}</td>
                <td><textarea type="text" name={field.fullName} className="form-control" placeholder="Regex or Formula"></textarea></td>
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
      cols : 2,
      mergeName : '',
      dedupLogic : '',
      isConfirmPage : false,
      mergedColumn : []
    }
    this._renderTable = this._renderTable.bind(this)
  }
  componentDidMount(){

  }

  _save(){
    if(document){
      this.setState({
        //mergedColumn : checked,
        isConfirmPage : true,
        migrationTableState : this.refs.mergeTable.state
      })
      Object.assign(_FORM, this.refs.mergeTable.state.form)
    }

  }

  _textOnChange(component){
    this.state[component.target.name] = component.target.value
    this.setState(this.state)

  }

  _renderTable() {
    return <div className="row">
      <div className="form-group col-md-6 col-lg-6 col-sm-6">
        <label>Global Merge Name</label>
        <input type="text" name='mergeName' className="form-control" placeholder="Name" onChange={this._textOnChange.bind(this)} value={this.state.mergeName}></input>
      </div>
      <div className="form-group col-md-6 col-lg-6 col-sm-6">
        <label>Deduplication Logic</label>
        <textarea type="text" name='dedupLogic' className="form-control" placeholder="Deduplication Logic" onChange={this._textOnChange.bind(this)} value={this.state.dedupLogic}></textarea>
      </div>
      <div className="clearfix" />
      <MergeTable ref='mergeTable' currentState={this.state.mergeTableState} router={this.props.router} cols={this.state.cols} onSave={this._save.bind(this)}></MergeTable>
    </div>
  }



  render() {
    return (
      <div className="col-md-12">
        <h1>Global Merge Row Configuration</h1>
        <div className="col-md-4 col-md-offset-4 text-center" style={{marginTop: 20, marginBottom: 20}}>
          {this.state.isConfirmPage ?
            <button onClick={() => this.setState({isConfirmPage : false, mergeTableState : _FORM})}
            className="btn btn-warning btn-sm"><i className="fa fa-save"></i> Cancel</button> : '' }
          <button onClick={this._save.bind(this)} className="btn btn-primary btn-sm"><i className="fa fa-save"></i> Save</button>
        </div>
        <div className="clearfix"></div>
        {this.state.isConfirmPage ? <MigrationConfirm mergedColumn={_FORM} dedupLogic={this.state.dedupLogic} mergeName={this.state.mergeName} /> :  this._renderTable()}
      </div>
    );
  }
}




class MigrationConfirm extends Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){
    console.log(this.props)
  }

  render()
  {
    let body = []
    Object.keys(this.props.mergedColumn).forEach((key) => {
      body.push(<tr key={key}>
        <td>{key}</td>
        <td>{this.props.mergedColumn[key].source}</td>
        <td>{this.props.mergedColumn[key].formula}</td>
      </tr>)
    })
    return<div className="row">
      <p>Please confirm this merge object</p>
      <div className="col-md-6">
        <label>Merge Name</label>
        <p>{this.props.mergeName}</p>
      </div>
      <div className="col-md-6">
        <label>Deduplication Logic</label>
        <p>{this.props.dedupLogic}</p>
      </div>
      <div className="clearfix"></div>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead><tr><td>Merged Column</td><td>Source</td><td>Formula</td></tr></thead>
          <tbody>
            {body}
          </tbody>
        </table>
      </div>
    </div>
  }
}
MigrationConfirm.propTypes = {
  mergedColumn : React.PropTypes.object
}
MigrationConfirm.defaultProps = {
  mergedColumn: []
};