'use strict';
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Router, browserHistory, withRouter} from 'react-router'
import moment from 'moment'
import * as helper from '../common/Helper'
import DoubleClickInput from '../common/DoubleClickInput'
import jq from 'jquery'

class OpportunityDetail extends React.Component {

  constructor(props)
  {
    super(props)
    this.state = {
      opportunity : {
        status : ''
      },
      errorView : <p></p>,
    }
  }
  componentDidMount(){
    let {objectId, migrationId} = this.props.params
    jq.ajax({
      url : `/api/global-merge/merged/detail/${migrationId}/${objectId}`,
      type : "GET",
      success : function(response){
        this.setState({
          opportunity : response.result
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
    let {objectId, migrationId} = this.props.params
    let urlUpdate = `/api/global-merge/merged/detail/${migrationId}/${objectId}`

    return (
      <div className="col-md-12">
        <div className="bPageTitle">
          <div className="ptBody">
            <div className="content">
              <img className="pageTitleIcon" src={'/images/portals32.png'}/>
              <h1 className="pageType">Opportunity</h1>
              <h2 className="pageDescription">{this.state.opportunity.Name}</h2>
              </div>
          </div>
        </div>
      <div className="clearfix"></div>
      <div className="row">
        <div className="col-sm-4 col-sm-offset-8 text-right">
          <h3>Status : {this.state.opportunity.status}</h3>
          {this.state.opportunity.status.toLowerCase() == 'existing' ?
          <a className="btn btn-primary" target="_blank" href={`https://eu3.salesforce.com/${this.state.opportunity._id}`}>Air Record</a> :
          <a className="btn btn-success" target="_blank" href={`https://na24.salesforce.com/${this.state.opportunity._id}`}>Swift Record</a> }
        </div>
      </div>
      <div className="pbHeader">
        <table border="0" cellpadding="0" cellspacing="0">
          <tbody>
          <tr>
            <td className="pbTitle">
              <h2 className="mainTitle">Opportunity Detail</h2>
            </td>

          </tr>
          </tbody>
        </table>
      </div>
      <div className="clearfix"></div>
      <div className="bPageBlock2 divdata2">
        <div className="txtlabel">Opportunity Detail</div>
        <div className="pbSubsection">
           <table className="sec" border="0" cellPadding="0" cellSpacing="0">
           <tbody>
             <tr>
               <td className="tlabel col25">Opportunity Name</td>
               <td className="tdata col25">
                 <DoubleClickInput fieldName="Name" urlUpdate={urlUpdate}>
                   {this.state.opportunity.Name}
                 </DoubleClickInput>
               </td>
               <td className="tlabel col25">Opportuntiy Owner</td>
               <td className="tdata col25">{this.state.opportunity.Owner ? this.state.opportunity.Owner.Name : ''}&nbsp;</td>
             </tr>
             <tr>
               <td className="tlabel col25">Account Name</td>
               <td className="tdata col25">{this.state.opportunity.Account ? this.state.opportunity.Account.Name : ''}</td>
               <td className="tlabel col25">Project Startup Year</td>
               <td className="tdata col25">
                  <DoubleClickInput fieldName="Project_Startup_Year__c" urlUpdate={urlUpdate}>
                    {this.state.opportunity.Project_Startup_Year__c}
                  </DoubleClickInput>
               </td>
             </tr>
             <tr>
               <td className="tlabel col25">Type</td>
               <td className="tdata col25">{this.state.opportunity.Type}&nbsp;</td>
               <td className="tlabel col25">Projected Close Date</td>
               <td className="tdata col25">{moment(this.state.opportunity.CloseDate).format("ddd, DD/MM/YYYY")}&nbsp;</td>
             </tr>
             <tr>
               <td className="tlabel col25">Lead Source</td>
               <td className="tdata col25">
               <DoubleClickInput fieldName="Project_Startup_Year__c" urlUpdate={urlUpdate}>
                 {this.state.opportunity.LeadSource}
               </DoubleClickInput></td>
               <td className="tlabel col25">Stage</td>
               <td className="tdata col25">{this.state.opportunity.StageName}&nbsp;</td>
             </tr>
             <tr>
               <td className="tlabel col25">Air Energi VP Region</td>
               <td className="tdata col25">
                 <DoubleClickInput fieldName="Region__c" urlUpdate={urlUpdate}>
                   {this.state.opportunity.Region__c}
                 </DoubleClickInput>
               </td>
               <td className="tlabel col25">Estimated Project Start Date</td>
               <td className="tdata col25">
                {this.state.opportunity.airenergi__Start_Date__c}
               </td>
             </tr>
             <tr>
               <td className="tlabel col25">Sub Region</td>
               <td className="tdata col25">{this.state.opportunity.Region__c}&nbsp;</td>
               <td className="tlabel col25">Total Annual GP</td>
               <td className="tdata col25">{this.state.opportunity.TotalAnnualGP}&nbsp;</td>
             </tr>
             <tr>
               <td className="tlabel col25">Location</td>
               <td className="tdata col25">{this.state.opportunity.Location__c}&nbsp;</td>
               <td className="tlabel col25">Year1</td>
               <td className="tdata col25">{this.state.opportunity.Year1__c}&nbsp;</td>
             </tr>
             <tr>
               <td className="tlabel col25">Account Site</td>
               <td className="tdata col25">
                 <DoubleClickInput fieldName="Account_Site__c" urlUpdate={urlUpdate}>
                   {this.state.opportunity.Account_Site__c}
                 </DoubleClickInput>
               </td>
               <td className="tlabel col25">Year2</td>
               <td className="tdata col25">{this.state.opportunity.Year2__c}&nbsp;</td>
             </tr>
             <tr>
               <td className="tlabel col25">Business Stream</td>
               <td className="tdata col25">{this.state.opportunity.BUSINESS_STREAM__c}&nbsp;</td>
               <td className="tlabel col25">Year3</td>
               <td className="tdata col25">{this.state.opportunity.Year3__c}&nbsp;</td>
             </tr>
             <tr>
               <td className="tlabel col25">Project Category</td>
               <td className="tdata col25">{this.state.opportunity.airenergi__Project_Category__c}&nbsp;</td>
               <td className="tlabel col25">Basis of Value Calculation</td>
               <td className="tdata col25">{this.state.opportunity.Basis_of_Value_Calculation__c}&nbsp;</td>
             </tr>
             <tr>
               <td className="tlabel col25">Created By</td>
               <td className="tdata col25">{this.state.opportunity.CreatedBy ? this.state.opportunity.CreatedBy.Name : ''}&nbsp;</td>
               <td className="tlabel col25">Last Modified By</td>
               <td className="tdata col25">{this.state.opportunity.LastModifiedBy ? this.state.opportunity.LastModifiedBy.Name : ''}&nbsp;</td>
             </tr>
             <tr>
               <td className="tlabel col25">Description</td>
               <td className="tdata col25">
                {this.state.opportunity.Description}
               </td>
               <td className="tlabel col25">Updated Comments</td>
               <td className="tdata col25">{this.state.opportunity.Updated_Comments__c}&nbsp;</td>
             </tr>
             <tr>
               <td className="tlabel col25">Opportunity Code</td>
               <td className="tdata col25">{this.state.opportunity.Opportunity_Code__c}&nbsp;</td>
               <td className="tlabel col25">Due Date</td>
               <td className="tdata col25">{this.state.opportunity.DueDate}&nbsp;</td>
             </tr>
             <tr>
               <td className="tlabel col25">Is a Bid Response Required?</td>
               <td className="tdata col25">{this.state.opportunity.Is_a_Bid_Response_Required__c}&nbsp;</td>
               <td className="tlabel col25">Contract Type</td>
               <td className="tdata col25">{this.state.opportunity.ContractType}&nbsp;</td>
             </tr>
             <tr>
               <td className="tlabel col25">Bid Format</td>
               <td className="tdata col25">{this.state.opportunity.Format__c}&nbsp;</td>
               <td className="tlabel col25">Oppty/Bid Type</td>
               <td className="tdata col25">{this.state.opportunity.Type_of_Bid__c}&nbsp;</td>
             </tr>
             <tr>
               <td className="tlabel col25">Request Received Date</td>
               <td className="tdata col25">{this.state.opportunity.RequestReceivedDate}&nbsp;</td>
               <td className="tlabel col25">Submitted Date</td>
               <td className="tdata col25">{this.state.opportunity.SubmittedDate}&nbsp;</td>
             </tr>
           </tbody>
         </table>
       </div>
      </div>
      <div className="bPageBlock2 divdata2">
          <div className="txtlabel">Customer Team and Personal Success Criteria</div>
         <div className="pbSubsection">
           <table className="sec" border="0" cellPadding="0" cellSpacing="0">
           <tbody>
           <tr>
             <td className="tlabel col25">Customer Decision Team Member1</td>
             <td className="tdata col25">{this.state.opportunity.Customer_Decision_Team_Member1__c}&nbsp;</td>
             <td className="tlabel col25">PSC1</td>
             <td className="tdata col25">{this.state.opportunity.PSC1__c}&nbsp;</td>
           </tr>
           <tr>
             <td className="tlabel col25">Customer Decision Team Member2</td>
             <td className="tdata col25">{this.state.opportunity.Customer_Decision_Team_Member2__c}&nbsp;</td>
             <td className="tlabel col25">PSC2</td>
             <td className="tdata col25">{this.state.opportunity.PSC2__c}&nbsp;</td>
           </tr>
           <tr>
             <td className="tlabel col25">Customer Decision Team Member3</td>
             <td className="tdata col25">{this.state.opportunity.Customer_Decision_Team_Member3__c}&nbsp;</td>
             <td className="tlabel col25">PSC3</td>
             <td className="tdata col25">{this.state.opportunity.PSC3__c}&nbsp;</td>
           </tr>
           <tr>
             <td className="tlabel col25">Customer Decision Team Member4</td>
             <td className="tdata col25">{this.state.opportunity.Customer_Decision_Team_Member4__c}&nbsp;</td>
             <td className="tlabel col25">PSC4</td>
             <td className="tdata col25">{this.state.opportunity.PSC4__c}&nbsp;</td>
           </tr>
           </tbody>
         </table>
         </div>
      </div>
      <div className="bPageBlock2 divdata2">
        <div className="txtlabel">Customer Specific Value Propostion</div>
        <div className="pbSubsection">
         <table className="sec" border="0" cellPadding="0" cellSpacing="0">
         <tbody>
           <tr>
             <td className="tlabel col25">Customer External Drivers</td>
             <td className="tdata col75">{this.state.opportunity.PSC1__c}&nbsp;</td>
           </tr>
           <tr>
             <td className="tlabel col25">Customer Business Objectivies</td>
             <td className="tdata col75">{this.state.opportunity.PSC1__c}&nbsp;</td>
           </tr>
           <tr>
             <td className="tlabel col25">Customer Internal Challengs</td>
             <td className="tdata col75">{this.state.opportunity.PSC1__c}&nbsp;</td>
           </tr>
           <tr>
             <td className="tlabel col25">Swift's Solutions</td>
             <td className="tdata col75">{this.state.opportunity.PSC1__c}&nbsp;</td>
           </tr>
           <tr>
             <td className="tlabel col25">Swift's Advantages</td>
             <td className="tdata col75">{this.state.opportunity.PSC1__c}&nbsp;</td>
           </tr>
           <tr>
             <td className="tlabel col25">Swift's References</td>
             <td className="tdata col75">{this.state.opportunity.PSC1__c}&nbsp;</td>
           </tr>
           <tr>
             <td className="tlabel col25">Swift's Unique Value</td>
             <td className="tdata col75">{this.state.opportunity.PSC1__c}&nbsp;</td>
           </tr>
         </tbody>
        </table>
       </div>
      </div>
    </div>
    );
  }
}

OpportunityDetail.contextType = {
  router : React.PropTypes.func.isRequired
}

export default withRouter(OpportunityDetail)
