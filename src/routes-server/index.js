var express = require('express');
var router = express.Router();
var models = require('./sequelize/models')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).send({message : 'API Request Allowed', ok : true})
});

// Create DataSource
router.post('/ds', (req, res, next) => {
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
})



// List Data Source based on filter
router.get('/ds', (req, res)=>{
  models.DataSource.findAll({
    where : {ownerId  : req.session.user.accountId}
  }).then((result) => {
    res.status(200).send({message : "Listed", ok : true, result : result})
  })
})


router.put('/ds/:id', (req, res, next) => {
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
})



module.exports = router;
