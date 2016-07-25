"use strict"

const mysql = require('mysql')
const config = require('../routes-server/sequelize/config/config')
const aws = require('aws-sdk')
aws.config.update({
  region: "ap-sgp-1",
  endpoint: "http://localhost:8000"
});
const helper = require('./helper')

let dynamodb = new aws.DynamoDB()

/*
  Mysql Pool Connection
*/
let pool = mysql.createConnection({
  connectionLimit : 100,
  user : config.username,
  password : config.password,
  host : config.host,
  database : config.database
});

var unique = (fieldName, fieldValue, tableName) => {

}


pool.query("Select ds.name, m.deduplicationLogic,  mds.objectName, mds.codeReferences, mds.dataSourceId, mds.migrationId from Migration m  inner join MigrationDataSource mds on m.id = mds.migrationId " +
            " INNER JOIN DataSource ds on ds.Id = mds.dataSourceId " +
                "Where m.status = 'processing' ", (err, result) => {
                  if(err) console.log(err)
  let config = {}
  for(let x in result)
  {
    config[`${result[x].codeReferences}`] = {
      objectName : result[x].objectName,
      tableName : `dm_${result[x].migrationId}_${result[x].name}_${result[x].objectName}`
    }
  }
  getField(result[0].migrationId, config)
})

function getField(migrationId, config){
    pool.query("Select * from MigrationDataSourceField where migrationId = " + migrationId, (err, result) => {
      console.log(result)
    })
}
