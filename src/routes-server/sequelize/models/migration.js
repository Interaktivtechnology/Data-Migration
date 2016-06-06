/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('migration', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    from: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    to: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    temp_table_from: {
      type: DataTypes.STRING,
      allowNull: true
    },
    temp_table_to: {
      type: DataTypes.STRING,
      allowNull: true
    },
    created_by_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    last_modified_by_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sucess_row: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    conflict_row: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: 'CURRENT_TIMESTAMP'
    },
    last_modified_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: 'CURRENT_TIMESTAMP'
    }
  }, {
    tableName: 'migration'
  });
};
