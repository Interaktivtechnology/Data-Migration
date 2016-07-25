"use strict"
let aws = require('aws-sdk')
aws.config.update({
  region: "ap-sgp-1",
  endpoint: "http://localhost:8000"
});


let dynamodb = new aws.DynamoDB()


function createAWSTable(tableName, callback){
  let params  = {
    TableName : tableName,
    KeySchema: [
        { AttributeName: "Id", KeyType: "HASH"},  //Partition key
        { AttributeName: "Name", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [
        { AttributeName: "Id", AttributeType: "S" },
        { AttributeName: "Name", AttributeType: "S" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 25,
        WriteCapacityUnits: 25
    }
};
  dynamodb.describeTable({TableName: tableName}, (err, data) => {
    if(err)
    {
      dynamodb.createTable(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     {
          callback(data)
        }
      });
    }
    else {
      callback(data)
    }
  })


}

function insertToDynamoDb(tableName, items, callback) {
  var params = {
    TableName:tableName,
  };

  let docClient = new aws.DynamoDB.DocumentClient();
  console.log(`Adding new "${tableName}"`);
  for(let x = 0; x < items.length; x++){
    docClient.put({
      TableName : tableName,
      Item : items[x]
    }, function(err, data) {
      console.log(`Adding new "${items[x].Id}"`);
      if (err)
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
      else
        console.log("Added item:", JSON.stringify(data, null, 2));
      callback(data)
    });
  }
}


function listAllTables(deleteAll ){
  var params = {
    Limit: 10, // optional (to further limit the number of table names returned per page)
  };
  dynamodb.listTables(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else {
        console.log(data);
        for(let x = 0; x < data.TableNames.length; ){

              var params = {
                  TableName: data.TableNames[x],
              };

              if(deleteAll){
                dynamodb.deleteTable(params, (err, data) => {
                 console.log(data)
                })
              }
              x++

          }

      }
  });
}

function seeAllData(tableName, callback)
{
  var params = {
      TableName : tableName,
      ProjectionExpression:"MasterRecordId, Id",

  };
  dynamodb.scan(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
      console.log(data.Items[0].Id)
      if(typeof callback == "function")
        callback()
    }
  });
}






module.exports = {
  endProcess : (err) =>{
    console.log(err)
    process.exit()
  },
  createAWSTable : createAWSTable,
  insertToDynamoDb : insertToDynamoDb,
  listAllTables : listAllTables,
  seeAllData : seeAllData
}
