"use strict"
let mysql  = require('mysql')
let jsforce = require('jsforce')
let models = require('../routes-server/sequelize/models')
let config = require('../routes-server/sequelize/config/config')
let helper = require('./helper-mongo')
let migration = {}
let redis = require('redis'),
    client = redis.createClient();


// Define SF Connection as Global Variable
let SF_CONN = [], SF_USER = [], FIELD_LIST = []


const ARGS = process.argv.slice(2);
ARGS[1] = ARGS[1] ? ARGS[1] : 500;
ARGS[2] = ARGS[2] ? ARGS[2] : 0;


models.Migration.hasMany(models.MigrationDataSource, {
  as : 'migrationDataSource',
  foreignKey : 'migrationId'
})

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



var getFieldList = (migration, callback) =>{
  let query = "select * from MigrationDataSourceField Where migrationId = ? "
  let params = []
  params.push(migration.id)
  query = mysql.format(query, params)

  pool.query(query, (err, rows, fields) => {
    //console.log(rows)
    //process.exit()
    if(typeof callback == 'function')
      callback(rows)

  })
}


let getDataSource = (migration) =>{
  let query = helper.getMigrationDataSource(migration)

  pool.query(query, (err, mysql_rows, fields) => {
    for(let i =0 ;i < mysql_rows.length; i++)
    {
      //Define config from query
      let config = {
        username : mysql_rows[i].username,
        objectName : mysql_rows[i].objectName,
        passwordToken : mysql_rows[i].password + mysql_rows[i].token,
        loginUrl : JSON.parse(mysql_rows[i].additionalSetting).mode == "prod" ? "https://login.salesforce.com" : "https://test.salesforce.com",
        migration : migration,
        filter : mysql_rows[i].role
      }
      getFieldList(migration,  (fieldList) => {
        defineSalesforceConnection(config, mysql_rows[i].name, fieldList)
      })

    }
  })

}

models.Migration.findOne({
  where : {
    status : 'processing'
  },
  order : 'updatedAt DESC',
  limit : 1
}).then(getDataSource).catch(helper.endProcess)




function defineSalesforceConnection(config, id, fieldList){
  console.log(`Define connection for ${id} `);
  client.get(`sf_pull_${id}_accessToken`, (err, accessToken) => {
    if(!accessToken)
    {
      SF_CONN[id] = new jsforce.Connection({
        loginUrl : config.loginUrl
      })
      SF_CONN[id].login(config.username, config.passwordToken, (err, userInfo) => {
        SF_USER[id] = userInfo
        client.set(`sf_pull_${id}_accessToken`,SF_CONN[id].accessToken , redis.print)
        client.set(`sf_pull_${id}_instanceUrl`,SF_CONN[id].instanceUrl , redis.print)
        client.expireat(`sf_pull_${id}_instanceUrl`,  parseInt((+new Date)/1000) + 1800)
        client.expireat(`sf_pull_${id}_accessToken`, parseInt((+new Date)/1000) + 1800)
        process.exit()
      })
    }
    else{

      client.get(`sf_pull_${id}_instanceUrl`, (err, instanceUrl) => {
        SF_CONN[id] = new jsforce.Connection({
          instanceUrl : instanceUrl,
          accessToken : accessToken
        })
        helper.createTable(`dm_${config.migration.id}_${id}_${config.objectName}`, (data) => {
          console.log(`Table Created dm_${config.migration.id}_${id}_${config.objectName}`);
          helper.getLastModifiedDate(`dm_${config.migration.id}_${id}_${config.objectName}`, (result) =>{
            getAllData(config.objectName, id, `dm_${config.migration.id}_${id}_${config.objectName}`, config.filter, result)
          })
        })
      })
    }
    FIELD_LIST = fieldList
  })
}
function getAllData(objectName, id, tableName, filter, lastModifiedDate ){
  objectName = objectName.charAt(0).toUpperCase() + objectName.slice(1)
  SF_CONN[id].sobject(objectName).describe((err, returnVal) => {
    let soql = "SELECT ",
      additionalField = ''
    filter = `WHERE LastModifiedDate >= ${lastModifiedDate}  ${filter ? ' AND ' +  filter : ''}`

    for(let x = 0 ; x < returnVal.fields.length; x ++){
      soql += returnVal.fields[x].name + ", "
      if(returnVal.fields[x].name == 'RecordTypeId')
        additionalField += ", RecordType.Name, RecordType.Id"
      if(returnVal.fields[x].name == 'ParentId')
        additionalField += ", Parent.Name, Parent.Id"
      if(returnVal.fields[x].name == 'AccountId')
        additionalField += ", Account.Name, Account.Id"
    }

    soql = soql.substring(0, soql.length - 2)
    if(objectName != 'User'){
      additionalField += `, Owner.Name, Owner.Email`
    }

    soql += ` ${additionalField} FROM ${objectName}  ${filter} Order By LastModifiedDate LIMIT ${ARGS[1]} `
    console.log(`Executing : LIMIT ${ARGS[1]} ${ARGS[2] == 0 ? '' : ' OFFSET ' + ARGS[2]} `)
    console.log(soql)
    SF_CONN[id].query(soql, (err, sobject) =>{
      if(err) {
        console.log(err, id)
        process.exit()
      }
      else
      {
        console.log(`Insert to mongodb for ${tableName}...` )
        console.log("Total Length : " + sobject.records.length);
        if(sobject.records.length > 0)
          helper.insertToDb(tableName, sobject.records, (iterator) => {
            if(iterator == sobject.records.length) process.exit()
          })
        else{
          let migrationId = tableName.split('_')[1]
          console.log("Pulling data end here...")
        }
      }
    })
  })
}

//End the process after one minutes
setTimeout(() => { process.exit() }, 120*1000)
