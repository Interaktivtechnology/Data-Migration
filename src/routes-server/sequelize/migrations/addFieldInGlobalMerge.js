'use strict';

var models = require('../models')

module.exports = {
  up: function (queryInterface, Sequelize, done ){
    var query = "ALTER TABLE `DataMigration`.`Migration` " +
    "CHANGE COLUMN `type` `type` VARCHAR(255) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NOT NULL DEFAULT 'salesforce' ,"
    "ADD COLUMN `name` VARCHAR(255) NULL AFTER `type`," +
    "ADD COLUMN `deduplicationLogic` TEXT NULL AFTER `name`," +
    "ADD COLUMN `importedRow` INT NULL AFTER `conflictRow`," +
    "ADD COLUMN `newRow` VARCHAR(45) NULL AFTER `updatedAt`;";
    models.sequelize.query(query).then((result) => {
      console.log(result)
      done()
    })
  },

  down: function (queryInterface, Sequelize, done) {

  }
};
