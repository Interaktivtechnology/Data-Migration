# Data Migration that built for AirSwift and potentially another client.

This apps customizable project that can import and export into some data store. Road to v1 will be able to import and export to:
* **Salesforce Instance**
* **CSV File**
* **JSON File**
* **MySQL**
* MongoDb
* DynamoDb


## What's include in this repository are:
* Salesforce integration
* MySQL Db
* AWS integration
* ReactJS
* GraphQL
* NodeJS
* Express


## Interfaces Requirements
Merges
* Opportunity
  * We only select the fields for Pipeline Opportunity Record Type from Air Energi
  * Recruitment Opportunity record type not required to be merged, stored it in separate table

## How to run this apps?
Server side application, need to be stored in server on top NodeJS.

### Production mode
It will create bundled js file in **public/javascripts/app.js**.
``
  npm start;
``

### Dev mode
``
  npm run dev;
  npm run devreact;
``


### Project Structure
* cert : Certification to connect to mysql if needed
* public : Public is accessible by user, usually contain image, compiled js, or css
* src : Source Code of application
 * bin : for production purpose
 * react-view: view layer of react app, you can edit the content for viewing using ReactJS Framework
 * routes : routing for front end apps using react
 * routes-server: Server routing and contain all logic to retrieve or serve data from and to server **(Server Side Scripting)**
* test : unit test code
* views : JADE template view for drawing expressjs server views


### Project Pending function
* DataSource
  * Delete
  * Test Code
* Migration
  * CRUD
  * Do Migration
  * Unit Test Code
  * Fix Conflict
    * Unit Test
* User
  * Created from Salesforce
  * Unit Test Code
