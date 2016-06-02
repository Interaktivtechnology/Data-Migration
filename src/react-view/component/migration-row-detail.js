'use strict';

import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Router, browserHistory} from 'react-router'
import faker from 'faker'
import moment from 'moment'
import {ModalLoading} from '../common/modal'
var meta = require('./sample-meta')



class MigrationRowDetail extends React.Component {

  constructor(props)
  {
    super(props)
    this.state = {
      jombotron : {display: 'block'},
      rowsMerged : []
    }
  }
  componentWillMount(){
    console.log(this.props)
    this.setState({
      rowsMerged : this.props.query
    })
  }



  render() {
    return (
      <div className="row">
        {this.state.showModal ? <Modal handleHideModal={ () => this.showModal(true)} /> : null}
        <div className="col-md-12">
          <h1>Merging Row</h1>
          <p>Select the values that you want to retain in the merged record. Highlighted rows indicate fields that contain conflicting data. The Master Record selected will retain read-only and hidden field values. The oldest Created By date and user will be retained in the merged record.</p>
          <div className="clearfix"></div>

        </div>
      </div>
    );
  }
}


MigrationRowDetail.contextType = {
  router : React.PropTypes.func.isRequired
}

export default MigrationRowDetail
