/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  var model =  sequelize.define('MigrationDataSourceField', {
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
    },
    migrationId : {
      type : DataTypes.INTEGER,
      allowNull : false,
      references: {
        model: 'Migration',
        key: 'id'
      }
    }
  }, {
    tableName: 'MigrationDataSourceField'
  })
  var migrationDataSource = require('./MigrationDataSource')
  //model.belongsTo(migrationDataSource(sequelize, DataTypes),{ as: 'MigrationDataSourceField', foreignKey: 'migrationDataSourceId', constraints: true})
  return model
}
