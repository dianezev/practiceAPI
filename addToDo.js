'use strict';

var config = require("./config.json");

var token = config.SMARTSHEET_ACCESS_TOKEN;

// If not specified in config file, use API token from environment variable "SMARTSHEET_ACCESS_TOKEN"
if (!token)
    token = process.env.SMARTSHEET_ACCESS_TOKEN

var sheetId = config.SHEET_ID;

var client = require('smartsheet');

var express = require('express');

var port = process.env.PORT || 3001;

var app = express();

// Create application/json parser
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()

// The API identifies columns by Id, but it's more convenient to refer to column names. Store a map here
var columnMap = {};

// Set queryParameters for `include` and pagination
var options = {
  queryParameters: {
    include: "attachments",
    includeAll: true
  }
};

// Initialize client SDK
var ss = client.createClient({ accessToken: token, logLevel: 'info' });

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(jsonParser);

app.use(express.static(__dirname + '/public'));


// Get all sheet data
app.get('/todoSheet', function (request, response) {
  
  ss.sheets.getSheet({ id: sheetId })
  .then(function(sheet, options) {

    // Build column map for later reference - 
    // converts column name to column id
    sheet.columns.forEach(function(column) {
        columnMap[column.title] = column.id;
    });

    response.send(sheet);
  })
  .catch(function(error) {
    console.log('Error while loading sheet data...');
    console.log(error);
  });  
});


// Toggle the done/not done status for a task
app.post('/todoSheet/toggleStatus', jsonParser, function (request, response) {
  let rowId = request.body.rowId;
  let status = request.body.status;

  let updateInfo = {
      body: updateStatus(rowId, columnMap, status),
      sheetId: sheetId
  };

  ss.sheets.updateRow(updateInfo)
    .then(function(results) {
      response.send(results.result);
    })
    .catch(function(error) {
      console.log('Error while changing done/not done status...');
      console.log(error);
    });
  
  // Returns status detail to be updated
  function updateStatus(rowId, columnMap, newStatus) {
    let row = [
      {
        "id": rowId,
        "cells": [
          {
            "columnId": columnMap["Status"],
            "value": newStatus
          }
        ]
      }
    ];
    return row;
  }
});


// Add a task
app.post('/todoSheet/add', jsonParser, function (request, response) {
  let task = request.body.task;
  let status = request.body.status;
  let dueDate = request.body.dueDate;

  let addNewRow = {
      body: addItem({task, status, dueDate}),
      sheetId: sheetId
  };

  ss.sheets.addRows(addNewRow)
      .then(function(results) {
          response.send(results.result);
      })
      .catch(function(error) {
        console.log('Error while adding a new task...');
        console.log(error);
      });
  
  // Returns details for task to be added
  function addItem(info) {
    let row = [
      {
        "toTop": true,
        "cells": getCellInfo(info)
      }
    ];

    return row;
  }
});


// Update info for a specific task
app.post('/todoSheet/edit', jsonParser, function (request, response) {
  let task = request.body.task;
  let status = request.body.status;
  let dueDate = request.body.dueDate;
  let rowId =  request.body.rowId;  
  
  let editRow = {
    body: updateItem({task, status, dueDate, rowId}),
    sheetId: sheetId
  };

  ss.sheets.updateRow(editRow)
    .then(function(results) {
      response.send(results.result);
    })
    .catch(function(error) {
      console.log('Error while updating task info...');
      console.log(error);
    });

  // Returns cell details for task update
  function updateItem(info) {
    let row = [
      {
        "id": info.rowId,
        "cells": getCellInfo(info)
      }
    ];
    return row;
  }  
});


// Delete a task
app.post('/todoSheet/delete', jsonParser, function (request, response) {
  let rowId =  request.body.rowId;  
  
  let rowToDelete = {
    sheetId: sheetId,
    rowId: rowId
  };

  ss.sheets.deleteRow(rowToDelete)
    .then(function(results) {
      response.send();
    })
    .catch(function(error) {
      console.log('Error while deleting a task...');
      console.log(error);
    });    
});


if(!module.parent){
  app.listen(port, function(){
    console.log('Express app listening on port ' + port + '.');
  });
}


// Called by addItem and updateItem to get 'cells' info
function getCellInfo(info) {
  let cellInfo = [{
                    "columnId": columnMap["Tasks"],
                    "value": info.task
                  },
                  {
                    "columnId": columnMap["Status"],
                    "value": info.status
                  },
                  {
                    "columnId": columnMap["Due Date"],
                    "value": info.dueDate
                  }];
  
  return cellInfo;
}
