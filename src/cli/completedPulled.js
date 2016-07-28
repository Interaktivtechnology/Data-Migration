let jsforce = require('jsforce')
let models = require('../routes-server/sequelize/models')
let redis = require('redis'),
    redisClient = redis.createClient();

let SF_CONN = []
models.Migration.findOne({
  where : {
    status : 'processing'
  },
  order : 'updatedAt DESC',
  limit : 1
}).then(getDataSource).catch(helper.endProcess)


function getDataSource(migration){
  let query = helper.getMigrationDataSource(migration)

  pool.query(query, (err, mysql_rows, fields) => {
    for(let i =0 ;i < mysql_rows.length; i++)
    {
      //Define config from query
      let config = {
        objectName : mysql_rows[i].objectName,
        username : mysql_rows[i].username,
        passwordToken : mysql_rows[i].password + mysql_rows[i].token,
        loginUrl : JSON.parse(mysql_rows[i].additionalSetting).mode == "prod" ? "https://login.salesforce.com" : "https://test.salesforce.com",

      }
      redisClient.get(`sf_pull_${id}_accessToken`, (err, accessToken) => {
        if(!accessToken)
        {
          SF_CONN[i] = new jsforce.Connection({
            loginUrl : config.loginUrl
          })
          SF_CONN[i].login(config.username, config.passwordToken, (err, userInfo) => {
            
          })
        }
      })
    }
  })
}

function countData(tableName, callback)
{
  pool
}
