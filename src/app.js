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



const app = Express()
const port = 3000

// This is fired every time the server side receives a request

app.use(logger('dev'));
app.use(session({ resave: true,
                  saveUninitialized: true,
                  secret: 'uwotm8' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');
//app.use(multer());
app.use(Express.static(path.join(__dirname, '../public')));


app.use("*", (req, res, next) => {
  next()
})
//Login Page Routes
app.get('/login', (req, res) => {
  res.status(304).render('login')

})
//Authentication Page
app.use('/auth', require('./routes-server/auth'))

app.use("/salesforce", require('./routes-server'))
app.get("/meta", (req, res) => {
  res.status(200).send(require('../meta-data.json'))
})
app.get('*', function(req, res) {
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
        reactString :reactString
      })
    } else {
      res.status(404).send('Not found')
    }
  })
})

app.listen(port)
