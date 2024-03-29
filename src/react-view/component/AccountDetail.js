'use strict';
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Router, browserHistory, withRouter} from 'react-router'
import acct from './sample-account'
import jq from 'jquery'
import moment from 'moment'
import * as helper from '../common/Helper'
import DoubleClickInput from '../common/DoubleClickInput'

class AccountDetail extends React.Component {

  constructor(props)
  {
    super(props)
    this.state = {
      account :  {},
      errorView : <p></p>,
      acctdet : acct.attributes['0'],
      cont:acct.Contact,
      sc: acct.Account_Scorecard__c,
      opp:acct.Opportunity__c,
      ah:acct.ActivityHistory,
      na:acct.NotesAndAttachments,
    }
  }
  componentDidMount(){

    let {objectId, migrationId} = this.props.params
    jq.ajax({
      url : `/api/global-merge/merged/detail/${migrationId}/${objectId}`,
      type : "GET",
      success : function(response){
        this.setState({
          account : response.result
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

  render() {
    let dispheadcont = [], disprowcont = [],
      dispheadsc = [], disprowsc = [], dispheadopp = [],
      disprowopp = [], dispheadah = [], disprowah = [],
      dispheadna = [], disprowna = []
    let {objectId, migrationId} = this.props.params
    let urlUpdate = `/api/global-merge/merged/detail/${migrationId}/${objectId}`

    return(
    <div className="col-md-12">
      <div className="bPageTitle">
        <div className="ptBody">
          <div className="content">
            <img className="pageTitleIcon" src={'/images/bank32.png'}/>
            <h1 className="pageType">Account</h1>
            <h2 className="pageDescription">{this.state.account.Name}</h2>
          </div>
        </div>
      </div>
      <div className="clearfix"></div>
      <div className="row">
        <div className="col-sm-4 col-sm-offset-8 text-right">
          <h3>Status : {this.state.account.status}</h3>
          <a className="btn btn-primary" target="_blank" href={`https://eu3.salesforce.com/${this.state.account._id}`}>Air Record</a>
          <a  className="btn btn-success" target="_blank" href={`https://na24.salesforce.com/${this.state.account.RefId}`}>Swift Record</a>
        </div>
      </div>
      <div className="pbHeader">
        <table border="0" cellpadding="0" cellspacing="0">
          <tbody>
            <tr>
              <td className="pbTitle">
                <h2 className="mainTitle">Account Detail</h2>
              </td>
              <td className="pbButton" id="topButtonRow"></td>
          </tr>
          </tbody>
        </table>
      </div>
      <div className="clearfix"></div>
      <div className="bPageBlock2 divdata2">
        <div className="txtlabel">Account Detail</div>
         <div className="pbSubsection">
           <table className="sec" border="0" cellPadding="0" cellSpacing="0">
           <tbody>
           <tr>
             <td className="tlabel col25">Account Owner</td>
             <td className="tdata col25"><DoubleClickInput fieldName="Owner.Name" urlUpdate={urlUpdate} >{this.state.account.Owner ? this.state.account.Owner.Name : '' }</DoubleClickInput></td>
             <td className="tlabel col25">Account Record Type</td>
             <td className="tdata col25">{this.state.account.RecordType ? this.state.account.RecordType.Name : ''}</td>
           </tr>
           <tr>
             <td className="tlabel col25">Account Name</td>
             <td className="tdata col25">
                <DoubleClickInput fieldName="Name" urlUpdate={urlUpdate} data={this.state.account}>
                  {this.state.account.Name}
                </DoubleClickInput></td>
             <td className="tlabel col25">Phone</td>
             <td className="tdata col25"><DoubleClickInput fieldName="Phone" urlUpdate={urlUpdate} >{this.state.account.Phone}</DoubleClickInput></td>
           </tr>
           <tr>
             <td className="tlabel col25">Type Of Account</td>
             <td className="tdata col25">
                <DoubleClickInput fieldName="airenergi__Type_of_Account__c" urlUpdate={urlUpdate} >{this.state.account.airenergi__Type_of_Account__c}</DoubleClickInput>
             </td>
             <td className="tlabel col25">Website</td>
             <td className="tdata col25">
                <DoubleClickInput fieldName="Website" urlUpdate={urlUpdate} >{this.state.account.Website}</DoubleClickInput>
             </td>
           </tr>
           <tr>
             <td className="tlabel col25">ParentAccount</td>
             <td className="tdata col25">
                <DoubleClickInput fieldName="ParentId" urlUpdate={urlUpdate} >{this.state.account.ParentId}</DoubleClickInput>
             </td>
           </tr>
           </tbody>
         </table>
         </div>
        </div>
        <div className="bPageBlock2 divdata2">
        <div className="txtlabel">Yearly Revenue</div>
         <div className="pbSubsection">
           <table className="sec" border="0" cellPadding="0" cellSpacing="0">
           <tbody>
           <tr>
             <td className="tlabel col25">Forecast Yr 1 GP</td>
             <td className="tdata col25">
                <DoubleClickInput fieldName="airenergi__This_FY_Revenue__c" urlUpdate={urlUpdate} >{this.state.account.airenergi__This_FY_Revenue__c}</DoubleClickInput>
             </td>
             <td className="tlabel col25">Description</td>
             <td className="tdata col25">
                <DoubleClickInput fieldName="Description" urlUpdate={urlUpdate} >{this.state.account.Description}</DoubleClickInput>
             </td>
           </tr>
           <tr>
             <td className="tlabel col25">Forecast Yr 2 GP</td>
             <td className="tdata col25">
                <DoubleClickInput fieldName="airenergi__Next_FY_Revenue__c" urlUpdate={urlUpdate} >{this.state.account.airenergi__Next_FY_Revenue__c}</DoubleClickInput>
             </td>
             <td className="tlabel col25">Actual Yr 1 GP</td>
             <td className="tdata col25">
                <DoubleClickInput fieldName="airenergi__Actual_Yr_1_GP__c" urlUpdate={urlUpdate} >{this.state.account.airenergi__Actual_Yr_1_GP__c}</DoubleClickInput>
             </td>
           </tr>
           <tr>
             <td className="tlabel col25">Forecast Yr 3 GP</td>
             <td className="tdata col25">
                <DoubleClickInput fieldName="airenergi__Next_FY_After_Revenue__c" urlUpdate={urlUpdate} >{this.state.account.airenergi__Next_FY_After_Revenue__c}</DoubleClickInput>
             </td>
             <td className="tlabel col25">Actual Yr 2 GP</td>
             <td className="tdata col25">
                <DoubleClickInput fieldName="airenergi__Actual_Yr_2_GP__c" urlUpdate={urlUpdate} >{this.state.account.airenergi__Actual_Yr_2_GP__c}</DoubleClickInput>
             </td>
           </tr>
           <tr>
             <td className="tlabel col25">Actual Yr 3 GP</td>
             <td className="tdata col25">
                <DoubleClickInput fieldName="airenergi__Actual_Yr_3_GP__c" urlUpdate={urlUpdate} >{this.state.account.airenergi__Actual_Yr_3_GP__c}</DoubleClickInput>
             </td>
           </tr>
           </tbody>
         </table>
         </div>
        </div>
        <div className="bPageBlock2 divdata2">
        <div className="txtlabel">Address Information</div>
         <div className="pbSubsection">
           <table className="sec" border="0" cellPadding="0" cellSpacing="0">
           <tbody>
           <tr>
             <td className="tlabel col25">Billing Address</td>
             <td className="tdata col25">
                <DoubleClickInput fieldName="BillingStreet" urlUpdate={urlUpdate} >{this.state.account.BillingStreet}</DoubleClickInput>
             </td>
             <td className="tlabel col25"><br></br></td>
             <td className="tdata col25"><br></br></td>
           </tr>
           <tr>
             <td className="tlabel col25">Regions</td>
             <td className="tdata col25">
                <DoubleClickInput fieldName="airenergi__Region__c" urlUpdate={urlUpdate} >{this.state.account.airenergi__Region__c}</DoubleClickInput>
             </td>
             <td className="tlabel col25"><br></br></td>
             <td className="tdata col25"><br></br></td>
           </tr>
           </tbody>
         </table>
         </div>
        </div>
        <div className="bPageBlock2 divdata2">
        <div className="txtlabel">Description Information</div>
         <div className="pbSubsection">
           <table className="sec" border="0" cellPadding="0" cellSpacing="0">
           <tbody>
           <tr>
             <td className="tlabel col25">Account Overview</td>
             <td className="tdata col25">
                <DoubleClickInput fieldName="AccountOverview" urlUpdate={urlUpdate} >{this.state.account.Account_Overview__c}</DoubleClickInput>
             </td>
           </tr>
           </tbody>
         </table>
         </div>
        </div>
        <div>
      </div>
    </div>
  )}
}
AccountDetail.contextType = {
  router : React.PropTypes.func.isRequired,
}

AccountDetail.PropTypes = {
  //account : React.PropTypes.object.isRequired,
}

export default withRouter(AccountDetail)
