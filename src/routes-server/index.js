
var express = require('express');
var router = express.Router();
var cache = require('express-redis-cache')();
import bodyParser from 'body-parser'
import {dsPost, dsGet, dsGetDetail, dsUpdate, dsDelete} from './controllers/datasource'
import {describeObject} from './controllers/newMigration'
//MiddleWare for GET Req

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).send({message : 'API Request Allowed', ok : true})
});


/*
  Routing to Data Source path ds/
*/
// List Data Source based on filter
router.get('/ds', dsGet)
// Create DataSource
router.post('/ds', dsPost)
router.get('/ds/:id', dsGetDetail)
router.put('/ds/:id', dsUpdate)
router.delete('/ds/:id', dsDelete)


/*
  Get Access Token from Salesforce based on parameter given
  id : DataSourceId
*/
const defaultFunc = (req, res, next) => {
  next()
}
const env = process.env.NODE_ENV || 'development'
var objectCache = cache.route({
    expire: 1800})
router.get('/migration/describe-object/:id/:objectName', objectCache, describeObject)


module.exports = router;
