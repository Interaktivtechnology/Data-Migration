var express = require('express');
var router = express.Router();
var models = require('./sequelize/models')
var crypto = require('crypto')

//Login Page Routes
router.get('/login', (req, res) => {
  res.status(200).render('login')
})


router.post('/login', (req, res) => {
  console.log(req.body)
  var userObject = models.User.findAll({
    where : {
      email : req.body.email,
      password : crypto.createHash('md5').update(req.body.password).digest('hex')
    }
  }).then((user) => {
    res.status(200).send({
      param : req.params,
      user : user
    })
  })


})


router.get('/logout', (req, res, next) => {
  res.redirect('/auth/login')
})

module.exports = router
