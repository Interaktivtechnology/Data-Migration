/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('GlobalSetting', {
    code: {
      type: DataTypes.CHAR(5),
      allowNull: false,
      primaryKey: true
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    account: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'account',
        key: 'id'
      }
    }
  }, {
    tableName: 'GlobalSetting'
  });
};
