'use strict';
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Router, browserHistory, withRouter} from 'react-router'
import contact from './sample-contact'
import faker from 'faker'
import moment from 'moment'

class ContactDetail extends React.Component {

  constructor(props)
  {
    super(props)
    this.state = {
      condet:contact.attributes['0'],
      oa:contact.OpenActivity,
      opp:contact.Opportunity__c,
      ccase:contact.Case__c,
      ches:contact.HTMLEmailStatus__c,
      ah:contact.ActivityHistory,
      na:contact.NotesAndAttachments
    }
  }
  componentDidMount(){
  }

  render() {
     var caddr = '';
     if(this.state.condet.MailingStreet != ''){
       caddr = this.state.condet.MailingStreet + ' ';
     }
     if(this.state.condet.MailingCity != ''){
       caddr += this.state.condet.MailingCity + ' ';
     }
     if(this.state.condet.MailingState != ''){
       caddr += this.state.condet.MailingState;
     }
     if(this.state.condet.MailingCountry != ''){
       caddr += ', '+this.state.condet.MailingCountry ;
     }
     if(this.state.condet.PostalCode != ''){
       caddr += ' '+this.state.condet.PostalCode;
     }
     var dispheadopp = []
     dispheadopp.push(<tr className="headerRow"><th>Opportunity Name</th><th>Stage</th><th>Archive Comments</th><th>Actual Yr 1 GP</th><th>Forecast Yr 1 GP</th><th>Forecast Yr 2 GP</th><th>Forecast Yr 3 GP</th><th>Close Date</th><th>Owner Full Name</th><th>Location</th></tr>)
     var disprowopp = []
     this.state.opp.map((object1, keyv) => {
         disprowopp.push(<tr className="bodyRow"><td>{object1.Name}</td><td>{object1.Stage}</td><td>{object1.ArchiveComments}</td><td>{object1.ActualYr1GP}</td><td>{object1.ForecastYr1GP}</td><td>{object1.ForecastYr2GP}</td><td>{object1.ForecastYr3GP}</td><td>{object1.CloseDate}</td><td>{object1.OwnerFullName}</td><td>{object1.Location}</td></tr>)
      })
      var dispheadc = []
      dispheadc.push(<tr className="headerRow"><th>Case</th><th>Subject</th><th>Priority</th><th>Date/Time Opened</th><th>Status</th><th>Owner</th></tr>)
      var disprowc = []
      this.state.ccase.map((object1, keyv) => {
          disprowc.push(<tr className="bodyRow"><td>{object1.Case}</td><td>{object1.Subject}</td><td>{object1.Priority}</td><td>{object1.DateTimeOpened}</td><td>{object1.Status}</td><td>{object1.Owner}</td></tr>)
       })
       var dispheadhes = []
       dispheadhes.push(<tr className="headerRow"><th>Subject</th><th>RelatedTo</th><th>Date Sent</th><th>Date Opened</th><th>Times Opened</th><th>Last Opened</th></tr>)
       var disprowhes = []
       this.state.ches.map((object1, keyv) => {
           disprowhes.push(<tr className="bodyRow"><td>{object1.Subject}</td><td>{object1.RelatedTo}</td><td>{object1.DateSent}</td><td>{object1.DateOpened}</td><td>{object1.TimesOpened}</td><td>{object1.LastOpened}</td></tr>)
        })
      var dispheadah = []
      dispheadah.push(<tr className="headerRow"><th>Subject</th><th>Action</th><th>AssignedTo</th><th>Name</th><th>Due Date</th><th>VRAttachment</th><th>LastModifiedDateTime</th><th>Summary</th></tr>)
      var disprowah = []
      this.state.ah.map((object1, keyv) => {
          disprowah.push(<tr className="bodyRow"><td>{object1.Subject}</td><td>{object1.Action}</td><td>{object1.AssignedTo}</td><td>{object1.Name}</td><td>{object1.DueDate}</td><td>{object1.VRAttachment}</td><td>{object1.LastModifiedDateTime}</td><td>{object1.Summary}</td></tr>)
       })
         var dispheadna = []
         dispheadna.push(<tr className="headerRow"><th>Type</th><th>Title</th><th>LastModified</th><th>Created By</th></tr>)
         var disprowna = []
         this.state.na.map((object1, keyv) => {
              disprowna.push(<tr className="bodyRow"><td>{object1.Type}</td><td>{object1.Title}</td><td>{object1.LastModified}</td><td>{object1.CreatedBy}</td></tr>)
           })

           var dispheadoa = []
           dispheadoa.push(<tr className="headerRow"><th>Subject</th><th>Action</th><th>RelatedTo</th><th>Task</th><th>Due Date</th><th>Status</th><th>Assigned To</th></tr>)
           var disprowoa = []
           this.state.oa.map((object1, keyv) => {
               disprowoa.push(<tr className="bodyRow"><td>{object1.Subject}</td><td>{object1.Action}</td><td>{object1.Name}</td><td>{object1.Task}</td><td>{object1.DueDate}</td><td>{object1.Status}</td><td>{object1.AssignedTo}</td></tr>)
            })
    return(
    <div className="col-md-12">
    <div className="bPageTitle">
    <div className="ptBody">
    <div className="content">
    <img className="pageTitleIcon" src={'http://free-121d5f44d20-121d603d1c5-121ee2b8103.force.com/img/icon/bank32.png'}/>
    <h1 className="pageType">Contact</h1>
    <h2 className="pageDescription">{this.state.condet.Name}</h2>
    </div>
    </div>
    </div>
    <div className="clearfix"></div>
    <span><br/></span><span><br/></span>
    <div className="pbHeader">
    <table border="0" cellpadding="0" cellspacing="0">
    <tbody><tr><td className="pbTitle">
    <h2 className="mainTitle">Contact Detail</h2>
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
        <div className="txtlabel">Contact Detail</div>
         <div className="pbSubsection">
           <table className="sec" border="0" cellPadding="0" cellSpacing="0">
           <tbody>
           <tr>
             <td className="tlabel col25">Name</td>
             <td className="tdata col25">{this.state.condet.Name}&nbsp;</td>
             <td className="tlabel col25">Contact Status</td>
             <td className="tdata col25">{this.state.condet.Contact_Status__c}&nbsp;</td>
           </tr>
           <tr>
             <td className="tlabel col25">Account Name</td>
             <td className="tdata col25">{this.state.condet.AccountName}&nbsp;</td>
             <td className="tlabel col25">Contact Owner</td>
             <td className="tdata col25">{this.state.condet.Owner}&nbsp;</td>
           </tr>
           <tr>
             <td className="tlabel col25">Title</td>
             <td className="tdata col25">{this.state.condet.Title}&nbsp;</td>
             <td className="tlabel col25">Reports To</td>
             <td className="tdata col25">{this.state.condet.ReportsTo}&nbsp;</td>
           </tr>
           <tr>
             <td className="tlabel col25">SeniorPerson</td>
             <td className="tdata col25">{this.state.condet.SeniorPerson}&nbsp;</td>
             <td className="tlabel col25">LinkedIn</td>
             <td className="tdata col25">{this.state.condet.LinkedIn__c}&nbsp;</td>
           </tr>
           <tr>
             <td className="tlabel col25">Lead Source</td>
             <td className="tdata col75">{this.state.condet.LeadSource}&nbsp;</td>
          </tr>
           <tr>
           <td className="tlabel col25">Relationship Strength</td>
           <td className="tdata col75">{this.state.condet.RelationshipStrength}&nbsp;</td>
          </tr>
           </tbody>
         </table>
         </div>
        </div>
        <div className="bPageBlock2 divdata2">
        <div className="txtlabel">Contact Information</div>
        <div className="pbSubsection">
          <table className="sec" border="0" cellPadding="0" cellSpacing="0">
          <tbody>
          <tr>
            <td className="tlabel col25">Company Phone</td>
            <td className="tdata col25">{this.state.condet.Phone}&nbsp;</td>
            <td className="tlabel col25">Fax</td>
            <td className="tdata col25">{this.state.condet.Fax}&nbsp;</td>
          </tr>
          <tr>
            <td className="tlabel col25">Extension</td>
            <td className="tdata col25">{this.state.condet.Extension}&nbsp;</td>
            <td className="tlabel col25">Email</td>
            <td className="tdata col25">{this.state.condet.Email}&nbsp;</td>
          </tr>
          <tr>
            <td className="tlabel col25">Mobile</td>
            <td className="tdata col25">{this.state.condet.MobilePhone}&nbsp;</td>
            <td className="tlabel col25">Other Email</td>
            <td className="tdata col25">{this.state.condet.Other_Email__c}&nbsp;</td>
          </tr>
          <tr>
            <td className="tlabel col25">Direct Phone</td>
            <td className="tdata col75">{this.state.condet.Direct_Phone__c}&nbsp;</td>
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
           <td className="tlabel col25">Mailing Address</td>
           <td className="tdata col25">{caddr}&nbsp;</td>
           <td className="tlabel col25">Full Address</td>
           <td className="tdata col25">{this.state.condet.Full_Address__c}&nbsp;</td>
         </tr>
         <tr>
           <td className="tlabel col25">Mailing Street Address 1</td>
           <td className="tdata col75">{this.state.condet.Mailing_Street_Address_1__c}&nbsp;</td>
         </tr>
         <tr>
           <td className="tlabel col25">Mailing Street Address 2</td>
           <td className="tdata col75">{this.state.condet.Mailing_Street_Address_2__c}&nbsp;</td>
        </tr>
         </tbody>
       </table>
         </div>
        </div>
        <div className="bPageBlock2 divdata2">
        <div className="txtlabel">Marketing/Opt Outs</div>
         <div className="pbSubsection">
         <table className="sec" border="0" cellPadding="0" cellSpacing="0">
         <tbody>
         <tr>
           <td className="tlabel col25">Marketo</td>
           <td className="tdata col25">{this.state.condet.Marketo}&nbsp;</td>
           <td className="tlabel col25">Do not Call</td>
           <td className="tdata col25">{this.state.condet.DoNotCall}&nbsp;</td>
         </tr>
         <tr>
           <td className="tlabel col25">Email Opt Out</td>
           <td className="tdata col75">{this.state.condet.HasOptedOutOfEmail}&nbsp;</td>
         </tr>
         </tbody>
      </table>
         </div>
        </div>
        <div className="bPageBlock2 divdata2">
        <div className="txtlabel">System Information</div>
         <div className="pbSubsection">
           <table className="sec" border="0" cellPadding="0" cellSpacing="0">
           <tbody>
           <tr>
             <td className="tlabel col25">Last Stay-in-Touch Request Date</td>
             <td className="tdata col25">{this.state.condet.LastCURequestDate}&nbsp;</td>
             <td className="tlabel col25">Last Stay-in-Touch Save Date</td>
             <td className="tdata col25">{this.state.condet.LastCUUpdateDate}&nbsp;</td>
           </tr>
           <tr>
             <td className="tlabel col25">CreatedBy</td>
             <td className="tdata col25">{this.state.condet.CreatedBy}&nbsp;</td>
             <td className="tlabel col25">LastModified By</td>
             <td className="tdata col25">{this.state.condet.LastModifiedBy}&nbsp;</td>
           </tr>
           <tr>
             <td className="tlabel col25">&nbsp;</td>
             <td className="tdata col25">&nbsp;</td>
             <td className="tlabel col25">Owner Bullhorn User Id</td>
             <td className="tdata col25">{this.state.condet.Owner_Bullhorn_User_Id__c}&nbsp;</td>
          </tr>
           <tr>
           <td className="tlabel col25">&nbsp;</td>
           <td className="tdata col25">&nbsp;</td>
           <td className="tlabel col25">Contact SFDC ID</td>
           <td className="tdata col25">{this.state.condet.Contact_SFDC_ID__c}&nbsp;</td>
          </tr>
          <tr>
          <td className="tlabel col25">&nbsp;</td>
          <td className="tdata col25">&nbsp;</td>
           <td className="tlabel col25">Account BH ID</td>
          <td className="tdata col25">{this.state.condet.Account_BH_ID__c}&nbsp;</td>
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
                     <td class="pbTitle"><h3>Open Activity</h3></td>
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
                                 <td class="pbTitle"><h3>Cases</h3></td>
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
                               <td class="pbTitle"><h3>HTML Email Status</h3></td>
                             </tr>
                           </table>
                           <table className="list" border="0" cellPadding="0" cellSpacing="0"  width="100%">
                             <thead>
                             {dispheadhes}
                             </thead>
                           <tbody>
                            {disprowhes}
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
  )}
}
ContactDetail.contextType = {
  router : React.PropTypes.func.isRequired
}

export default withRouter(ContactDetail)
