'use strict';
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Router, browserHistory, withRouter} from 'react-router'
import acct from './sample-account'
import faker from 'faker'
import moment from 'moment'

class AccountDetail extends React.Component {

  constructor(props)
  {
    super(props)
    this.state = {
      acctdet : acct.attributes['0'],
      cont:acct.Contact,
      sc: acct.Account_Scorecard__c,
      opp:acct.Opportunity__c,
      ah:acct.ActivityHistory,
      at:acct.AccountTeam,
      na:acct.NotesAndAttachments,
      ah2:acct.AccountHistory
    }
  }
  componentDidMount(){
  }

  render() {
    var dispheadcont = []
    dispheadcont.push(<tr className="headerRow"><th>Contact Name</th><th>Title</th><th>Relationship Strength</th><th>Email</th><th>Phone</th><th>City</th></tr>)
    var disprowcont = []
    this.state.cont.map((object1, keyv) => {
        disprowcont.push(<tr className="bodyRow"><td>{object1.Name}</td><td>{object1.Title}</td><td>{object1.RelationshipStrength}</td><td>{object1.Email}</td><td>{object1.Phone}</td><td>{object1.City}</td></tr>)
     })
     var dispheadsc = []
     dispheadsc.push(<tr className="headerRow"><th>Scorecard Name</th><th>Scorecard</th><th>High and Wide</th><th>Relationship Pyramid</th><th>Competitive Landscape</th><th>Clien Sat via Net Promoter Score</th><th>Gross Profit Target</th><th>Management Ownership Change</th><th>CreatedDate</th></tr>)
     var disprowsc = []
     this.state.sc.map((object1, keyv) => {
         disprowsc.push(<tr className="bodyRow"><td>{object1.Name}</td><td>{object1.Scorecard__c}</td><td>{object1.High_and_Wide__c}</td><td>{object1.Relationship_Pyramid__c}</td><td>{object1.Competitive_Landscape__c}</td><td>{object1.Client_Sat_via_Net_Promoter_Score__c}</td><td>{object1.Gross_Profit_Target__c}</td><td>{object1.Management_Ownership_Change__c}</td><td>{object1.CreatedDate}</td></tr>)
      })
     var dispheadopp = []
     dispheadopp.push(<tr className="headerRow"><th>Opportunity Name</th><th>Stage</th><th>Archive Comments</th><th>Actual Yr 1 GP</th><th>Forecast Yr 1 GP</th><th>Forecast Yr 2 GP</th><th>Forecast Yr 3 GP</th><th>Close Date</th><th>Owner Full Name</th><th>Location</th></tr>)
     var disprowopp = []
     this.state.opp.map((object1, keyv) => {
         disprowopp.push(<tr className="bodyRow"><td>{object1.Name}</td><td>{object1.Stage}</td><td>{object1.ArchiveComments}</td><td>{object1.ActualYr1GP}</td><td>{object1.ForecastYr1GP}</td><td>{object1.ForecastYr2GP}</td><td>{object1.ForecastYr3GP}</td><td>{object1.CloseDate}</td><td>{object1.OwnerFullName}</td><td>{object1.Location}</td></tr>)
      })
      var dispheadah = []
      dispheadah.push(<tr className="headerRow"><th>Subject</th><th>Action</th><th>AssignedTo</th><th>Name</th><th>Due Date</th><th>VRAttachment</th><th>LastModifiedDateTime</th><th>Summary</th></tr>)
      var disprowah = []
      this.state.ah.map((object1, keyv) => {
          disprowah.push(<tr className="bodyRow"><td>{object1.Subject}</td><td>{object1.Action}</td><td>{object1.AssignedTo}</td><td>{object1.Name}</td><td>{object1.DueDate}</td><td>{object1.VRAttachment}</td><td>{object1.LastModifiedDateTime}</td><td>{object1.CloseDate}</td><td>{object1.Summary}</td></tr>)
       })
       var dispheadat = []
       dispheadat.push(<tr className="headerRow"><th>Team Member</th><th>Team Role</th></tr>)
       var disprowat = []
       this.state.at.map((object1, keyv) => {
            disprowat.push(<tr className="bodyRow"><td>{object1.Team_Memeber__c}</td><td>{object1.Member_Role__c}</td></tr>)
         })
         var dispheadna = []
         dispheadna.push(<tr className="headerRow"><th>Type</th><th>Title</th><th>LastModified</th><th>Created By</th></tr>)
         var disprowna = []
         this.state.na.map((object1, keyv) => {
              disprowna.push(<tr className="bodyRow"><td>{object1.Type}</td><td>{object1.Title}</td><td>{object1.LastModified}</td><td>{object1.CreatedBy}</td></tr>)
           })
           var dispheadah2 = []
           dispheadah2.push(<tr className="headerRow"><th>Date</th><th>User</th><th>Action</th></tr>)
           var disprowah2 = []
           var actah = ""
           this.state.ah2.map((object1, keyv) => {
               actah=""
                 if(object1.OldValue == "" && object1.NewValue == "" && object1.FieldValue == "created"){
                    actah = object1.FieldValue
                 } else if(object1.OldValue != "" && object1.NewValue != "" && object1.FieldValue != ""){
                   actah = "Changed "+object1.FieldValue+" from "+object1.OldValue+" to "+object1.NewValue
                 } else if(object1.OldValue == "" && object1.NewValue != "" && object1.FieldValue != ""){
                   actah = "Changed "+object1.FieldValue+" to "+object1.NewValue
                 } else if(object1.OldValue != "" && object1.NewValue == "" && object1.FieldValue != ""){
                   actah = "Deleted "+object1.OldValue+" in "+object1.FieldValue
                 }
                 disprowah2.push(<tr className="bodyRow"><td>{object1.CreatedDate}</td><td>{object1.CreatedBy}</td><td>{actah}</td></tr>)

           })
  return(
    <div className="col-md-12">
        <div className="bPageBlock2 divdata2">
        <div className="txtlabel">Account Details</div>
         <div className="pbSubsection">
           <table className="sec" border="0" cellPadding="0" cellSpacing="0">
           <tbody>
           <tr>
             <td className="tlabel col25">Account Owner</td>
             <td className="tdata col25">{this.state.acctdet.Owner}&nbsp;</td>
             <td className="tlabel col25">Account Record Type</td>
             <td className="tdata col25">{this.state.acctdet.AccountRecordType}&nbsp;</td>
           </tr>
           <tr>
             <td className="tlabel col25">Account Name</td>
             <td className="tdata col25">{this.state.acctdet.AccountName}&nbsp;</td>
             <td className="tlabel col25">Phone</td>
             <td className="tdata col25">{this.state.acctdet.Phone}&nbsp;</td>
           </tr>
           <tr>
             <td className="tlabel col25">Type Of Account</td>
             <td className="tdata col25">{this.state.acctdet.TypeOfAccount}&nbsp;</td>
             <td className="tlabel col25">Website</td>
             <td className="tdata col25">{this.state.acctdet.Website}&nbsp;</td>
           </tr>
           <tr>
             <td className="tlabel col25">ParentAccount</td>
             <td className="tdata col25">{this.state.acctdet.ParentAccount}&nbsp;</td>
             <td className="tlabel col25">Employees</td>
             <td className="tdata col25">{this.state.acctdet.Employees}&nbsp;</td>
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
             <td className="tdata col25">{this.state.acctdet.ForecastYr1GP}&nbsp;</td>
             <td className="tlabel col25">Description</td>
             <td className="tdata col25">{this.state.acctdet.Description}&nbsp;</td>
           </tr>
           <tr>
             <td className="tlabel col25">Forecast Yr 2 GP</td>
             <td className="tdata col25">{this.state.acctdet.ForecastYr2GP}&nbsp;</td>
             <td className="tlabel col25">Actual Yr 1 GP</td>
             <td className="tdata col25">{this.state.acctdet.ActualYr1GP}&nbsp;</td>
           </tr>
           <tr>
             <td className="tlabel col25">Forecast Yr 3 GP</td>
             <td className="tdata col25">{this.state.acctdet.ForecastYr3GP}&nbsp;</td>
             <td className="tlabel col25">Actual Yr 2 GP</td>
             <td className="tdata col25">{this.state.acctdet.ActualYr2GP}&nbsp;</td>
           </tr>
           <tr>
             <td className="tlabel col25"><br></br></td>
             <td className="tdata col25"><br></br></td>
             <td className="tlabel col25">Actual Yr 3 GP</td>
             <td className="tdata col25">{this.state.acctdet.ActualYr3GP}&nbsp;</td>
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
             <td className="tdata col25">{this.state.acctdet.BillingAddress}&nbsp;</td>
             <td className="tlabel col25"><br></br></td>
             <td className="tdata col25"><br></br></td>
           </tr>
           <tr>
             <td className="tlabel col25">Regions</td>
             <td className="tdata col25">{this.state.acctdet.Regions}&nbsp;</td>
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
             <td className="tdata col75">{this.state.acctdet.AccountOverview}&nbsp;</td>
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
                     <td class="pbTitle"><h3>Contacts</h3></td>
                   </tr>
                 </table>
                 <table className="list" border="0" cellPadding="0" cellSpacing="0"  width="100%">
                   <thead>
                   {dispheadcont}
                   </thead>
                 <tbody>
                  {disprowcont}
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
                           <td class="pbTitle"><h3>Account Score Cards</h3></td>
                         </tr>
                       </table>
                       <table className="list" border="0" cellPadding="0" cellSpacing="0"  width="100%">
                         <thead>
                         {dispheadsc}
                         </thead>
                       <tbody>
                        {disprowsc}
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
                           <td class="pbTitle"><h3>Opportunities</h3></td>
                         </tr>
                       </table>
                       <table className="list" border="0" cellPadding="0" cellSpacing="0"  width="100%">
                         <thead>
                         {dispheadopp}
                         </thead>
                       <tbody>
                        {disprowopp}
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
                                 <td class="pbTitle"><h3>Activity History</h3></td>
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
                             <td class="pbTitle"><h3>Acccount Team</h3></td>
                           </tr>
                         </table>
                         <table className="list" border="0" cellPadding="0" cellSpacing="0"  width="100%">
                           <thead>
                           {dispheadat}
                           </thead>
                         <tbody>
                          {disprowat}
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
            <div>
              <br/>
                  {
                   <div className="bPageBlock">
                       <div className="pHeader">
                       <table border="0" cellPadding="0" cellSpacing="0" width="100%">
                       <tr>
                         <td class="pbTitle"><h3>Account History</h3></td>
                       </tr>
                     </table>
                     <table className="list" border="0" cellPadding="0" cellSpacing="0"  width="100%">
                       <thead>
                       {dispheadah2}
                       </thead>
                     <tbody>
                      {disprowah2}
                    </tbody>
                    </table>
                    </div>
                    </div>
                  }
                  </div>

    </div>
  )}
}
AccountDetail.contextType = {
  router : React.PropTypes.func.isRequired
}

export default withRouter(AccountDetail)
