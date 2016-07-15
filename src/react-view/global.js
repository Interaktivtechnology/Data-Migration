const SF_VERSION = 'v36.0'
/*
  sobject : Salesforce object, null if you want to query via soql
  request : how the request will be execute with this format
  {
    "accessToken" : Access Token to connect to salesforce,
    "url" : URL to connect,
    "method" : "GET/POST/PUT/DELETE",
    "id" : "Id Params if single row retrieved",
    "query" : "If want to pass soql request ",
    "composite" : "True if multiple row inserted"
    "bodyParams" : "If want to pass value to salesforce usually for POST/PUT"
  }
*/
export function SF_REQUEST (sobject, request, callback, erroCallback){

}
