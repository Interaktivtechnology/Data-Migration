var express = require('express');
var router = express.Router();
var models = require('./sequelize/models')


//Login Page Routes
router.get('/login', (req, res) => {
  res.status(200).render('login')
})


router.post('/login', (req, res) => {

  var userObject = models.user.findAll({
    where : {}
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
