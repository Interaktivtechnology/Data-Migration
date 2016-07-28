
var express = require('express');
var router = express.Router();
var cache = require('express-redis-cache')();
import bodyParser from 'body-parser'
import {dsPost, dsGet, dsGetDetail, dsUpdate, dsDelete} from './controllers/datasource'
import * as globalMerge from './controllers/migration'
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
router.get('/migration/describe-object/:id/:objectName', objectCache, globalMerge.describeObject)


/*
  Global merge configuration
*/

router.get('/global-merge', globalMerge.list)
router.get('/global-merge/:id', globalMerge.listOne)
router.post('/global-merge', globalMerge.create)
router.put('/global-merge/:id', globalMerge.updateStatus)
router.delete('/global-merge/:id', globalMerge.deleteObj)

router.get('/global-merge/merged/:id/:page', globalMerge.listMerged)
router.get('/global-merge/merged/detail/:migrationId/:objectId', globalMerge.detailMerged)
router.put('/global-merge/merged/detail/:migrationId/:objectId', globalMerge.detailMerged)
module.exports = router;
