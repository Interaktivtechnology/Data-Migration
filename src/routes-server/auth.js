var express = require('express');
var router = express.Router();



//Login Page Routes
router.get('/login', (req, res) => {
  res.status(200).render('login')
})


router.post('/login', (req, res) => {
  res.redirect('/')
})


router.get('/logout', (req, res, next) => {
  res.redirect('/auth/login')
})

module.exports = router
