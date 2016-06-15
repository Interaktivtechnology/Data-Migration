/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DataSource', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    ownerId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Account',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        isAlphanumeric : true
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
      validate : {
        isOnList : function(value) {
          const list = ['Salesforce', 'MySQL', 'DynamoDb', 'CSV', 'Excel']
          if(list.indexOf(value) == -1)
            throw new Error("Only Salesforce, Mysql, CSV and Excel allowed")
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    additionalSetting: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastModifiedById: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'User',
        key: 'id'
      }
    }
  }, {
    tableName: 'DataSource',
    hooks :{
      beforeCreate : (ds, options) => {
        console.log(ds)
      }
    }
  });
};
