/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var account = sequelize.define('Account', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'Account'
  });
  //var User = require('./User')
  //account.hasMany(User(sequelize, DataTypes), {as : 'Users'})
  return account
};
