"use strict"

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert')

const url = 'mongodb://localhost:27017/DataMigration';
const mysql = require('mysql')

function createTable(tableName, callback)
{
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server.");
    db.createCollection(tableName, { capped : false, autoIndexID : false,} )
    if(typeof callback == "function")
    callback()
  });
}

function insertToDb(tableName, items, callback)
{
  MongoClient.connect(url, function(err, db) {
    let collection = db.collection(tableName)
    for(let x in items){
      items[x]._id = items[x].Id
      collection.insert(items[x], (err, returnedData) => {
        if(err){
          collection.update(items[x], (err, returnedData) => {
            console.log(updated)
          })
        }
        callback(x)
      })
    }
  })
}

function getLastModifiedDate(tableName, callback)
{
  MongoClient.connect(url, function(err, db) {
    let collection = db.collection(tableName)
    collection.count().then((count) => {
      collection.find({}).limit(1).skip(count - 1)
      .toArray((err, result) => {
        if(err) {
          callback("1970-01-01t00:00:00.000z")
          return
        }
        if(result.length > 0)
        {
          console.log(result[0].LastModifiedDate)
          db.close()
          callback(result[0].LastModifiedDate)
        }
        else callback("1970-01-01t00:00:00.000z")
      })

    })


  })
}


function getMigrationDataSource(migration)
{
  let query = 'SELECT objectName, role, codeReferences, ds.name, ds.type, ds.username, ds.password, ds.token, ds.additionalSetting  from MigrationDataSource mds INNER JOIN ' +
    ' DataSource ds on  mds.dataSourceId = ds.Id where mds.migrationId = ? '
  let params = []
  params.push(migration.id)
  query = mysql.format(query, params)
  return query
}

let asyncLoop = function(o){
    var i=-1;

    var loop = function(){
        i++;
        if(i==o.length){o.callback(); return;}
        o.functionToLoop(loop, i);
    }
    loop();//init
}


function getFirstWord(str) {
  if (str.indexOf(' ') === -1)
      return str;
  else
      return str.substr(0, str.indexOf(' '));
};

function UpdateOwner(OwnerName, userCollection, callback)
{
  let filter = {
    Name : new RegExp(`\.*${ClearAllWhiteSpace(helper.getFirstWord(OwnerName.toLowerCase()))}*\.`, 'ig')
  }

  userCollection.find(filter).each((err, res) => {
    if(res.Name.toLowerCase().match(/[a-zA-Z]/ig).join('') == OwnerName.toLowerCase().match(/[a-zA-Z]/ig).join(''))
      callback(res.Id)
  })
}

module.exports = {
  endProcess : (err) =>{
    console.log(err)
    process.exit()
  },
  createTable : createTable,
  insertToDb : insertToDb,
  getLastModifiedDate : getLastModifiedDate,
  getMigrationDataSource : getMigrationDataSource,
  asyncLoop : asyncLoop,
  getFirstWord : getFirstWord,
  normalizeRelation : '',
  UpdateOwner : UpdateOwner
}
