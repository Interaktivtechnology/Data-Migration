"use strict"

let helper = require('./helper')
helper.listAllTables(false)
//helper.insertToDynamoDb('dm_9_SwiftProduction_account', [{id : "asdasd", name: "check"}], () => {})
helper.seeAllData('dm_9_SwiftProduction_account')
