'use strict';

var models = require('../models')

module.exports = {
  up: function (queryInterface, Sequelize, done ){
    models.sequelize.sync()
  },

  down: function (queryInterface, Sequelize) {

  }
};
