'use strict';
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Router, browserHistory, withRouter} from 'react-router'
import jq from 'jquery'
import moment from 'moment'
import * as helper from '../common/Helper'
import DoubleClickInput from '../common/DoubleClickInput'

class contactDetail extends React.Component {

  constructor(props)
  {
    super(props)
    this.state = {
      contact :  {},
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
          contact : response.result
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

    return(
    <div className="col-md-12">
      <div className="bPageTitle">
        <div className="ptBody">
          <div className="content">
            <img className="pageTitleIcon" src={'/images/contact.png'} style={{width: 32}}/>
            <h1 className="pageType">Contact</h1>
            <h2 className="pageDescription">{this.state.contact.Name}</h2>
          </div>
        </div>
      </div>
      <div className="clearfix"></div>
      <div className="row">
        <div className="col-sm-4 col-sm-offset-8 text-right">
          <a className="btn btn-primary" target="_blank" href={`https://eu3.salesforce.com/${this.state.contact._id}`}>Air Record</a>
          <a  className="btn btn-success" target="_blank" href={`https://na24.salesforce.com/${this.state.contact.RefId}`}>Swift Record</a>
        </div>
      </div>
      <div className="pbHeader">
        <table border="0" cellpadding="0" cellspacing="0">
          <tbody>
            <tr>
              <td className="pbTitle">
                <h2 className="mainTitle">Contact Detail</h2>
              </td>
              <td className="pbButton" id="topButtonRow"></td>
          </tr>
          </tbody>
        </table>
      </div>
      <div className="clearfix"></div>
      <div className="bPageBlock2 divdata2">
        <div className="txtlabel">Contact Detail</div>
         <div className="pbSubsection">
           <table className="sec" border="0" cellPadding="0" cellSpacing="0">
           <tbody>
           <tr>
             <td className="tlabel col25">Contact Owner</td>
             <td className="tdata col25"><DoubleClickInput fieldName="Owner.Name" urlUpdate={urlUpdate} >{this.state.contact.Owner ? this.state.contact.Owner.Name : '' }</DoubleClickInput></td>
             <td className="tlabel col25">Phone</td>
             <td className="tdata col25"><DoubleClickInput fieldName="Phone" urlUpdate={urlUpdate} >{this.state.contact.Phone}</DoubleClickInput></td>
           </tr>
           <tr>
             <td className="tlabel col25">Contact Name</td>
             <td className="tdata col25">
                <DoubleClickInput fieldName="Name" urlUpdate={urlUpdate} data={this.state.contact}>
                  {this.state.contact.Name}
                </DoubleClickInput></td>
             <td className="tlabel col25">Mobile</td>
             <td className="tdata col25">
              <DoubleClickInput fieldName="Mobile" urlUpdate={urlUpdate} >{this.state.contact.Mobile}</DoubleClickInput>
             </td>
           </tr>
           <tr>
             <td className="tlabel col25">Title</td>
             <td className="tdata col25">
                <DoubleClickInput fieldName="Title" urlUpdate={urlUpdate} >{this.state.contact.Title}</DoubleClickInput>
             </td>
             <td className="tlabel col25">Email</td>
             <td className="tdata col25">
                <DoubleClickInput fieldName="Email" urlUpdate={urlUpdate} >{this.state.contact.Email}</DoubleClickInput>
             </td>
           </tr>
           <tr>
             <td className="tlabel col25">Lead Source</td>
             <td className="tdata col25">
                <DoubleClickInput fieldName="Department" urlUpdate={urlUpdate} >{this.state.contact.Account ? this.state.contact.Account.Name : ''}</DoubleClickInput>
             </td>
             <td className="tlabel col25">Mailing Address</td>
             <td className="tdata col25">

                <p><DoubleClickInput fieldName="MailingStreet" urlUpdate={urlUpdate} >{this.state.contact.MailingStreet}</DoubleClickInput></p>
                <p><DoubleClickInput fieldName="MailingCity" urlUpdate={urlUpdate} >{this.state.contact.MailingCity}</DoubleClickInput></p>
                <p><DoubleClickInput fieldName="MailingCountry" urlUpdate={urlUpdate} >{this.state.contact.MailingCountry}</DoubleClickInput></p>
             </td>
           </tr>
           <tr>
             <td className="tlabel col25">Account Name</td>
             <td className="tdata col25">
                <DoubleClickInput fieldName="Department" urlUpdate={urlUpdate} >{this.state.contact.Account ? this.state.contact.Account.Name : ''}</DoubleClickInput>
             </td>
             <td className="tlabel col25">Department</td>
             <td className="tdata col25">
                <DoubleClickInput fieldName="Department" urlUpdate={urlUpdate} >{this.state.contact.Department}</DoubleClickInput>
             </td>
           </tr>
           <tr>
             <td className="tlabel col25">Comments</td>
             <td className="tdata col25">
                <DoubleClickInput fieldName="Comments__c" urlUpdate={urlUpdate} >{this.state.contact.Comments__c}</DoubleClickInput>
             </td>
             <td className="tlabel col25">Status</td>
             <td className="tdata col25">
                {this.state.contact.status}
             </td>
           </tr>
           <tr>
             <td className="tlabel col25">Relationship Strength</td>
             <td className="tdata col25">
                <DoubleClickInput fieldName="Relationship_strength__c" urlUpdate={urlUpdate} >{this.state.contact.Relationship_strength__c}</DoubleClickInput>
             </td>
           </tr>
           </tbody>
         </table>
         </div>
        </div>
        <div className="bPageBlock2 divdata2">
        <div className="txtlabel">Additional Information</div>
         <div className="pbSubsection">
           <table className="sec" border="0" cellPadding="0" cellSpacing="0">
           <tbody>
           <tr>
             <td className="tlabel col25">Assistant</td>
             <td className="tdata col25">
                <DoubleClickInput fieldName="AssistantName" urlUpdate={urlUpdate} >{this.state.contact.AssistantName}</DoubleClickInput>
             </td>
             <td className="tlabel col25">Assistant Phone</td>
             <td className="tdata col25">
                <DoubleClickInput fieldName="AssistantPhone" urlUpdate={urlUpdate} >{this.state.contact.AssistantPhone}</DoubleClickInput>
             </td>
           </tr>
           <tr>
             <td className="tlabel col25">Created Date</td>
             <td className="tdata col25">
                {moment(this.state.contact.CreatedDate).format("ddd, DD/MM/YYYY")}
             </td>

             <td className="tlabel col25">Last Modified Date</td>
             <td className="tdata col25">
                {moment(this.state.contact.LastModifiedDate).format("ddd, DD/MM/YYYY")}
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
contactDetail.contextType = {
  router : React.PropTypes.func.isRequired,
}

contactDetail.PropTypes = {
  //contact : React.PropTypes.object.isRequired,
}

export default withRouter(contactDetail)
