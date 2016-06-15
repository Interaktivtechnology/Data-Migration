
/* jshint indent: 2 */



module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('User', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: '0'
    },
    isAdministrator: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 'User',
    timestamps : true
  });
  var account = require('./Account')
  user.belongsTo(account(sequelize, DataTypes), {as : "account"})
  return user
};
