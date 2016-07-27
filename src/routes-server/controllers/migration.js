const models = require('../sequelize/models')
const mysql = require('mysql')
const AWS = require('aws-sdk')
import jsforce from 'jsforce'
const {mongodb, mysqldb} = require('../sequelize/config/mongo')

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
          conn.describe(req.params.objectName, (err, metadata) => {
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

export function create(req, res, next)
{
  if(req.session.user.isAdministrator)
  {
    let object = {
      type : 'salesforce',
      lastModifiedById : req.session.user.id,
      status : 'draft'
    }
    Object.assign(object, req.body.mergeConfig)

    models.Migration.hasMany(models.MigrationDataSource)
    models.MigrationDataSource.hasMany(models.MigrationDataSourceField)

    if(req.method == 'POST'){
      object.createdById = req.session.user.id

      models.Migration.create(object,
        {
          include : models.MigrationDataSource
        }).then((result) => {
          console.log(object)
          for(let x = 0; x < object.MigrationDataSource.length ; x++)
            object.MigrationDataSource[x].migrationId = result.id

          for(let x = 0; x<object.MigrationDataSourceField.length; x++)
            object.MigrationDataSourceField[x].migrationId = result.id

          console.log(object)

          models.MigrationDataSource.bulkCreate(object.MigrationDataSource).then((result) => {
            models.MigrationDataSourceField.bulkCreate(object.MigrationDataSourceField).then((result) => {
              res.status(200).send({message : "Global merge created.", ok : true, result : result})
            }).catch((err) => {
              console.log(err)
            })

          }).catch((err) => {
            console.log(err)
          })

      }).catch((err) => {
        console.log(err)
        res.status(500).send({message: err, ok : false})
      })
    }
  }
  else {
    res.status(403).send({message: "Forbidden, Only administrator can do this.", ok : false})
  }
}

export function list(req, res, next)
{
  models.Migration.findAll({
    limit : [req.query.offset ? req.query.offset : 0, req.query.limit ? req.query.limit : 10]
  }).then((result) => {
    res.status(200).send({message : "Listed", ok : true, result : result})
  }).catch((err) => {
    res.status(500).send({message: err, ok : false})
  })
}
export function listOne(req, res, next)
{
  models.Migration.findOne({
    where : {
      id : req.params.id
    }
  }).then((result) => {
    res.status(200).send({message : "Listed", ok : true, result : result})
  }).catch((err) => {
    res.status(500).send({message: err, ok : false})
  })
}

export function deleteObj(req, res, next)
{
  models.Migration.findOne({
    where : {
      id : req.params.id
    }
  }).then((result) => {
    result.destroy().then((result1) => {
      res.status(200).send({
        message : "Deleted.",
        ok : true
      })
    })
  })
  .catch((err) => {
    res.status(500).send({message: err, ok : false})
  })
}

export function updateStatus(req, res, next)
{
  models.Migration.findOne({
    where : {
      id : req.params.id
    }
  }).then((result) => {

    result.update({status : req.body.status}).then((update) => {
      res.status(200).send({
        message : "Deleted.",
        ok : true,
        result : update
      })
    }).catch((err) => {
      console.log(err)
      res.status(500).send({message: err, ok : false})
    })
  }).catch((err) => {
    console.log(err)
    res.status(500).send({message: "Object not found", ok : false})
  })
}

export function listMerged(req, res, next)
{
  mongodb.open((err, db) => {
    let dm = db.collection(`dm_${req.params.id}_merged`)
    dm.find().skip(req.params.page ? req.params.page * 20 : 0 ).limit(20).toArray((err, result) => {
      let response = {message : "Data migration listed.", ok: true, result : result, pageSize : ''}
      dm.count((err, pageSize) => {
        response.pageSize = Math.round(pageSize / 20)
        res.status(200).send(response)
        //mongodb.close()
      })
    })
  })
}
