/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('migration', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    type : {
      type : DataTypes.STRING,
      allowNull: false,
      defaultValue : 'Sf, Sf to MySQL'
    },
    created_by_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    last_modified_by_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    success_row: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue : 0
    },
    conflict_row: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue : 0
    }
  }, {
    tableName: 'migration'
  });
};
