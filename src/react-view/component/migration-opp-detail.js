'use strict';
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Router, browserHistory, withRouter} from 'react-router'
import opp from './sample-opp'
import faker from 'faker'
import moment from 'moment'
/*var oppimage = require('entitlements32.png');*/
class OpportunityDetail extends React.Component {

  constructor(props)
  {
    super(props)
    this.state = {
      oppfield : opp.attributes['0'],
      oa:opp.Opportunity_Assessments__c,
      oc:opp.Competitors__c,
      ah:opp.ActivityHistory,
      na:opp.NotesAndAttachments
    }
  }
  componentDidMount(){
  //  this.setState({ot : opp.Opportunity_Team__c})
}
  render() {
       var dispheadoa = []
          dispheadoa.push(<tr className="headerRow"><th>OpportunityvAssessments Name</th><th>Total Score</th><th>Discovery Score</th><th>Relationship Score</th><th>Positioning Score</th><th>Differentiation Score</th><th>Created Date</th><th>Created By</th></tr>)
      var disprowoa = []
       this.state.oa.map((obj2, key2) => {
             disprowoa.push(<tr className="bodyRow"><td>{obj2.Opportunity_Assessments_Name__c}</td><td>{obj2.Total_Score__c}</td><td>{obj2.Discovery_Score__c}</td><td>{obj2.Relationship_Score__c}</td><td>{obj2.Positioning_Score__c}</td><td>{obj2.Differentiation_Score__c}</td><td>{obj2.Created_Date__c}</td><td>{obj2.Created_By__c}</td></tr>)
          })

      var dispheadc= []
      dispheadc.push(<tr className="headerRow"><th>Competitor Name</th><th>Strengths</th><th>Weeknesses</th></tr>)
      var disprowc = []
      this.state.oc.map((object1, keyv) => {
            disprowc.push(<tr className="bodyRow"><td>{object1.Name__c}</td><td>{object1.Strengths__c}</td><td>{object1.Weeknesses__c}</td></tr>)
      })
      var dispheadah= []
      dispheadah.push(<tr className="headerRow"><th>Subject</th><th>Action</th><th>Summary</th><th>Name</th><th>DueDate</th><th>AssignedTo</th></tr>)
      var disprowah = []
      this.state.ah.map((object1, keyv) => {
            disprowah.push(<tr className="bodyRow"><td>{object1.Subject}</td><td>{object1.Action}</td><td>{object1.Summary}</td><td>{object1.Name}</td><td>{object1.DueDate}</td><td>{object1.AssignedTo}</td></tr>)
      })
      var dispheadna = []
      dispheadna.push(<tr className="headerRow"><th>Type</th><th>Title</th><th>LastModified</th><th>Created By</th></tr>)
      var disprowna = []
      this.state.na.map((object1, keyv) => {
           disprowna.push(<tr className="bodyRow"><td>{object1.Type}</td><td>{object1.Title}</td><td>{object1.LastModified}</td><td>{object1.CreatedBy}</td></tr>)
        })
      return (

      <div className="col-md-12">
      <div className="bPageTitle">
      <div className="ptBody">
      <div className="content">
      <img className="pageTitleIcon" src={'http://free-121d5f44d20-121d603d1c5-121ee2b8103.force.com/img/icon/portals32.png'}/>
      <h1 className="pageType">Opportunity</h1>
      <h2 className="pageDescription">{this.state.oppfield.Name}</h2>
      </div>
      </div>
      </div>
      <div className="clearfix"></div>
      <span><br/></span><span><br/></span>
      <div className="pbHeader">
      <table border="0" cellpadding="0" cellspacing="0">
      <tbody><tr><td className="pbTitle">
      <h2 className="mainTitle">Opportunity Detail</h2>
      </td>
      <td className="pbButton" id="topButtonRow">
      <input value=" Edit " className="btn" name="edit" title="Edit" type="button"></input>
      </td>
      </tr>
      </tbody>
      </table>
        <span><br/></span>
      </div>
<div className="clearfix"></div>
          <div className="bPageBlock2 divdata2">
          <div className="txtlabel">Opportunity Detail</div>
           <div className="pbSubsection">
             <table className="sec" border="0" cellPadding="0" cellSpacing="0">
             <tbody>
             <tr>
               <td className="tlabel col25">Opportunity Name</td>
               <td className="tdata col25">{this.state.oppfield.Name}&nbsp;</td>
               <td className="tlabel col25">Opportuntiy Owner</td>
               <td className="tdata col25">{this.state.oppfield.Owner}&nbsp;</td>
             </tr>
             <tr>
               <td className="tlabel col25">Account Name</td>
               <td className="tdata col25">{this.state.oppfield.AccountName}&nbsp;</td>
               <td className="tlabel col25">Project Startup Year</td>
               <td className="tdata col25">{this.state.oppfield.Project_Startup_Year__c}&nbsp;</td>
             </tr>
             <tr>
               <td className="tlabel col25">Type</td>
               <td className="tdata col25">{this.state.oppfield.Type}&nbsp;</td>
               <td className="tlabel col25">Projected Close Date</td>
               <td className="tdata col25">{this.state.oppfield.airenergi__End_Date__c}&nbsp;</td>
             </tr>
             <tr>
               <td className="tlabel col25">Lead Source</td>
               <td className="tdata col25">{this.state.oppfield.LeadSource}&nbsp;</td>
               <td className="tlabel col25">Stage</td>
               <td className="tdata col25">{this.state.oppfield.StageName}&nbsp;</td>
             </tr>
             <tr>
               <td className="tlabel col25">Air Energi VP Region</td>
               <td className="tdata col25">{this.state.oppfield.Air_Energi_VP_Location__c}&nbsp;</td>
               <td className="tlabel col25">Estimated Project Start Date</td>
               <td className="tdata col25">{this.state.oppfield.airenergi__Start_Date__c}&nbsp;</td>
             </tr>
             <tr>
               <td className="tlabel col25">Sub Region</td>
               <td className="tdata col25">{this.state.oppfield.Region__c}&nbsp;</td>
               <td className="tlabel col25">Total Annual GP</td>
               <td className="tdata col25">{this.state.oppfield.TotalAnnualGP}&nbsp;</td>
             </tr>
             <tr>
               <td className="tlabel col25">Location</td>
               <td className="tdata col25">{this.state.oppfield.Location__c}&nbsp;</td>
               <td className="tlabel col25">Year1</td>
               <td className="tdata col25">{this.state.oppfield.Year1__c}&nbsp;</td>
             </tr>
             <tr>
               <td className="tlabel col25">Account Site</td>
               <td className="tdata col25">{this.state.oppfield.Account_Site__c}&nbsp;</td>
               <td className="tlabel col25">Year2</td>
               <td className="tdata col25">{this.state.oppfield.Year2__c}&nbsp;</td>
             </tr>
             <tr>
               <td className="tlabel col25">Business Stream</td>
               <td className="tdata col25">{this.state.oppfield.BUSINESS_STREAM__c}&nbsp;</td>
               <td className="tlabel col25">Year3</td>
               <td className="tdata col25">{this.state.oppfield.Year3__c}&nbsp;</td>
             </tr>
             <tr>
               <td className="tlabel col25">Project Category</td>
               <td className="tdata col25">{this.state.oppfield.airenergi__Project_Category__c}&nbsp;</td>
               <td className="tlabel col25">Basis of Value Calculation</td>
               <td className="tdata col25">{this.state.oppfield.Basis_of_Value_Calculation__c}&nbsp;</td>
             </tr>
             <tr>
               <td className="tlabel col25">Created By</td>
               <td className="tdata col25">{this.state.oppfield.CreatedBy}&nbsp;</td>
               <td className="tlabel col25">Last Modified By</td>
               <td className="tdata col25">{this.state.oppfield.LastModifiedBy}&nbsp;</td>
             </tr>
             <tr>
               <td className="tlabel col25">Description</td>
               <td className="tdata col25">{this.state.oppfield.Description}&nbsp;</td>
               <td className="tlabel col25">Updated Comments</td>
               <td className="tdata col25">{this.state.oppfield.Updated_Comments__c}&nbsp;</td>
             </tr>
             <tr>
               <td className="tlabel col25">Opportunity Code</td>
               <td className="tdata col25">{this.state.oppfield.Opportunity_Code__c}&nbsp;</td>
               <td className="tlabel col25">Due Date</td>
               <td className="tdata col25">{this.state.oppfield.DueDate}&nbsp;</td>
             </tr>
             <tr>
               <td className="tlabel col25">Is a Bid Response Required?</td>
               <td className="tdata col25">{this.state.oppfield.Is_a_Bid_Response_Required__c}&nbsp;</td>
               <td className="tlabel col25">Contract Type</td>
               <td className="tdata col25">{this.state.oppfield.ContractType}&nbsp;</td>
             </tr>
             <tr>
               <td className="tlabel col25">Bid Format</td>
               <td className="tdata col25">{this.state.oppfield.Format__c}&nbsp;</td>
               <td className="tlabel col25">Oppty/Bid Type</td>
               <td className="tdata col25">{this.state.oppfield.Type_of_Bid__c}&nbsp;</td>
             </tr>
             <tr>
               <td className="tlabel col25">Request Received Date</td>
               <td className="tdata col25">{this.state.oppfield.RequestReceivedDate}&nbsp;</td>
               <td className="tlabel col25">Submitted Date</td>
               <td className="tdata col25">{this.state.oppfield.SubmittedDate}&nbsp;</td>
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
               <td className="tdata col25">{this.state.oppfield.Customer_Decision_Team_Member1__c}&nbsp;</td>
               <td className="tlabel col25">PSC1</td>
               <td className="tdata col25">{this.state.oppfield.PSC1__c}&nbsp;</td>
             </tr>
             <tr>
               <td className="tlabel col25">Customer Decision Team Member2</td>
               <td className="tdata col25">{this.state.oppfield.Customer_Decision_Team_Member2__c}&nbsp;</td>
               <td className="tlabel col25">PSC2</td>
               <td className="tdata col25">{this.state.oppfield.PSC2__c}&nbsp;</td>
             </tr>
             <tr>
               <td className="tlabel col25">Customer Decision Team Member3</td>
               <td className="tdata col25">{this.state.oppfield.Customer_Decision_Team_Member3__c}&nbsp;</td>
               <td className="tlabel col25">PSC3</td>
               <td className="tdata col25">{this.state.oppfield.PSC3__c}&nbsp;</td>
             </tr>
             <tr>
               <td className="tlabel col25">Customer Decision Team Member4</td>
               <td className="tdata col25">{this.state.oppfield.Customer_Decision_Team_Member4__c}&nbsp;</td>
               <td className="tlabel col25">PSC4</td>
               <td className="tdata col25">{this.state.oppfield.PSC4__c}&nbsp;</td>
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
           <td className="tdata col75">{this.state.oppfield.PSC1__c}&nbsp;</td>
         </tr>
         <tr>
           <td className="tlabel col25">Customer Business Objectivies</td>
           <td className="tdata col75">{this.state.oppfield.PSC1__c}&nbsp;</td>
         </tr>
         <tr>
           <td className="tlabel col25">Customer Internal Challengs</td>
           <td className="tdata col75">{this.state.oppfield.PSC1__c}&nbsp;</td>
         </tr>
         <tr>
           <td className="tlabel col25">Swift's Solutions</td>
           <td className="tdata col75">{this.state.oppfield.PSC1__c}&nbsp;</td>
         </tr>
         <tr>
           <td className="tlabel col25">Swift's Advantages</td>
           <td className="tdata col75">{this.state.oppfield.PSC1__c}&nbsp;</td>
         </tr>
         <tr>
           <td className="tlabel col25">Swift's References</td>
           <td className="tdata col75">{this.state.oppfield.PSC1__c}&nbsp;</td>
         </tr>
         <tr>
           <td className="tlabel col25">Swift's Unique Value</td>
           <td className="tdata col75">{this.state.oppfield.PSC1__c}&nbsp;</td>
         </tr>
         </tbody>
        </table>
       </div>
  </div>
  <div>
  <br/>
  {
   <div className="bPageBlock">
       <div className="pHeader">
       <table border="0" cellPadding="0" cellSpacing="0" width="100%">
       <tr>
         <td class="pbTitle"><h3>Opportunity Assessments</h3></td>
       </tr>
     </table>
     <table className="list" border="0" cellPadding="0" cellSpacing="0"  width="100%">
       <thead>
       {dispheadoa}
       </thead>
     <tbody>
      {disprowoa}
    </tbody>
    </table>
    </div>
</div>
  }
  </div>
  <div>
  <br/>
  {
   <div className="bPageBlock">
       <div className="pHeader">
       <table border="0" cellPadding="0" cellSpacing="0" width="100%">
       <tr>
         <td class="pbTitle"><h3>Competitors</h3></td>
       </tr>
     </table>
     <table className="list" border="0" cellPadding="0" cellSpacing="0"  width="100%">
       <thead>
       {dispheadc}
       </thead>
     <tbody>
      {disprowc}
    </tbody>
    </table>
    </div>
    </div>
  }
  </div>
  <div>
  <br/>
  {
   <div className="bPageBlock">
       <div className="pHeader">
       <table border="0" cellPadding="0" cellSpacing="0" width="100%">
       <tr>
         <td class="pbTitle"><h3>Acitivity History</h3></td>
       </tr>
     </table>
     <table className="list" border="0" cellPadding="0" cellSpacing="0"  width="100%">
       <thead>
       {dispheadah}
       </thead>
     <tbody>
      {disprowah}
    </tbody>
    </table>
    </div>
    </div>
  }
  </div>
  <div>
  <br/>
  {
   <div className="bPageBlock">
       <div className="pHeader">
       <table border="0" cellPadding="0" cellSpacing="0" width="100%">
       <tr>
         <td class="pbTitle"><h3>Notes And Attachments</h3></td>
       </tr>
     </table>
     <table className="list" border="0" cellPadding="0" cellSpacing="0"  width="100%">
       <thead>
       {dispheadna}
       </thead>
     <tbody>
      {disprowna}
    </tbody>
    </table>
    </div>
    </div>
  }
  </div>
  </div>
    );
  }
}

OpportunityDetail.contextType = {
  router : React.PropTypes.func.isRequired
}

export default withRouter(OpportunityDetail)
