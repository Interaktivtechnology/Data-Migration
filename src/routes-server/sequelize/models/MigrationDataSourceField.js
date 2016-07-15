/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  var model =  sequelize.define('MigrationDataSourceField', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    role : {
      type : DataTypes.STRING,
      allowNull: false,
      defaultValue : 'source'
    },
    fieldName : {
      type : DataTypes.STRING,
      allowNull : false
    },
    mergedTo : {
      type : DataTypes.STRING,
      allowNull : true,
    },
    logic : {
      type : DataTypes.TEXT,
      allowNull : true
    }
  }, {
    tableName: 'MigrationDataSourceField'
  })
  var migrationDataSource = require('./MigrationDataSource')
  model.belongsTo(migrationDataSource(sequelize, DataTypes),{ as: 'Current', foreignKey: 'migrationDataSourceId', constraints: true})
  return model
}
