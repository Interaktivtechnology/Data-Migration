"use strict"

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert')

const url = 'mongodb://localhost:27017/DataMigration';


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
      collection.find({id: items[x].Id}).limit(1).size()
    }
    collection.insert(items, (err, result) => {
      if(err) console.log(err)
      if(typeof callback == "function")
        callback(result)
    })
  })
}

function checkIfExists(tableName, args:array)
{
  
}


module.exports = {
  endProcess : (err) =>{
    console.log(err)
    process.exit()
  },
  createTable : createTable,
  insertToDb : insertToDb,
}
