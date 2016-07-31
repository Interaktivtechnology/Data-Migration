"use strict"
let memoryUsage = process.memoryUsage()
const mysql = require('mysql')
const config = require('../routes-server/sequelize/config/config')
const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/DataMigration';
const Db = require('mongodb').Db,
    Server = require('mongodb').Server,
    helper = require('./helper-mongo')
const util = require('util'),
    readline = require('readline')
const report = {}
let mergedRecord = []
const db = new Db('DataMigration', new Server('localhost', 27017)),
 pool = mysql.createConnection({
  connectionLimit : 100,
  user : config.username,
  password : config.password,
  host : config.host,
  database : config.database
});
memoryUsage = (memoryUsage.rss + memoryUsage.heapTotal + memoryUsage.heapUsed)/(1024*1024)
console.log("Memory Usage :" , memoryUsage.toFixed(2), "MB")
const SKIP = process.argv[2] ? parseInt(process.argv[2]) * 1000 : 0

db.open((err, mongodb) => {
  if(err) console.log(err)

  pool.query("Select ds.name, m.deduplicationLogic,  mds.objectName, mds.codeReferences, mds.dataSourceId, mds.migrationId from Migration m  inner join MigrationDataSource mds on m.id = mds.migrationId " +
              " INNER JOIN DataSource ds on ds.Id = mds.dataSourceId " +
                  "Where m.status = 'processing' Order By m.updatedAt LIMIT 2 ", (err, result) => {
                    if(err) console.log(err)
    let config = {}
    if(result.length == 0){
      console.log("No merging found..");
      process.exit()
    }
    for(let x in result)
    {
      config[`${result[x].codeReferences}`] = {
        dsName : result[x].name,
        objectName : result[x].objectName,
        tableName : `dm_${result[x].migrationId}_${result[x].name}_${result[x].objectName}`,
        deduplicationLogic : result[x].deduplicationLogic,
        collection : mongodb.collection(`dm_${result[x].migrationId}_${result[x].name}_${result[x].objectName}`),
        migrationId : result[x].migrationId
      }
    }


    getField(config.ds1.migrationId, config, (newConfig) => {
      let collectionName = config['ds1'].tableName.split('_');
      db.createCollection(`${collectionName[0]}_${collectionName[1]}_merged`, (err, mergedCollection) => {
        report.merged = 0
        report.conflict = 0
        let cursorDs1 = newConfig.ds1.collection.find({})
        cursorDs1.count((err, dslength1) => helper.asyncLoop({
          length : dslength1,
          functionToLoop : function(loop, i){
            if(i == dslength1 - 1) {
              loop()
              return
            }
            cursorDs1.nextObject((err, item) => {

              if(item != null){
                let filter = {}
                if(newConfig.ds2.objectName == 'Contact'){
                  if(typeof(item.Email) == 'string')
                    filter.Email = new RegExp(`\.*${item.Email.toLowerCase()}*\.`, 'ig')
                  if(typeof(item.Name) == 'string')
                    filter.Name = new RegExp(`\.*${ClearAllWhiteSpace(helper.getFirstWord(item.Name.toLowerCase()))}*\.`, 'ig')
                }
                else
                  filter.Name = new RegExp(`\.*${ClearAllWhiteSpace(helper.getFirstWord(item.Name.toLowerCase()))}*\.`, 'ig')


                let cursor = newConfig.ds2.collection.find(filter)
                cursor.toArray((err, result) => {
                  process.stdout.clearLine();  // clear current text
                  process.stdout.cursorTo(0);
                  process.stdout.write(`Processing ${i} / ${dslength1}`)

                  if(result != null){
                    for(let x in result)
                    {
                      let ds1 = item, ds2 = result[x], isEqual
                      eval("isEqual = " + newConfig.ds1.deduplicationLogic)
                      //console.log(ClearAllWhiteSpace(ds1.Name), '-', ClearAllWhiteSpace(ds2.Name), isEqual)
                      if(isEqual)
                      {
                        let newData = {}
                        //console.log(result)
                        newData.Id = ds2.Id
                        newData._id = ds2.Id
                        newData.status = "merged"
                        newData.RefId = ds1.Id
                        newData.attributes = ds2.attributes
                        newData.Owner = ds2.Owner
                        newData.RecordType = ds2.RecordType
                        newData.CreatedBy = ds2.CreatedBy
                        newData.LastModifiedBy = ds2.LastModifiedBy
                        if(ds2.Account) newData.Account = ds2.Account
                        if(config.objectName == 'Contact')
                        {
                          newData.IsConflict = ds1.Phone == ds2.Phone || ds1.MailingPostalCode == ds2.MailingPostalCode ||
                            ds1.Mobile == ds2.Mobile
                          report.conflict += newData.IsConflict ? 1 : 0
                        }
                        config['ds1'].fields.map((object, key) => {
                          newData[object.mergedTo] = ds1[object.fieldName] ? ds1[object.fieldName] : ds2[object.fieldName]
                        })
                        config['ds2'].fields.map((object, key) => {
                          newData[object.mergedTo] = ds2[object.fieldName] ? ds2[object.fieldName]  : ds1[object.fieldName] 
                        })
                        newData.OldData = {
                          ds1 : ds1,
                          ds2 : ds2
                        }
                        mergedRecord.push(ds1.Id)
                        mergedRecord.push(ds2.Id)
                        mergedCollection.insert(newData, (err, result) => result = null)
                        newData = null
                        report.merged ++
                      }
                    }
                  }
                  result = null
                  cursor.close()
                  cursor = null
                  loop()
                })
              }
              else loop()
            })
          },
          callback : function(){
            readline.clearLine()
            readline.cursorTo(process.stdout, 0);
            process.stdout.write("Merged Done...");
            setTimeout(() => InsertOther(config, mergedCollection), 3000)

          }
        }))


      })
    })

  })
})

// Insert UnMerged Record
function InsertOther(config, mergedCollection)
{
  readline.cursorTo(process.stdout, 0);
  process.stdout.write("Inserting UnMerged Object object");
  let ds1Cursor = config.ds1.collection.find({})
  report.new = 0

  config.ds1.collection.find().count((err, ds1Length) =>{
    helper.asyncLoop({
      length : ds1Length,
      functionToLoop : function(loop, i){
        ds1Cursor.nextObject((err, item) => {
          process.stdout.cursorTo(0);
          process.stdout.write(`Inserting to ${config.ds1.tableName}, processing ${i}` )
          if(mergedRecord.indexOf(item.Id) == -1)
          {
            let newData = HandleUnMergeObject(config, item)
            newData._id = item.Id
            newData.status = "new"
            newData.RefId = item.Id
            newData.RecordType = item.RecordType
            newData.Owner = item.Owner
            newData.attributes = item.attributes
            newData.CreatedBy = item.CreatedBy
            newData.LastModifiedBy = item.LastModifiedBy
            if(item.Account) newData.Account = item.Account
            if(config.objectName =='Account' )
            {
              let index = mergedRecord.indexOf(item.ParentId)
              if(index > -1)
                newData.ParentId = mergedRecord[index + 1]
              index = ''
              console.log("Changing ParentId....")
            }
            mergedCollection.insert(newData, (err) => { if(err) console.log(err); newData = null}  )
            newData = null
            report.new ++
          }
          loop()
        })
      },
      callback : function(){
         readline.clearLine()
         readline.cursorTo(process.stdout, 0);
         process.stdout.write("Unmerged Record from Ds1 Done...");
         setTimeout(() => ds2Insert(config, mergedCollection), 3000)
         ds1Cursor = null

      }
    })
  })



}

let ds2Insert  = (config, mergedCollection) =>{
  let ds2Cursor = config.ds2.collection.find({})
  report.existing = 0
  config.ds2.collection.find().count((err, ds1Length) =>{
    helper.asyncLoop({
      length : ds1Length,
      functionToLoop : function(loop, i){
        ds2Cursor.nextObject((err, item) => {
          readline.cursorTo(process.stdout, 0);
          process.stdout.write(`Inserting to ${config.ds2.tableName}, processing ${i}` )
          if(mergedRecord.indexOf(item.Id) == -1)
          {
            let newData = HandleUnMergeObject(config, item)
            newData._id = item.Id
            newData.OldData = [item]
            newData.attributes = item.attributes
            newData.RefId = item.Id
            newData.RecordType = item.RecordType
            newData.Owner = item.Owner
            newData.CreatedBy = item.CreatedBy
            newData.LastModifiedBy = item.LastModifiedBy
            if(item.Account) newData.Account = item.Account
            if(config.objectName == 'Account')
              newData.Parent = item.Parent

            newData.status = "existing"
            mergedCollection.insert(newData, (err) => { if(err) console.log(err); newData = null })

            report.existing++
          }
          loop()
        })
      },
      callback : () => {
        let memoryUsage = process.memoryUsage()
        memoryUsage = (memoryUsage.rss + memoryUsage.heapTotal + memoryUsage.heapUsed)/(1024*1024)
        let sql = "UPDATE Migration SET ? Where Id = '" + config.ds1.migrationId+ "'"
        let params = {
          status : 'done',
          merged : report.merged,
          conflict : report.conflict,
          existing : report.existing,
          new : report.new,
        }
        var query = mysql.format(sql, params)
        ds2Cursor = null
        pool.query(query, (err, res) => {
          pool.end()
          db.close()
          readline.clearLine()
          console.log(report)
          console.log("Memory Usage After :" , memoryUsage.toFixed(2), "MB")
          process.exit()
        })
      }
    })
  })
}

function HandleUnMergeObject(config, ds){
  let newData = {}
  config['ds1'].fields.map((object, key) => {
    newData[object.fieldName] = ds[object.fieldName]
  })
  config['ds2'].fields.map((object, key) => {
    newData[object.fieldName] = ds[object.fieldName]
  })
  return newData
}

function ClearAllWhiteSpace(str){
  str = typeof(str) == 'string'  ? str : ''
  let result = str.match(/[a-zA-Z]/ig)
  if(!result)
    return str
  else
    return result.join('').toLowerCase()
}

function getField(migrationId, config, callback){

  pool.query("Select role, fieldName, mergedTo, logic from MigrationDataSourceField where migrationId = " + migrationId, (err, result) => {
    let fieldConfig = {}

    Object.keys(config).forEach((key) => {
      fieldConfig[key] = config[key]
      fieldConfig[key].fields = []
      for(let i in result)
      {
        if(result[i].role == key){
          fieldConfig[key].fields.push(result[i])

        }
      }
    })
    if(typeof callback == 'function')
      callback(fieldConfig)
  })
}

//Automatically stopped after 1 minute
//setTimeout( () => process.exit(), 60 * 1000)
