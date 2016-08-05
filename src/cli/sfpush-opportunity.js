"use strict"

const jsforce = require("jsforce"),
  MongoClient = require('mongodb').MongoClient,
  assert = require('assert')

const url = 'mongodb://localhost:27017/DataMigration';

const sfTable = "Opportunity",
  mongoCollection = "dm_15_merged",
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
    coll.find({
      status: 'new'
    }).limit(10).skip(10)
    .each((err, mongoResult) => {

      if(mongoResult != null){
        //compareTheField(fieldList, mongoResult)
        let soql = `select id from Account where Airswift_Record_Id__c= '${mongoResult.AccountId}'`
        conn.query(soql, (err, res) =>{
          //console.log(err ? err : res)
          let newObj = {}
          newObj = compareTheField(fieldList, mongoResult)
          newObj.RecordTypeId = '012w000000067voAAA'
          newObj.RowStatus__c = mongoResult.status
          newObj.Airswift_Record_Id__c = mongoResult.Id

          if(res.totalSize > 0)
          {
            newObj.AccountId = res.records[0].Id
            conn.query(`select Id from User where name = '${mongoResult.Owner.Name}' and IsActive = true`, (err, ownerRes) => {
              if(ownerRes.records.length > 0)
                newObj.OwnerId = ownerRes.records[0].Id
                conn.sobject("Opportunity").upsert(newObj, 'Airswift_Record_Id__c', (err, res) =>
                {
                  console.log(err ? err : JSON.stringify(res, null ,2 ))
                })
            })
          }
          else {
            insertAccount(mongoResult.AccountId, db, (newId) => {
              newObj.AccountId = res.records[0].newId
            })
          }



          //process.exit()
        })
      }
    })
  })
}

function insertAccount(id, db, callback){
  let coll = db.collection("dm_9_SwiftProduction_Account")
  coll.find({
    _id : id
  }).limit(1)
  .each((err, res) => {
    if(res != null){
      console.log(res.Name)
      callback(res)
    }
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
