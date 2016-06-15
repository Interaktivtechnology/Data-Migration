/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('MigrationDataSource', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    migrationId: {
      type: DataTypes.BIGINT,
      allowNull: false,
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
  })
}
