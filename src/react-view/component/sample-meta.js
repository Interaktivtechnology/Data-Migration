import faker from 'faker'

const MetaData = {
  "fullName": "Account",
  "actionOverrides": [
    {
      "actionName": "CallHighlightAction",
      "type": "Default"
    },
    {
      "actionName": "CancelEdit",
      "type": "Default"
    },
    {
      "actionName": "Delete",
      "type": "Default"
    },
    {
      "actionName": "Edit",
      "type": "Default"
    },
    {
      "actionName": "EmailHighlightAction",
      "type": "Default"
    },
    {
      "actionName": "EnableCustomerPortalUser",
      "type": "Default"
    },
    {
      "actionName": "Follow",
      "type": "Default"
    },
    {
      "actionName": "List",
      "type": "Default"
    },
    {
      "actionName": "ListClean",
      "type": "Default"
    },
    {
      "actionName": "New",
      "type": "Default"
    },
    {
      "actionName": "RequestUpdate",
      "type": "Default"
    },
    {
      "actionName": "SaveEdit",
      "type": "Default"
    },
    {
      "actionName": "Tab",
      "type": "Default"
    },
    {
      "actionName": "View",
      "type": "Default"
    },
    {
      "actionName": "ViewCustomerPortalUser",
      "type": "Default"
    },
    {
      "actionName": "WebsiteHighlightAction",
      "type": "Default"
    }
  ],
  "compactLayoutAssignment": "SYSTEM",
  "enableFeeds": "true",
  "enableHistory": "true",
  "fields": [
    {
      "fullName": "AccountNumber",
      "trackFeedHistory": "false",
      "trackHistory": "false"
    },
    {
      "fullName": "AccountSource",
      "picklist": [
        null
      ],
      "trackFeedHistory": "false",
      "trackHistory": "false",
      "type": "Picklist"
    },
    {
      "fullName": "Account_Overview__c",
      "externalId": "false",
      "label": "Account Overview",
      "length": "32000",
      "trackFeedHistory": "false",
      "trackHistory": "true",
      "type": "Html",
      "visibleLines": "50"
    },
    {
      "fullName": "Account_Relationship_Type__c",
      "description": "This picklist determines reflects the relationship with the client account",
      "externalId": "false",
      "label": "Account Relationship Strength",
      "picklist": [
        null
      ],
      "trackFeedHistory": "false",
      "trackHistory": "true",
      "type": "Picklist"
    },
    {
      "fullName": "AnnualRevenue",
      "trackFeedHistory": "false",
      "trackHistory": "false"
    },
    {
      "fullName": "Archive_Comments__c",
      "externalId": "false",
      "label": "Archive Comments",
      "length": "32000",
      "trackFeedHistory": "false",
      "trackHistory": "false",
      "type": "LongTextArea",
      "visibleLines": "3"
    },
    {
      "fullName": "BillingAddress",
      "trackFeedHistory": "false",
      "trackHistory": "false"
    },
    {
      "fullName": "Budget_Revenue__c",
      "externalId": "false",
      "label": "Budget Revenue",
      "precision": "18",
      "required": "false",
      "scale": "2",
      "trackFeedHistory": "false",
      "trackHistory": "false",
      "type": "Currency"
    },
    {
      "fullName": "CBR__c",
      "externalId": "false",
      "label": "CBR",
      "summarizedField": "Opportunity.Budget_Revenue__c",
      "summaryFilterItems": [
        null
      ],
      "summaryForeignKey": "Opportunity.AccountId",
      "summaryOperation": "sum",
      "trackHistory": "false",
      "type": "Summary"
    },
    {
      "fullName": "Competitors__c",
      "externalId": "false",
      "label": "Other competitors",
      "picklist": [
        null
      ],
      "trackFeedHistory": "false",
      "trackHistory": "true",
      "type": "MultiselectPicklist",
      "visibleLines": "6"
    },
    {
      "fullName": "Description",
      "trackFeedHistory": "false",
      "trackHistory": "true"
    },
    {
      "fullName": "Executive_Sponsor__c",
      "externalId": "false",
      "label": "Executive Sponsor",
      "required": "false",
      "trackFeedHistory": "false",
      "trackHistory": "false",
      "type": "TextArea"
    },
    {
      "fullName": "Fax",
      "trackFeedHistory": "false",
      "trackHistory": "false"
    },
    {
      "fullName": "Global_Account__c",
      "defaultValue": "false",
      "externalId": "false",
      "label": "Global Account",
      "trackFeedHistory": "false",
      "trackHistory": "true",
      "type": "Checkbox"
    },
    {
      "fullName": "Industry",
      "picklist": [
        null
      ],
      "trackFeedHistory": "false",
      "trackHistory": "false",
      "type": "Picklist"
    },
    {
      "fullName": "IsPartner",
      "trackFeedHistory": "false",
      "trackHistory": "false"
    },
    {
      "fullName": "Jigsaw",
      "trackFeedHistory": "false",
      "trackHistory": "false"
    },
    {
      "fullName": "Key_information__c",
      "description": "this box enables us to write some key information that needs to be shared with other users",
      "externalId": "false",
      "label": "Key information",
      "required": "false",
      "trackFeedHistory": "false",
      "trackHistory": "false",
      "type": "TextArea"
    },
    {
      "fullName": "Last_visit_date__c",
      "externalId": "false",
      "label": "Last visit date",
      "summarizedField": "Visit_Report__c.Date__c",
      "summaryForeignKey": "Visit_Report__c.Account__c",
      "summaryOperation": "max",
      "trackHistory": "false",
      "type": "Summary"
    },
    {
      "fullName": "MPS_Account__c",
      "defaultValue": "false",
      "externalId": "false",
      "label": "Global or Regional Account",
      "trackFeedHistory": "false",
      "trackHistory": "false",
      "type": "Checkbox"
    },
    {
      "fullName": "Main_competitor__c",
      "externalId": "false",
      "label": "Main competitor",
      "picklist": [
        null
      ],
      "trackFeedHistory": "false",
      "trackHistory": "false",
      "type": "Picklist"
    },
    {
      "fullName": "Name",
      "trackFeedHistory": "true",
      "trackHistory": "true"
    },
    {
      "fullName": "NumberOfEmployees",
      "trackFeedHistory": "false",
      "trackHistory": "false"
    },
    {
      "fullName": "OwnerId",
      "trackFeedHistory": "true",
      "trackHistory": "true",
      "type": "Lookup"
    },
    {
      "fullName": "Ownership",
      "picklist": [
        null
      ],
      "trackFeedHistory": "false",
      "trackHistory": "true",
      "type": "Picklist"
    },
    {
      "fullName": "ParentId",
      "trackFeedHistory": "false",
      "trackHistory": "true",
      "type": "Hierarchy"
    },
    {
      "fullName": "Parent_Name__c",
      "externalId": "false",
      "label": "Parent Name",
      "length": "255",
      "required": "false",
      "trackFeedHistory": "false",
      "trackHistory": "false",
      "type": "Text",
      "unique": "false"
    },
    {
      "fullName": "Phone",
      "trackFeedHistory": "false",
      "trackHistory": "true"
    },
    {
      "fullName": "Project_stage__c",
      "description": "Feasibility\r\nPre- Feed\r\nFEED\r\nDetail Design\r\nFabrication\r\nConstruction\r\nCommissioning\r\nStart up\r\nCommissioning",
      "externalId": "false",
      "label": "Project stage",
      "picklist": [
        null
      ],
      "trackFeedHistory": "false",
      "trackHistory": "true",
      "type": "Picklist"
    },
    {
      "fullName": "Rating",
      "picklist": [
        null
      ],
      "trackFeedHistory": "false",
      "trackHistory": "false",
      "type": "Picklist"
    },
    {
      "fullName": "Regions__c",
      "externalId": "false",
      "label": "Region.",
      "picklist": [
        null
      ],
      "trackFeedHistory": "false",
      "trackHistory": "false",
      "type": "Picklist"
    },
    {
      "fullName": "ShippingAddress",
      "trackFeedHistory": "false",
      "trackHistory": "false"
    },
    {
      "fullName": "Sic",
      "trackFeedHistory": "false",
      "trackHistory": "false"
    },
    {
      "fullName": "SicDesc",
      "trackFeedHistory": "false",
      "trackHistory": "false"
    },
    {
      "fullName": "Site",
      "trackFeedHistory": "false",
      "trackHistory": "false"
    },
    {
      "fullName": "Source__c",
      "deleteConstraint": "SetNull",
      "externalId": "false",
      "label": "Source",
      "referenceTo": "User",
      "relationshipName": "Accounts",
      "required": "false",
      "trackFeedHistory": "false",
      "trackHistory": "false",
      "type": "Lookup"
    },
    {
      "fullName": "TickerSymbol",
      "trackFeedHistory": "false",
      "trackHistory": "false"
    },
    {
      "fullName": "Tier__c",
      "externalId": "false",
      "label": "Tier",
      "picklist": [
        null
      ],
      "trackFeedHistory": "false",
      "trackHistory": "false",
      "type": "Picklist"
    },
    {
      "fullName": "Type",
      "picklist": [
        null
      ],
      "trackFeedHistory": "false",
      "trackHistory": "true",
      "type": "Picklist"
    },
    {
      "fullName": "Updated_Comments__c",
      "externalId": "false",
      "label": "Updated Comments",
      "length": "32768",
      "trackFeedHistory": "false",
      "trackHistory": "false",
      "type": "LongTextArea",
      "visibleLines": "3"
    },
    {
      "fullName": "Website",
      "trackFeedHistory": "false",
      "trackHistory": "false"
    },
    {
      "fullName": "airenergi__Account_Hierarchy__c",
      "deprecated": "false",
      "externalId": "false",
      "formula": "HYPERLINK('/acc/account_hierarchy.jsp?id='+ Id , 'View Account Hierarchy','_top')",
      "formulaTreatBlanksAs": "BlankAsZero",
      "label": "Account Hierarchy",
      "required": "false",
      "trackHistory": "false",
      "type": "Text",
      "unique": "false"
    },
    {
      "fullName": "airenergi__Active__c",
      "deprecated": "false",
      "externalId": "false",
      "label": "Active",
      "picklist": [
        null
      ],
      "trackFeedHistory": "false",
      "trackHistory": "false",
      "type": "Picklist"
    },
    {
      "fullName": "airenergi__Actual_Yr_1_GP__c",
      "deprecated": "false",
      "externalId": "false",
      "label": "Actual Yr 1 GP",
      "precision": "18",
      "required": "false",
      "scale": "2",
      "trackFeedHistory": "false",
      "trackHistory": "false",
      "type": "Currency"
    },
    {
      "fullName": "airenergi__Actual_Yr_2_GP__c",
      "deprecated": "false",
      "externalId": "false",
      "label": "Actual Yr 2 GP",
      "precision": "18",
      "required": "false",
      "scale": "2",
      "trackFeedHistory": "false",
      "trackHistory": "false",
      "type": "Currency"
    },
    {
      "fullName": "airenergi__Actual_Yr_3_GP__c",
      "deprecated": "false",
      "externalId": "false",
      "label": "Actual Yr 3 GP",
      "precision": "18",
      "required": "false",
      "scale": "2",
      "trackFeedHistory": "false",
      "trackHistory": "false",
      "type": "Currency"
    },
    {
      "fullName": "airenergi__Next_FY_After_Revenue__c",
      "defaultValue": "0",
      "deprecated": "false",
      "externalId": "false",
      "label": "Forecast Yr 3 GP",
      "precision": "18",
      "required": "false",
      "scale": "2",
      "trackFeedHistory": "false",
      "trackHistory": "false",
      "type": "Currency"
    },
    {
      "fullName": "airenergi__Next_FY_Revenue__c",
      "defaultValue": "0",
      "deprecated": "false",
      "externalId": "false",
      "label": "Forecast Yr 2 GP",
      "precision": "18",
      "required": "false",
      "scale": "2",
      "trackFeedHistory": "false",
      "trackHistory": "false",
      "type": "Currency"
    },
    {
      "fullName": "airenergi__Opp_Total_Own__c",
      "deprecated": "false",
      "externalId": "false",
      "label": "Opp Total",
      "summarizedField": "Opportunity.Amount",
      "summaryForeignKey": "Opportunity.AccountId",
      "summaryOperation": "sum",
      "trackHistory": "false",
      "type": "Summary"
    },
    {
      "fullName": "airenergi__Oppt_Total_Of_Regional_Account__c",
      "deprecated": "false",
      "description": "this is a Amount total of All Opportunities of Regional Accounts",
      "externalId": "false",
      "label": "Oppt Total Of Regional Account",
      "summarizedField": "airenergi__GlobalRegionalAccountMapping__c.airenergi__SumOfOppt_del__c",
      "summaryForeignKey": "airenergi__GlobalRegionalAccountMapping__c.airenergi__GlobalAccount__c",
      "summaryOperation": "sum",
      "trackHistory": "false",
      "type": "Summary"
    },
    {
      "fullName": "airenergi__Oppt_Totals__c",
      "deprecated": "false",
      "externalId": "false",
      "formula": "airenergi__Opp_Total_Own__c + airenergi__Oppt_Total_Of_Regional_Account__c",
      "formulaTreatBlanksAs": "BlankAsZero",
      "label": "Oppt Total",
      "precision": "18",
      "required": "false",
      "scale": "2",
      "trackHistory": "false",
      "type": "Currency"
    },
    {
      "fullName": "airenergi__Region__c",
      "deprecated": "false",
      "externalId": "false",
      "inlineHelpText": "airenergi_Region__c",
      "label": "Region",
      "picklist": [
        null
      ],
      "trackFeedHistory": "false",
      "trackHistory": "true",
      "type": "Picklist"
    },
    {
      "fullName": "airenergi__Regions__c",
      "deprecated": "false",
      "externalId": "false",
      "label": "Regions",
      "picklist": [
        null
      ],
      "trackFeedHistory": "false",
      "trackHistory": "false",
      "type": "Picklist"
    },
    {
      "fullName": "airenergi__Revenue_Contractor_Month__c",
      "defaultValue": "0",
      "deprecated": "false",
      "externalId": "false",
      "label": "Revenue/Contractor/Month",
      "precision": "18",
      "required": "false",
      "scale": "2",
      "trackFeedHistory": "false",
      "trackHistory": "false",
      "type": "Currency"
    },
    {
      "fullName": "airenergi__Terms_Agreed__c",
      "defaultValue": "false",
      "deprecated": "false",
      "externalId": "false",
      "label": "Terms Agreed",
      "trackFeedHistory": "false",
      "trackHistory": "false",
      "type": "Checkbox"
    },
    {
      "fullName": "airenergi__This_FY_Revenue__c",
      "defaultValue": "0",
      "deprecated": "false",
      "externalId": "false",
      "label": "Forecast Yr 1 GP",
      "precision": "18",
      "required": "false",
      "scale": "2",
      "trackFeedHistory": "false",
      "trackHistory": "false",
      "type": "Currency"
    },
    {
      "fullName": "airenergi__Type_of_Account__c",
      "deprecated": "false",
      "externalId": "false",
      "label": "Type of Account",
      "picklist": [
        null
      ],
      "trackFeedHistory": "false",
      "trackHistory": "true",
      "type": "Picklist"
    },
    {
      "fullName": "competitor_comments__c",
      "externalId": "false",
      "label": "Competitor comments",
      "required": "false",
      "trackFeedHistory": "false",
      "trackHistory": "false",
      "type": "TextArea"
    },
    {
      "fullName": "of_days_since_last_visit__c",
      "externalId": "false",
      "formula": "today()- Last_visit_date__c",
      "formulaTreatBlanksAs": "BlankAsZero",
      "label": "# of days since last visit",
      "precision": "18",
      "required": "false",
      "scale": "0",
      "trackHistory": "false",
      "type": "Number",
      "unique": "false"
    },
    {
      "fullName": "open_door__c",
      "defaultValue": "true",
      "externalId": "false",
      "label": "open door",
      "trackFeedHistory": "false",
      "trackHistory": "false",
      "type": "Checkbox"
    },
    {
      "fullName": "zisf__zoom_id__c",
      "deprecated": "false",
      "description": "ZoomInfo person id, if the data on this object has ever been imported from the ZIDB.\nStored as Long on Solr.",
      "externalId": "false",
      "label": "ZoomInfo ID",
      "length": "20",
      "required": "false",
      "trackFeedHistory": "false",
      "trackHistory": "false",
      "type": "Text",
      "unique": "false"
    },
    {
      "fullName": "zisf__zoom_lastupdated__c",
      "deprecated": "false",
      "description": "Last updated from ZoomInfo timestamp",
      "externalId": "false",
      "label": "ZoomInfo Last Updated",
      "required": "false",
      "trackFeedHistory": "false",
      "trackHistory": "false",
      "type": "DateTime"
    }
  ],
  "label": "Account",
  "listViews": [
    {
      "fullName": "APAC_Global_Regional_Accounts",
      "columns": [
        null
      ],
      "filterScope": "Everything",
      "filters": [
        null
      ],
      "label": "APAC Global & Regional Accounts"
    },
    {
      "fullName": "APAC_regional_other_Accounts",
      "columns": [
        null
      ],
      "filterScope": "Everything",
      "filters": [
        null
      ],
      "label": "APAC Other Regional Accounts"
    },
    {
      "fullName": "Accounts_DB",
      "columns": [
        null
      ],
      "filterScope": "Everything",
      "filters": [
        null
      ],
      "label": "Accounts - DB"
    },
    {
      "fullName": "Accounts_DR",
      "columns": [
        null
      ],
      "filterScope": "Everything",
      "filters": [
        null
      ],
      "label": "Accounts - DR"
    },
    {
      "fullName": "Accounts_TC",
      "columns": [
        null
      ],
      "filterScope": "Everything",
      "filters": [
        null
      ],
      "label": "Accounts - TC"
    },
    {
      "fullName": "Africa",
      "columns": [
        null
      ],
      "filterScope": "Everything",
      "filters": [
        null
      ],
      "label": "Africa"
    },
    {
      "fullName": "Africa_Accounts",
      "columns": [
        null
      ],
      "filterScope": "Everything",
      "filters": [
        null
      ],
      "label": "Africa Accounts"
    },
    {
      "fullName": "Aidan_Stoate",
      "columns": [
        null
      ],
      "filterScope": "Everything",
      "filters": [
        null
      ],
      "label": "Aidan Stoate"
    },
    {
      "fullName": "AllAccounts",
      "columns": [
        null
      ],
      "filterScope": "Everything",
      "label": "All Accounts"
    },
    {
      "fullName": "Bradshaw_accounts",
      "columns": [
        null
      ],
      "filterScope": "Everything",
      "filters": [
        null
      ],
      "label": "Bradshaw accounts"
    },
    {
      "fullName": "David_Waterfield",
      "columns": [
        null
      ],
      "filterScope": "Everything",
      "filters": [
        null
      ],
      "label": "David Waterfield"
    },
    {
      "fullName": "Global_Accounts_Europe",
      "columns": [
        null
      ],
      "filterScope": "Everything",
      "filters": [
        null
      ],
      "label": "Global Accounts Europe"
    },
    {
      "fullName": "James_Ellis",
      "columns": [
        null
      ],
      "filterScope": "Everything",
      "filters": [
        null
      ],
      "label": "James Ellis"
    },
    {
      "fullName": "MPSAccounts",
      "columns": [
        null
      ],
      "filterScope": "Everything",
      "filters": [
        null
      ],
      "label": "MPS Accounts"
    },
    {
      "fullName": "MyAccounts",
      "filterScope": "Mine",
      "label": "My Accounts"
    },
    {
      "fullName": "NewThisWeek",
      "columns": [
        null
      ],
      "filterScope": "Everything",
      "filters": [
        null
      ],
      "label": "New This Week"
    },
    {
      "fullName": "Regional_Accounts_France",
      "columns": [
        null
      ],
      "filterScope": "Everything",
      "filters": [
        null
      ],
      "label": "Regional Accounts - France"
    },
    {
      "fullName": "Regional_Accounts_The_Netherlands",
      "columns": [
        null
      ],
      "filterScope": "Everything",
      "filters": [
        null
      ],
      "label": "Regional Accounts - The Netherlands"
    },
    {
      "fullName": "Singapore_Accounts",
      "columns": [
        null
      ],
      "filterScope": "Everything",
      "filters": [
        null
      ],
      "label": "Singapore Accounts"
    },
    {
      "fullName": "UAE_Accounts",
      "columns": [
        null
      ],
      "filterScope": "Everything",
      "filters": [
        null
      ],
      "label": "UAE Accounts"
    },
    {
      "fullName": "UK_Europe_Tier_21",
      "booleanFilter": "1 AND 2 AND 3",
      "columns": [
        null
      ],
      "filterScope": "Everything",
      "filters": [
        null
      ],
      "label": "UK Europe Tier 2"
    }
  ],
  "recordTypeTrackFeedHistory": "false",
  "recordTypeTrackHistory": "true",
  "recordTypes": [
    {
      "fullName": "airenergi__Global_Account",
      "active": "true",
      "label": "Parent Account",
      "picklistValues": [
        null
      ]
    },
    {
      "fullName": "airenergi__Regional_Account",
      "active": "true",
      "label": "Child Account",
      "picklistValues": [
        null
      ]
    }
  ],
  "searchLayouts": {
    "customTabListAdditionalFields": [
      "ACCOUNT.NAME",
      "ACCOUNT.ADDRESS1_CITY",
      "ACCOUNT.PHONE1"
    ],
    "lookupDialogsAdditionalFields": [
      "ACCOUNT.NAME",
      "ACCOUNT.SITE",
      "CORE.USERS.ALIAS",
      "airenergi__Type_of_Account__c"
    ],
    "lookupPhoneDialogsAdditionalFields": [
      "ACCOUNT.NAME",
      "ACCOUNT.SITE",
      "CORE.USERS.ALIAS",
      "airenergi__Type_of_Account__c",
      "ACCOUNT.PHONE1"
    ],
    "searchFilterFields": [
      "airenergi__Actual_Yr_1_GP__c",
      "airenergi__Actual_Yr_2_GP__c",
      "airenergi__Actual_Yr_3_GP__c"
    ],
    "searchResultsAdditionalFields": [
      "ACCOUNT.NAME",
      "ACCOUNT.SITE",
      "MPS_Account__c",
      "ACCOUNT.PHONE1",
      "CORE.USERS.ALIAS",
      "airenergi__This_FY_Revenue__c",
      "airenergi__Next_FY_Revenue__c",
      "airenergi__Next_FY_After_Revenue__c"
    ]
  },
  "sharingModel": "ReadWrite",
  "webLinks": [
    {
      "fullName": "financialprofile",
      "availability": "online",
      "displayType": "link",
      "encodingKey": "UTF-8",
      "hasMenubar": "true",
      "hasScrollbars": "true",
      "hasToolbar": "true",
      "isResizable": "true",
      "linkType": "url",
      "masterLabel": "financial profile",
      "openType": "newWindow",
      "position": "none",
      "protected": "false",
      "showsLocation": "true",
      "showsStatus": "true",
      "url": "http://hoovers.com/free/search/simple/xmillion/index.xhtml?query_string={!Account_Name}&which=company&page=1"
    },
    {
      "fullName": "map",
      "availability": "online",
      "displayType": "link",
      "encodingKey": "UTF-8",
      "hasMenubar": "true",
      "hasScrollbars": "true",
      "hasToolbar": "true",
      "isResizable": "true",
      "linkType": "url",
      "masterLabel": "map",
      "openType": "newWindow",
      "position": "none",
      "protected": "false",
      "showsLocation": "true",
      "showsStatus": "true",
      "url": "http://maps.yahoo.com/py/maps.py?cn={!Account_BillingCountry}&csz={!Account_BillingCity}+{!Account_BillingState}+{!Account_BillingPostalCode}+&addr={!Account_BillingAddress}"
    },
    {
      "fullName": "news",
      "availability": "online",
      "displayType": "link",
      "encodingKey": "UTF-8",
      "hasMenubar": "true",
      "hasScrollbars": "true",
      "hasToolbar": "true",
      "isResizable": "true",
      "linkType": "url",
      "masterLabel": "news",
      "openType": "newWindow",
      "position": "none",
      "protected": "false",
      "showsLocation": "true",
      "showsStatus": "true",
      "url": "http://news.altavista.com/search?nc=0&q={!Account_Name}"
    }
  ]
}

export function AccountExample(total){
  var Account = []
  for(var i =0; i<total;i++)
  {
    var eachRow = {}
    MetaData.fields.map( (object, index) => {
     eachRow[object.fullName] = faker.lorem.words()
    })
    Account.push(eachRow)
  }
  return Account
}

export default MetaData
