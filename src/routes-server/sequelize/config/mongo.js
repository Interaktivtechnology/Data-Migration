const config = require('./config'),
  mysql = require('mysql'),
  Db = require('mongodb').Db,
  Server = require('mongodb').Server

export const mongodb = new Db('DataMigration', new Server('localhost', 27017))

export const mysqldb = mysql.createConnection({
 user : config.username,
 password : config.password,
 host : config.host,
 database : config.database
});
