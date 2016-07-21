"use strict";
/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  let  MigrationDataSource = sequelize.define('MigrationDataSource', {
    migrationId : {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'Migration',
        key: 'id'
      }
    },
    dataSourceId : {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'DataSource',
        key: 'id'
      }
    },
    objectName : {
      type : DataTypes.STRING,
      allowNull : false,
    },
    role : {
      type : DataTypes.STRING,
      defaultValue: 'source'
    },
    codeReferences : {
      type : DataTypes.STRING,
      allowNull : false,
    }
  },
  {
    tableName: 'MigrationDataSource'
  });
  let dataField = require("./MigrationDataSourceField")
  MigrationDataSource.hasMany(dataField(sequelize, DataTypes))
  return MigrationDataSource
}
