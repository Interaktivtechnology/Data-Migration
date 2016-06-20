import path from 'path'
import Express from 'express'
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import counterApp from './counter'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import routes from './react-view/routes'


import session from 'express-session'
import bodyParser from 'body-parser'
import logger from 'morgan'
import compression from 'compression'
import csrf from 'csurf'
import cookieParser from 'cookie-parser'

const RedisStore = require('connect-redis')(session)

const app = Express()
const port = 4000

// This is fired every time the server side receives a request

app.use(logger('dev'));
app.use(compression());

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'interaktiv-swift' ,
  cookie: {
    path: '/',
    maxAge: 30 * 60 * 1000, //30 Minutes
    signed: false
  },
  store : new RedisStore({
    host : 'localhost',
    port : 6379,
    prefix : 'dmswift_'
  })
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');
//app.use(multer());
app.use(Express.static(path.join(__dirname, '../public')));

app.use(cookieParser())
app.use(csrf({ cookie: true }))


// CSRF error handler
app.use(function (err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN') return next(err)

    // handle CSRF token errors here
    res
    .status(403)
    .send({
        message : "Forbidden, Bad CSRF",
        ok : false
    })
  })
app.use("*", (req, res, next) => {
  next()
})
//Login Page Routes
app.get('/login', (req, res) => {
  res.status(304).render('login')

})
//Authentication Page
app.use('/auth', require('./routes-server/auth'))

app.use("/api", (req, res, next) => {
  if(req.session.user)
    next()
  else {
    res.status(403).send({
      ok : false,
      message : "Forbidden, Please login."
    })
  }
}, require('./routes-server'))
app.get("/meta", (req, res) => {
  res.status(200).send(require('../meta-data.json'))
})
app.get('*', function(req, res) {
  if(req.session.user == undefined)
    res.redirect("/auth/login")
  // Note that req.url here should be the full URL path from
  // the original request, including the query string.
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      var reactString =  renderToString(<RouterContext {...renderProps} />)
      res.status(200).render('index', {
        reactString :reactString,
        csrfToken: req.csrfToken()
      })
    } else {
      res.status(404).send('Not found')
    }
  })
})

var server = app.listen(port)


module.exports = server
