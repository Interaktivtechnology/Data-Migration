
var express = require('express');
var router = express.Router();
import bodyParser from 'body-parser'
import {dsPost, dsGet, dsGetDetail, dsUpdate, dsDelete} from './controllers/datasource'
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

module.exports = router;
