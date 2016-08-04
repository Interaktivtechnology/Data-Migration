"use strict"

const jsforce = require("jsforce"),
  MongoClient = require('mongodb').MongoClient,
  assert = require('assert')

const url = 'mongodb://localhost:27017/DataMigration';

const sfTable = process.argv[2],
  mongoCollection = process.argv[3],
  mode = process.argv[4]

const redis = require('redis'),
      client = redis.createClient();


let conn = new jsforce.Connection({
  loginUrl : mode == 'dev' ? 'https://test.salesforce.com' : 'https://login.salesforce.com'
})



client.get(`sfpush_accessToken`, (err, accessToken) => {
  if(!accessToken)
  {
    conn.login("airenergi@interaktiv.sg.sbdm", "98502211GNNQbiLczHTS4MZh2IuRMgESf" , function(err, sfResult) {
      if(err) {
        console.log(err)
        process.exit()
      }
      client.set(`sfpush_accessToken`,conn.accessToken , redis.print)
      client.set(`sfpush_instanceUrl`,conn.instanceUrl , redis.print)
      client.expireat(`sfpush_accessToken`,  parseInt((+new Date)/1000) + 3600)
      client.expireat(`sfpush_instanceUrl`, parseInt((+new Date)/1000) + 3600)
      describeTable()
    })
  }

  else
  {
    client.get(`sfpush_instanceUrl`, (err, instanceUrl) => {
      conn = new jsforce.Connection({
        instanceUrl : instanceUrl,
        accessToken : accessToken
      })
      describeTable()
    })
  }
})


function describeTable()
{
  client.get(`sfpush_${sfTable}`, (err, result) => {
    if(!result)
    {
      conn.describe(sfTable, (err, metadata) => {
        if(err) {
          console.log(err)
          process.exit()
        }
        client.set(`sfpush_${sfTable}`, JSON.stringify(metadata) , redis.print)
        client.expireat(`sfpush_${sfTable}`, parseInt((+new Date)/1000) + 3600)

        readMongoCollection(metadata)
      })
    }
    else {
      readMongoCollection(result)
    }
  })

}

function readMongoCollection(fieldList){
  fieldList = typeof fieldList == 'object' ? fieldList : JSON.parse(fieldList)
  MongoClient.connect(url, function(err, db) {

    let coll = db.collection(mongoCollection)

    coll.find({ParentId : null, status : 'new', NewId : null }).limit(1).each((err, res) => {
      const ignoredField = ['id', 'Id', 'OwnerId', 'CreatedById', 'LastModifiedById']
      let newObj = {}
      if(res != null){
        Object.keys(res).forEach((key) => {
          for(let x in fieldList.fields)
          {
            if(fieldList.fields[x].name.toLowerCase() == key.toLowerCase() &&
              ignoredField.indexOf(key) == -1)
              newObj[key] = res[key]
          }
        })
        if(res.RefId){
          newObj.Airswift_Record_Id__c = res.RefId
          conn.sobject(sfTable).upsert(newObj, 'Airswift_Record_Id__c', (err, res) => {
            if(err) console.log(err) process.exit()

            console.log(res.Id)

          })
        }



      }
      else
        process.exit()


    })
  })
}
