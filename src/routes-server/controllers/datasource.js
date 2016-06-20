var models = require('../sequelize/models')

export function dsPost(req, res, next){
  if(req.session.user.isAdministrator)
  {
    models.DataSource.create({
      lastModifiedById : req.session.user.id,
      ownerId : req.session.user.accountId,
      name : req.body.name,
      type : req.body.type,
      username : req.body.username,
      password : req.body.password,
      token : req.body.token,
      additionalSetting : req.body.additionalSetting
    }).then((result) => {
      res.status(200).send({message : "", ok : true, result : result})
    }).catch((err) => {
      res.status(500).send({message: err, ok : false})
    })
  }
  else {
    res.status(403).send({message: "Forbidden, Only administrator can do this.", ok : false})
  }
}


export function dsGet (req, res){
  models.DataSource.findAll({
    where : {ownerId  : req.session.user.accountId},
    limit : [req.query.offset ? req.query.offset : 0, req.query.limit ? req.query.limit : 10]
  }).then((result) => {
    res.status(200).send({message : "Listed", ok : true, result : result})
  })
}


export function dsGetDetail(req, res){
  models.DataSource.findAll({
    where : {ownerId  : req.session.user.accountId, id : req.params.id},
    limit : 1
  }).then((result) => {
    res.status(200).send({message : "Listed", ok : true, result : result})
  })
}


export function dsUpdate(req, res, next) {
  if(req.session.user.isAdministrator)
  {
    models.DataSource
    .findOne({where : {id : req.params.id, ownerId : req.session.user.accountId}})
    .then((result) => {
      if(result){

        var params = req.body
        result.update(
          params
        )
        .then((result) => {
          res.status(200).send({message : "Updated.", ok : true, result : result})
        })
        .catch((err) => {
          res.status(503).send({message : err, ok : false, param: param})
        })
      }
      else{
        res.status(400).send({message : "No match records.", ok : false})
      }

    })
    .catch((err) => {
      res.status(500).send({message : err, ok : false})
    })
  }
  else{
    res.status(403).send({
      message : "Forbidden, only administrator can do this",
      ok : false
    })
  }
}

export function dsDelete() {
  res.status(200).send({
    message : "Deleted.",
    ok : true
  })
}
