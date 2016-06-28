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
  describe('#DataSource', () => {
    this.timeout(500);
    it('Should allow to use API', () => {
      agent
      .get(url + '/api/')
      .end((err, res) => {
        assert.equal(true, res.body.ok)
      })
    })

    it('Should list all DataSource ', (done) => {
      agent
      .get(url + '/api/ds')
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

    it('Should get one specific DataSource', (done) => {
      models.DataSource
      .findOne()
      .then((result) => {
        if(result)
          agent
          .get(url + '/api/ds/' + result.id)
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
    })

    it('Should create new DataSource on parameter given', (done) => {
      agent
      .post(url + '/api/ds')
      .send({
        name : "AirEnergi",
        type : "Salesforce",
        username : "airenergi@interaktiv.sg",
        password : "98502211",
        token : "",
        additionalSetting : JSON.stringify({
          mode : "dev"
        })
      })
      .end((err, res) => {
        res.body.should.have.property('result')
        should(res.status).equal(200)
        done()
      })
    })

    it('Should update DataSource based on parameter given', (done) => {
      models.DataSource
      .findOne()
      .then((result) => {
        agent
        .put(url + '/api/ds/' + result.id)
        .send({
          name : "AirEnergi2Sekali",
          username : "atan@interaktiv.sg"
        })
        .end((err, res) => {
          console.log(res.body.result)
          res.body.should.have.property('result')
          should(res.status).equal(200)
          done()
        })
      })
    })


    it('Should delete DataSource based on parameter given', (done) => {
      it('Should update DataSource based on parameter given', (done) => {
        models.DataSource
        .findOne()
        .then((result) => {
          agent
          .delete(url + '/api/ds/' + result.id)
          .send({
            name : "AirEnergi2Sekali",
            username : "atan@interaktiv.sg"
          })
          .end((err, res) => {
            console.log(res.body.result)
            res.body.should.have.property('result')
            should(res.status).equal(200)
            done()
          })
        })
      })
    })
  })
})
