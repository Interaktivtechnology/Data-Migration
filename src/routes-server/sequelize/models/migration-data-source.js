/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('migration_data_source', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    migration_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'migration',
        key: 'id'
      }
    },
    data_source : {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'data_source',
        key: 'id'
      }
    },
    object_name : {
      type : DataTypes.STRING,
      allowNull : false,
    },
    role : {
      type : DataTypes.STRING,
      defaultValue: 'source'
    },
    code_references : {
      type : DataTypes.STRING,
      allowNull : false,
    }
  },
  {
    tableName: 'migration_data_source'
  })
}
