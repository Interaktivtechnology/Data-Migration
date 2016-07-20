const models = require('../sequelize/models')
const AWS = require('aws-sdk')
import jsforce from 'jsforce'


export function describeObject(req, res, next)
{
  models.DataSource.findOne({
    where : {
      id : req.params.id
    }
  }).then((dbResult) => {
      if(!dbResult) res.status(500).send({ ok: false, message : "No record found"})
      var setting = JSON.parse(dbResult.additionalSetting)
      var conn = new jsforce.Connection({
        loginUrl : setting.mode == 'dev' ? 'https://test.salesforce.com' : 'https://login.salesforce.com'
      })
      conn.login(dbResult.username, dbResult.password + dbResult.token, function(err, sfResult) {
        if(err) res.status(500).send({ ok: false, message : "Login Error, please check again your password"})

        else
        {
          conn.metadata.read('CustomObject',[req.params.objectName], (err, metadata) => {
            if(err) res.status(500).send({ ok: false, message : "Describing object error", details : JSON.stringify(err)})
            res.status(200).send(
            {
              ok: true,
              message : "Object Described",
              result : metadata
            })
          })
        }

      })
  })
}

export function saveGlobalMerge(req, res, next)
{

}
