"use strict";
/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var Migration = sequelize.define('Migration', {
    type : {
      type : DataTypes.STRING,
      allowNull: false,
      defaultValue : 'Sf, Sf to MySQL'
    },
    name : {
      type : DataTypes.STRING,
      allowNull: false,
    },
    deduplicationLogic : {
      type : DataTypes.TEXT,
      allowNull: true,
      defaultValue : '// No Logic'
    },

    createdById: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    lastModifiedById: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    successRow: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue : 0
    },
    conflictRow: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue : 0
    },
    importedRow: {
      type : DataTypes.INTEGER,
      allowNull : false,
      defaultValue: 0
    },
    newRow : {
      type : DataTypes.INTEGER,
      allowNull : false,
      defaultValue: 0
    },
    status : {
      type : DataTypes.STRING,
      allowNull: false,
      default : 'draft'
    },
  }, {
    tableName: 'Migration'
  });

  return Migration
};
