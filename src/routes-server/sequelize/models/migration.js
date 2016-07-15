/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Migration', {
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
    }
  }, {
    tableName: 'Migration'
  });
};
