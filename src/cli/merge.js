"use strict"
let memoryUsage = process.memoryUsage()
const mysql = require('mysql')
const config = require('../routes-server/sequelize/config/config')
const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/DataMigration';
const Db = require('mongodb').Db,
    Server = require('mongodb').Server,
    helper = require('./helper-mongo')
const util = require('util')
const report = {}

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

        config.ds1.collection.find().count((err, ds1Length)=>{
          let cursorDs1 = newConfig.ds1.collection.find({})
          helper.asyncLoop({
            length : ds1Length,
            functionToLoop : function(loop, i){
                cursorDs1.nextObject((err, item) => {
                  if(item != null){
                    let filter = newConfig.ds2.objectName == 'Contact' ? {
                      Email :
                      { $regex : `/${helper.getFirstWord(item.Email)}/` }
                    } : {
                      Name : new RegExp(`\.*${ClearAllWhiteSpace(helper.getFirstWord(item.Name.toLowerCase()))}*\.`, 'ig')
                    }
                    newConfig.ds2.collection.find(filter).toArray((err, result) => {
                      console.log("Filter : ", filter.Name)
                        if(result.length > 0)
                        {
                          for(let x in result)
                          {
                            let ds1 = item, ds2 = result[x], isEqual

                            eval("isEqual = " + newConfig.ds1.deduplicationLogic)

                            console.log(ClearAllWhiteSpace(ds1.Name), '-', ClearAllWhiteSpace(ds2.Name), isEqual)
                            if(isEqual)
                            {
                              let newData = {}
                              newData.Id = ds2.Id
                              newData._id = ds2.Id
                              newData.status = "merged"
                              newData.RefId = ds1.Id
                              newData.attributes = ds2.attributes
                              newData.Owner = ds2.Owner
                              config['ds1'].fields.map((object, key) => {
                                newData[object.fieldName] = ds1[object.fieldName]
                              })
                              config['ds2'].fields.map((object, key) => {
                                newData[object.fieldName] = ds2[object.fieldName]
                              })
                              newData.OldData = {
                                ds1 : ds1,
                                ds2 : ds2
                              }
                              mergedCollection.insert(newData)
                              newData = null
                            }
                          }
                        }
                        loop()

                    })
                  }
                  else loop()
                })
             },
             callback : function(){
                 console.log('All done!');
             }
          })
        })
      })
    })

  })
})

function compare(ds1, ds2, mergeCollection, config)
{
  console.log(`Data Source ds1 length ${ds1.length}`)
  console.log(`Data Source ds2 length ${ds2.length}`)
  report.dataLength = {}
  report.dataLength[`${config['ds1'].dsName}`] = ds1.length
  report.dataLength[`${config['ds2'].dsName}`] = ds2.length
  let mergedData = {}, unMergedData = {}

  //UnMerged Data from Data Source 2
  report.existing = 0

  for(let y in ds2)
  {
    let newData = HandleUnMergeObject(config, ds2[y])
    newData._id = newData.Id = ds2[y].Id
    newData.status = "Existing"
    newData.attributes = ds2[y].attributes
    newData['Owner'] = ds2[y].Owner
    newData.OldData = {
      ds2 : ds2[y]
    }
    unMergedData[ds2[y].Id] = newData
  }

  //UnMerged Data from Data Source 1
  report.new = 0
  for(let x in ds1)
  {
    let newData = HandleUnMergeObject(config, ds1[x])
    newData.RefId = ds1[x].Id
    newData.status = "New"
    newData.attributes = ds1[x].attributes
    newData.OldData = {
      ds1 : ds1[x]
    }
    newData['Owner'] = ds1[x].Owner
    unMergedData[ds1[x].Id] = newData

  }

  //Detect the merge
  report.merged  = 0
  console.log("Merging...")
  for(let y in ds2){
    for(let x in ds1){
      if(ClearAllWhiteSpace(ds1[x].Name) == ClearAllWhiteSpace(ds2[y].Name))
      {
        let newData = {}
        let requiredField = {
          ds1 : [],
          ds2 : []
        }
        newData.Id = ds2[y].Id
        newData._id = ds2[y].Id
        newData.status = "merged"
        newData.RefId = ds1[x].Id
        newData.attributes = ds2[y].attributes
        newData.Owner = ds2[y].Owner
        config['ds1'].fields.map((object, key) => {
          newData[object.fieldName] = ds1[x][object.fieldName]
        })
        config['ds2'].fields.map((object, key) => {
          newData[object.fieldName] = ds2[y][object.fieldName]
        })
        newData.OldData = {
          ds1 : ds1[x],
          ds2 : ds2[y]
        }
        mergedData[newData.Id] = newData

        delete unMergedData[newData.Id]
        delete unMergedData[newData.RefId]
        report.merged ++
      }
    }
  }

  report.unMergedData = Object.keys(unMergedData).length
  report.new = ds1.length - report.merged
  report.existing = ds2.length - report.merged

  memoryUsage = process.memoryUsage()

  Object.assign(mergedData, unMergedData)
  unMergedData = null

  let i = 0
  for(let z in mergedData)
  {
    mergeCollection.insert(mergedData[z], (err, result) => {
      if(Object.keys(mergedData).length - 1 == i ){
        memoryUsage = (memoryUsage.rss + memoryUsage.heapTotal + memoryUsage.heapUsed)/(1024*1024)
        let sql = "UPDATE Migration SET ? Where Id = '" + config.ds1.migrationId+ "'"
        let params = {
          status : 'done',
          merged : report.merged,
          conflict : 0,
          existing : report.existing,
          new : report.new,
        }
        var query = mysql.format(sql, params)
        pool.query(query, (err, res) => {
          console.log(report)
          console.log("Memory Usage After :" , memoryUsage.toFixed(2), "MB")
          process.exit()
        })
      }
      i++
    })
  }

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
setTimeout( () => process.exit(), 60 * 1000)
