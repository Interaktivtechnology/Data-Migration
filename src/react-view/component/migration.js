'use strict';

import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Router, browserHistory, Link, withRouter} from 'react-router'
import faker from 'faker'
import moment from 'moment'
import meta from './sample-meta'
import meta2 from './sample-meta2'

class MigrationTable extends React.Component {

  constructor(props)
  {
    super(props)
    this.state = {
      cols : this.props,
      ds1: 'Swift ~ Salesforce',
      ds2: 'Swift ~ Salesforce',
      obj1: '',
      obj2: '',
      fil1: '',
      fil2 : '',
      conf : [],
      sconf : [],
      dsel : [],
      dconf : [],
      fil : []
    }
  /*this.option = []
  for(var i=0; i<10;i++){
      this.option.push(
        <option value={i} key={i+1000}>{(i%5 == 0 && i < 5? 'Swift' : 'Air Energi' ) ||
         faker.internet.domainName()} ~ {['Salesforce', 'MySQL', 'Dynamo Db', 'CSV File', 'JSON File', 'Url'][i%5]}</option>
      )
    }*/
   this.selval = ['Swift ~ Salesforce','Air Energi ~ Salesforce', 'Air Energi ~ MySQL', 'Air Energi ~ Dynamo Db', 'Air Energi ~ CSV File', 'Air Energi ~ JSON File', 'Air Energi ~ Url']
   this.option = this.selval.map(function(opt, i){
    return (<option value={opt}>{opt}</option>)
  })
 }
  componentDidMount(){
    var conf = [], k = 0
    meta.fields.map((object, key) => {
        conf[k++] = object.fullName
    })
    this.setState({conf : conf})
    var sconf = {},dsel={},dconf={},fil={};
    meta.fields.map((object, key) => {
        sconf[object.fullName] = 'false',
        dsel[object.fullName] = 'Id',
        dconf[object.fullName] = 'false',
        fil[object.fullName] = ''
    })
    this.setState({sconf : sconf})
    this.setState({dsel : dsel})
    this.setState({dconf : dconf})
    this.setState({fil : fil})

    this.setState({
      cols : this.props.cols
    })
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      cols : nextProps.cols
    })
  }

  _saveData(event){
     if(event.target.name == 'sds0'){
     this.setState({ds1: event.target.value});
     } else if(event.target.name == 'sds1'){
       this.setState({ds2: event.target.value});
     } else if(event.target.name == 'sobj0'){
       this.setState({obj1: event.target.value});
     } else if(event.target.name == 'sobj1'){
       this.setState({obj2: event.target.value});
     } else if(event.target.name == 'sfil0'){
       this.setState({fil1: event.target.value});
     } else if(event.target.name == 'sfil1'){
     this.setState({fil2: event.target.value});
     }
     if(event.target.name.includes("src")){
      var sconf = this.state.sconf
      var sname
      meta.fields.map((object, key) => {
        sname = 'src'+object.fullName;
        if(sname == event.target.name){
          if(event.target.checked){
          sconf[object.fullName] = 'true';
          } else {
          sconf[object.fullName] = 'false';
          }
        }
      })
      this.setState({sconf:sconf})
     }
      if(event.target.name.includes("dest")){
      var dsel = this.state.dsel
      var tname
      meta.fields.map((object, key) => {
        tname = 'd'+object.fullName;
        if(tname == event.target.name){
          dsel[object.fullName] = event.target.value;
        }
      })
      this.setState({dsel:dsel})
    }
     if(event.target.name.includes("chk")){
      var dconf = this.state.dconf
      var cname
      meta.fields.map((object, key) => {
        cname = 'chk'+object.fullName;
        if(cname == event.target.name){
          if(event.target.checked){
          dconf[object.fullName] = 'true';
          } else {
          dconf[object.fullName] = 'false';
          }
        }
      })
      this.setState({dconf:dconf})
    }
      if(event.target.name.includes("filt")){
       var fil = this.state.fil;
       var cfname;
       meta.fields.map((object, key) => {
         cfname = 'filt'+object.fullName;
         if(cfname == event.target.name){
           fil[object.fullName] = event.target.value;
         }
       })
       this.setState({fil:fil})
    }
      //alert(conf);
  }
  _saveDataSource(){
  if(document)
  document.title = "InterAktiv ~ Save new data source"
  var conf = this.state.conf, tsconf = this.state.sconf, sconf = []
  for(var i=0;i<conf.length;i++){
    sconf.push({'Name' : conf[i], 'Value' :tsconf[conf[i]]})
  }
  localStorage.setObj('sconf', sconf)
  localStorage.setObj('dsel', this.state.dsel)
  localStorage.setObj('dconf', this.state.dconf)
  localStorage.setObj('fil', this.state.fil)
  localStorage.setItem('ds1', this.state.ds1)
  localStorage.setItem('ds2', this.state.ds2)
  localStorage.setItem('obj1', this.state.obj1)
  localStorage.setItem('obj2', this.state.obj2)
  localStorage.setItem('fil1', this.state.fil1)
  localStorage.setItem('fil2', this.state.fil2)
  //console.log(localStorage.getObj('fil'))
  this.props.router.push({pathname : '/migration/save'})
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
        <select name={'sds' + i} className="form-control" onChange={this._saveData.bind(this)}>
          {this.option}
        </select>
        <select name={'sobj' + i} className="form-control" onChange={this._saveData.bind(this)}>
          <option>---Object--- </option>
          <option value='account'>Account</option>
          <option value='contact'>Contact</option>
          <option value='leads'>Opportunities</option>
          <option value='activities'>Activities</option>
          <option value='notes_attachment'>Notes & Attachment</option>
        </select>
          <input name={'sfil' + i} type="text" className="form-control" placeholder="Filter" onChange={this._saveData.bind(this)}/>
      </th>)
    }

    return (
      <div>
      <div className="col-md-4 col-md-offset-4 text-center" style={{marginTop: 20, marginBottom: 20}}>
        <button onClick={this._saveDataSource.bind(this)} className="btn btn-primary btn-sm"><i className="fa fa-save"></i> Save</button>
      </div>
      <div className="clearfix"></div>
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
        cols.push(<td key={10000}><input type="checkbox" name={'src'+object.fullName} onClick={this._saveData.bind(this)}/> {object.fullName}</td>)
              cols.push(<td><input type="checkbox" onClick={this._saveData.bind(this)} name={'chk'+object.fullName}/>
              <select className="form-control" onChange={this._saveData.bind(this)} name={'dest'+object.fullName}>
                {meta2.fields.map((object2, key2) =>{
                  /*selected={object.fullName == object2.name}*/
                  return <option value={object2.name} >{object2.name}</option>
                })}

              </select>
              <button className="btn btn-success btn-sm"><i className="fa fa-plus"></i> New field</button>
              </td>)
              return <tr key={object.fullName}>
                {cols}
                <td><textarea type="text" className="form-control" placeholder="Regex or Formula" onChange={this._saveData.bind(this)} name={'filt'+object.fullName}></textarea></td>
              </tr>
            })
          }
          </tbody>
          <tfoot></tfoot>
        </table>
      </div>
      </div>
    )
  }
}


class Migration extends React.Component {

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
        <MigrationTable router={this.props.router} cols={this.state.cols}></MigrationTable>
      </div>
    );
  }
}
Migration.contextType = {
  router : React.PropTypes.func.isRequired
}

export {MigrationTable}
export default withRouter(Migration)
