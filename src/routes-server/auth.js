var express = require('express');
var router = express.Router();
var models = require('./sequelize/models')
var crypto = require('crypto')

//Login Page Routes
router.get('/login', (req, res) => {
  if(req.session.user)
    res.redirect('/')
  else
    res.status(200).render('login')
})


router.post('/login', (req, res) => {

  var userObject = models.User.findAll({
    where : {
      email : req.body.email,
      //password : crypto.createHash('md5').update(req.body.password).digest('hex')
    }
  }).then((user) => {
    if(user.length > 0){
      console.log(user[0])
      var encryptedPassword = crypto.createHash('md5').update(req.body.password).digest('hex')
      if(encryptedPassword == user[0].password){
        const loggedUser = {
          id : user[0].id,
          fullName : user[0].fullName,
          username : user[0].username,
          email : user[0].email,
          accountId : user[0].accountId
        }
        req.session.user = user
        res.status(200).redirect('/')
      }
      else{
        res.status(400).send({
          error : "Incorrect username or password.",
          ok : false
        })
      }
    }
    else
      res.status(400).send({
        error : "Incorrect username or password.",
        ok : false
      })

  })

})


router.get('/logout', (req, res, next) => {
  req.session.destroy()
  res.redirect('/auth/login')
})

module.exports = router
