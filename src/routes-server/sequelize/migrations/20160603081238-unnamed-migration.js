'use strict';

var models = require('../models')

module.exports = {
  up: function (queryInterface, Sequelize, done ){
    models.sequelize.sync({
      force : true,
      logging : console.log
    }).then((result) => {
      done()
    })
  },

  down: function (queryInterface, Sequelize, done) {
    var query = "DROP TABLE IF EXISTS "
    for(var model in models){
      if(!model.match(/sequelize/ig))
        query += model + ", "
    }

    query = query.slice(0, -2) + ";"
    models.sequelize.query("SET FOREIGN_KEY_CHECKS = 0").then((result) => {
      models.sequelize.query(query).then((result) => {
        console.log(result)
        done()
      })
    })


  }
};
