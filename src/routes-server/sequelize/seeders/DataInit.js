'use strict';
var models = require('../models')
var crypto = require('crypto')

module.exports = {
  up: function (queryInterface, Sequelize, done) {
      //models.sequelize.sync();
      var Users = models.Account.hasMany(models.User, {as : 'users'})
      models.Account.create({
        name    : "Air Energi",
        contact : "Irish Lee",
        users : [{
          username : 'irishlee',
          password : crypto.createHash('md5').update('airswift.123').digest('hex'),
          email : 'iris.lee@airswift.com',
          isActive : true,
          isAdministrator : true,
          fullName : "Irish Lee"
        },
        {
          username : 'purnomoeko',
          password : crypto.createHash('md5').update('interaktiv.123').digest('hex'),
          email : 'eko@interaktiv.sg',
          isActive : true,
          isAdministrator : true,
          fullName : "Eko Purnomo"
        }]
      }, {
        include : [Users]
      }).then((result) => {
        models.Account.findAll().then((result) => {
          console.log(result)
        })
        done()
      })


  },

  down: function (queryInterface, Sequelize, done) {

    models.sequelize.query("Delete FROM account where id > 0;").then((result) => {
      console.log(result)

      done()
    })
  }
};
