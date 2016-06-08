/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('migration_data_source_field', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    migration_data_source_id : {
      type : DataTypes.BIGINT,
      allowNull : false,
      references: {
        model: 'migration_data_source',
        key: 'id'
      }
    },
    role : {
      type : DataTypes.STRING,
      allowNull: false,
      defaultValue : 'source'
    },
    field_name : {
      type : DataTypes.STRING,
      allowNull : false
    },
    merged_to : {
      type : DataTypes.STRING,
      allowNull : true,
    },
    logic : {
      type : DataTypes.TEXT,
      allowNull : true
    }
  }, {
    tableName: 'migration_data_source_row'
  })
}
