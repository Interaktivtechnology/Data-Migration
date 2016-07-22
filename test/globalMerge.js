var assert      = require('assert');
var superagent  = require('superagent')
var models      = require("../src/routes-server/sequelize/models");
var should      = require('should')
var url         = "http://localhost:4000"
//var $           = require('jquery')(require("jsdom").jsdom().parentWindow)
var csrftoken        = ''
describe("API Controller", function(){
  var user = {}, cookies
  var agent = superagent.agent()
  before((done) => {
    agent
      .get(url + '/login')
      .end((err, res) => {
        csrftoken = unescape(/_csrf=(.*?);/.exec(res.headers['set-cookie']));
        //console.log(res.headers['set-cookie'])
        auth = {email: 'eko@interaktiv.sg', password : 'interaktiv.123', _csrf: csrftoken}
        console.log(auth)
        agent
          .post(url + '/auth/login')
          .send(auth)
          .set('Accept', 'application/json')
          .end((err, res) => {
            if(err)
            {
              console.log("Error occured.")
              process.exit()
            }
            else
              user = res.body.user
            //console.log(user)
            done()
          })
      })
  })
  after((done) => {
    agent
    .get(url + '/auth/logout')
    .end((err, res) => {
      if(!err)
        done()
    })
  })

  //Data Source
  describe('Global Merge Config', () => {
    this.timeout(10000);
    it('Should allow to use API', () => {
      agent
      .get(url + '/api/')
      .end((err, res) => {
        assert.equal(true, res.body.ok)
      })
    })

    it('Should list all Global Merge Configuration ', (done) => {
      agent
      .get(url + '/api/global-merge')
      .end((err, res) => {

        res.body.should.have.property('result')
        res.body.result.should.instanceof(Array)
        if(res.body.result.length > 0){
          console.log("More than 1");
          should(res.body.result[0]).type('object')
          should(res.body.result[0].id).type('number')
        }
        done()
      })
    })

    it('Should create Global Merge Config', (done) => {
      models.DataSource
      .findAll({
        order : 'id DESC',
        limit : 2
      })
      .then((ds) => {
        //console.log(ds[0].dataValues)
        agent
        .post(url + '/api/global-merge')
        .send({
          mergeConfig : {
            name : "Global Merge Configuration for Account",
            deduplicationLogic : "UNIQUE(Name)",
            MigrationDataSource : [{
              objectName : 'account',
              dataSourceId : ds[0].dataValues.id,
              codeReferences : "ds1",
              role : "RecordType.Name = 'client'"
            },{
              objectName : 'account',
              dataSourceId : ds[1].dataValues.id,
              codeReferences : "ds2",
              role : "RecordType.Name = 'client'",
            }],
            MigrationDataSourceField : [{
              fieldName : 'id',
              mergedTo : 'id',
              logic  : "Clear Some Space",
              role : 'ds1'
            },
            {
              fieldName : 'AccountNumber',
              mergedTo : 'AccountNumber',
              logic  : "//Clear Spaces",
              role : 'ds1'
            }]
          }
        })
        .end((err, res) => {
          if(err)
            console.log(err.res.text)
            res.body.should.have.property('result')
            res.body.ok.should.equal(true)
            res.body.result.should.instanceOf(Object)
            done()
        })
      })


    })

    it('Should delete Global Merge Config', (done) => {
      models.Migration
      .findOne({
        order : 'id DESC',
        limit : 1
      })
      .then((ds) => {
      agent
        .delete(url + '/api/global-merge/' + ds.id)
        .end((err, res) => {
          if(err)
            console.log(err)

          res.body.ok.should.equal(true)
          done()
        })
      })
    })

    it('Should update Global Merge Config', (done) => {
      models.Migration
      .findOne({
        order : 'id DESC',
        limit : 1
      })
      .then((ds) => {
      agent
        .put(url + '/api/global-merge/' + ds.id)
        .send({
          status : 'processing',
          name : ds.name + ' (on process)'
        })
        .end((err, res) => {
          if(err)
            console.log(err)

          res.body.ok.should.equal(true)
          res.body.result.should.instanceOf(Object)
          done()
        })
      })
    })
  })
})
