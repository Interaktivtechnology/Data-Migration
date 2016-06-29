'use strict';

import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Router, browserHistory, Link} from 'react-router'
import faker from 'faker'
import moment from 'moment'

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
      showModal : false
    }
    this.rows = []
  }
  componentWillMount(){
    for(var i=0;i< 3;i++)
      this.rows.push({
        id : faker.random.number(),
        from : 'Swift',
        to : 'Air Energi',
        sobject : ['Account', 'Contact', 'Opportunity', 'Activity'][i%4],
        type : ['Salesforce', 'MySQL'][i%2],
        username : faker.internet.userName(),
        result : {
          conflict : Math.random() * 1000,
          success : Math.random() * 1000,
          complete : Math.random() * 100,
        },
        created_date : moment(faker.date.recent()).format("ddd, DD MMM YYYY HH:mm")
      })
  }

  _addDataSource(){
    if(document)
      document.title = "InterAktiv ~ Add new data source"
    this.props.history.push('/migration/new')
  }

  showModal(status){
    this.setState({showModal: status})
  }

  _queueMigration(){
    alert("Migration has been queued. We'll inform you when it's done.")
  }


  render() {
    var thead = []
    if(this.rows.length > 0)
      for(var key in this.rows[0])
        thead.push(
          <th style={{textTransform : 'capitalize'}}>{key.replace(/_/ig, ' ')}</th>
        )

    return this.props.children ? React.cloneElement(this.props.children) : (
      <div className="col-md-12">
        <h1>Air Energi Migration</h1>
        {this.state.showModal ? <Modal handleHideModal={ () => this.showModal(false)} /> : null}
        <div className="row">
          <div className="col-md-4 col-md-offset-4 text-center" >
            <button className="btn btn-primary" onClick={this._addDataSource.bind(this)}>
            <i className="fa fa-plus"/> New Migration </button>
          </div>
        </div>
        <div className="col-md-12 table-responsive">
          <table className="table table-bordered" style={{marginTop: 30}}>
            <thead>
            <tr >
              {thead}
            </tr>
            </thead>
            <tbody>
              {
                this.rows.map((object, key) => {
                  return <tr key={key+1000}>
                    <td>{object.id}</td>
                    <td>{object.from}</td>
                    <td>{object.to}</td>
                    <td>{object.sobject}</td>
                    <td>{object.type}</td>
                    <td>{object.username}</td>
                    <td>
                      <p style={{color: 'red'}}>{object.result.conflict.toFixed(0)} Conflict</p>
                      <p style={{color: 'green'}}>{object.result.success.toFixed(0)} Success</p>
                      <div className="progress">
                        <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow={object.result.conflict.toFixed(2)} aria-valuemin="0" aria-valuemax="100" style={{width: object.result.complete + "%"}}>
                          {object.result.complete.toFixed(0)} %
                        </div>
                      </div>
                    </td>
                    <td>{object.created_date}</td>
                    <td>
                      <div className="btn-group">
                      <button type="button" className="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Action <span className="caret"></span>
                      </button>
                      <ul className="dropdown-menu">
                        <li><Link to={"/migration/fix-conflict/" + object.id}><i className={'fa fa-chain-broken'}></i> Fix Conflict</Link></li>
                        <li><Link to={"/migration/view/" + object.id}><i className={'fa fa-eye'}></i> View Success</Link></li>
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
