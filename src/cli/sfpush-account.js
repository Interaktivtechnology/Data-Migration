"use strict"

const jsforce = require("jsforce"),
  MongoClient = require('mongodb').MongoClient,
  assert = require('assert')

const url = 'mongodb://localhost:27017/DataMigration';

const sfTable = "Account",
  mongoCollection = "dm_9_SwiftProduction_Account",
  mode = "dev"


const redis = require('redis'),
  client = redis.createClient();


let conn = new jsforce.Connection({
  loginUrl: mode == 'dev' ? 'https://test.salesforce.com' : 'https://login.salesforce.com'
})


client.get(`sfpush_accessToken`, (err, accessToken) => {
  if (!accessToken) {
    conn.login("airenergi@interaktiv.sg.sbdm", "98502211GNNQbiLczHTS4MZh2IuRMgESf", function(err, sfResult) {
      if (err) {
        console.log(err)
        process.exit()
      }
      client.set(`sfpush_accessToken`, conn.accessToken, redis.print)
      client.set(`sfpush_instanceUrl`, conn.instanceUrl, redis.print)
      client.expireat(`sfpush_accessToken`, parseInt((+new Date) / 1000) + 3600)
      client.expireat(`sfpush_instanceUrl`, parseInt((+new Date) / 1000) + 3600)
      describeTable()
    })
  } else {
    client.get(`sfpush_instanceUrl`, (err, instanceUrl) => {
      conn = new jsforce.Connection({
        instanceUrl: instanceUrl,
        accessToken: accessToken
      })
      describeTable()
    })
  }
})

function describeTable(){
  client.get(`sfpush_${sfTable}`, (err, result) => {
    if (!result) {
      conn.describe(sfTable, (err, metadata) => {
        if (err) {
          console.log(err)
          process.exit()
        }
        client.set(`sfpush_${sfTable}`, JSON.stringify(metadata), redis.print)
        client.expireat(`sfpush_${sfTable}`, parseInt((+new Date) / 1000) + 3600)

        readMongoCollection(metadata)
      })
    } else {
      readMongoCollection(result)
    }
  })
}

function readMongoCollection(fieldList){
  fieldList = typeof fieldList == 'object' ? fieldList : JSON.parse(fieldList)
  MongoClient.connect(url, function(err, db) {

    let coll = db.collection(mongoCollection)
    let i = 0
    coll.find({
      ParentId : null
    }).limit(800).skip(200)
    .each((err, mongoResult) => {
      if(mongoResult != null){
        //compareTheField(fieldList, mongoResult)
        let soql = `select id from Account where Airswift_Record_Id__c= '${mongoResult._id}'`
        conn.query(soql, (err, res) =>{
          console.log( err ? "Error at querying account" + JSON.stringify(err) : res)

          let newObj = {}
          newObj = compareTheField(fieldList, mongoResult)
          newObj.RecordTypeId = '01220000000ILXOAA4'
          newObj.RowStatus__c = mongoResult.status
          newObj.Airswift_Record_Id__c = mongoResult._id
          setTimeout(() => {
            if(res.totalSize == 0)
            {
              conn.query(`select Id from User where name = '${mongoResult.Owner.Name}' and IsActive = true`, (err, ownerRes) => {
                if(ownerRes.totalSize > 0)
                  newObj.OwnerId = ownerRes.records[0].Id

                console.log("Inserting Account")
                setTimeout(() => {
                  conn.sobject(sfTable).insert(newObj, (err, res) => console.log("Account Inserted: " , err ? err : res))
                }, 100)
              })
            }
            i++
          }, 300)
        })
      }
    })
  })
}

function compareTheField(targetList, mongoResult){
  const ignoredField = ['id', 'Id', 'OwnerId', 'CreatedById', 'LastModifiedById',
    'Google_News__c', 'Owner_Bullhorn_User_Id__c', 'New_Scorecard_Eval__c', 'LastViewedDate',
    'LastReferencedDate', 'SystemModstamp', 'BillingAddress', 'CreatedDate', 'LastActivityDate', 'PhotoUrl',
    'LastModifiedDate',
     'FiscalYear',
     'HasOpportunityLineItem',
     'ForecastCategory',
     'IsClosed',
     'Unique_Value_Score__c',
     'HasOpenActivity',
     'IsWon',
     'New_Oppty_Assessment__c',
     'FiscalQuarter',
     'Fiscal',
     'HasOverdueTask'
  ]
  let newObj = {}
  Object.keys(mongoResult).forEach((key) => {
    for (let x in targetList.fields) {
      if (targetList.fields[x].name.toLowerCase() == key.toLowerCase() &&
        ignoredField.indexOf(key) == -1 &&
        mongoResult[key] != null)
        newObj[key] = mongoResult[key]
    }
  })
  //console.log(newObj)
  return newObj
}
