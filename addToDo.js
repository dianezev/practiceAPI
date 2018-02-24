console.log('Starting');

var config = require("./config.json");

var token = config.SMARTSHEET_ACCESS_TOKEN;

// If not specified in config file, use API token from environment variable "SMARTSHEET_ACCESS_TOKEN"
if (!token)
    token = process.env.SMARTSHEET_ACCESS_TOKEN

var sheetId = config.SHEET_ID;

var client = require('smartsheet');


///////////////////////////////////////////////////////////////////


//'use strict';

var express = require('express');
var req = require('request');


var myBody;

var port = process.env.PORT || 3001;

var bodyParser = require('body-parser');
var app = express();

// create application/json parser
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
// These vars just for practice...
var newTaskInfo = {task: "something new", status: "not done", date: "2018-05-02"};
var revisedTaskInfo = {task: "this got revised & updated", date: "2018-05-10"};

// Initialize client SDK
var ss = client.createClient({ accessToken: token, logLevel: 'info' });

app.use(bodyParser.urlencoded({
    extended: false
}));
//app.use(express.bodyParser());
app.use(bodyParser.json());


// trying to resolve body parsing
app.use(function (request, response, next) {
    // experiment with custom middleware fcn...
  console.log('running NEW body parse middleware');
  console.log(JSON.stringify(request.body, null, 2))
//  console.log(response);
    next();
});


//app.use(function (request, response, next) {
//    // experiment with custom middleware fcn...
//  console.log('running FIRST middleware & res is');
////  console.log(response);
//    next();
//});


app.use(express.static(__dirname + '/public'));

//app.use(function (request, response, next) {
//    // experiment with custom middleware fcn...
//  console.log('running middleware & res is');
////  console.log(response);
//    next();
//});
//

app.get('/todoSheet', function (request, response) {
  
    // Load entire sheet
    ss.sheets.getSheet({ id: sheetId })
    .then(function(sheet, options) {
  
        console.log('sheet');
        console.log(sheet);
        console.log('sheet.columns[1].options');
        console.log(sheet.columns[1].options);
  
        console.log("Loaded " + sheet.rows.length + " rows from sheet '" + sheet.name + "'");

        // Build column map for later reference - converts column name to column id
        sheet.columns.forEach(function(column) {
            columnMap[column.title] = column.id;
        });
      
          response.send(sheet);

  
        console.log("Done");
    })
    .catch(function(error) {
        console.log(error);
    });  
});


//LEFT OFF HERE: see https://github.com/expressjs/body-parser/blob/master/README.md

//// POST /api/users gets JSON bodies
//app.post('/todoSheet/toggleStatus', jsonParser, function (req, res) {
//  console.log('in app post');
//  console.log(req.body);
//  if (!req.body) return res.sendStatus(400)
//  // create user in req.body
//})

app.post('/todoSheet/toggleStatus', jsonParser, function (request, response) {
  console.log('in app post');
  
  // take in body.status and update row instead of get
  
//  let sheet = ss.sheets.getSheet({ id: sheetId });
  console.log('and the req body is....');
  console.log(request.body)
  let rowId = request.body.rowId;
  let status = request.body.status;
  
  
  // Update a row
  var rowToUpdate = updateStatus(rowId, columnMap, status);
  var updateInfo = {
      body: rowToUpdate,
      sheetId: sheetId
  };

  ss.sheets.updateRow(updateInfo)
      .then(function(results) {
          console.log(results);
          console.log("Row update succeeded");
    console.log(results.result[0].cells);
    
    
        response.send(results.result[0].cells);
      })
      .catch(function(error) {
          console.log(error);
      });

//        var rowToEdit = updateItem(sheet.rows[3].id, columnMap, revisedTaskInfo);
//        var editRow = {
//            body: rowToEdit,
//            sheetId: sheet.id
//        };
//
//        ss.sheets.updateRow(editRow)
  
});


app.get('/todoSheet/edit', function (request, response) {
  console.log(request.data);
  var data = request.data;
  
  // Update a row
//  var rowToEdit = updateItem(sheet.rows[3].id, columnMap, revisedTaskInfo);
  var rowToEdit = updateItem(sheet.rows[3].id, columnMap, data.value);
  var editRow = {
      body: rowToEdit,
      sheetId: sheet.id
  };

  ss.sheets.updateRow(editRow)
      .then(function(results) {
          console.log(results);
          console.log("Row update succeeded");
      })
      .catch(function(error) {
          console.log(error);
      });

  
  
});

// Note to self: request.query depends on ajax POST call specifying query string in url
//app.post('/cors', function (request, response) {
//
//    var href = request.query.href;
//    var id = request.query.id;
//    var output = request.query.output;
//        
//    var storyArray;
//    
//    var url = href + 
//            'query?id=' + id + 
//            '&output=' + output + 
//            '&apiKey=' + apiKey;
//
//    req(url, function(error, res, body) {
////        storyArray = getStories(JSON.parse(body));
//        storyArray = JSON.parse(body);
//        response.send(storyArray);        
//    });    
//});


if(!module.parent){
  app.listen(port, function(){
    console.log('Express app listening on port ' + port + '.');
  });
}




///////////////////////////////////////////////////////////////////





// Helper function to find cell in a row
function getCellByColumnName(row, columnName) {
    var columnId = columnMap[columnName];
    return row.cells.find(function(c) {
        return (c.columnId == columnId);
    });
}


// Update a row
//// Specify updated cell values
//var row = [
//  {
//    "id": "6572427401553796",
//    "cells": [
//      {
//        "columnId": 7518312134403972,
//        "value": "new value"
//      },
//      {
//        "columnId": 1888812600190852,
//        "value": "A"
//      }
//    ]
//  },
//  {
//    "id": "2068827774183300",
//    "cells": [
//      {
//        "columnId": 7518312134403972,
//        "value": "desc_updated"
//      },
//      {
//        "columnId": 1888812600190852,
//        "value": "B"
//      }
//    ]
//  }
//];
//
//// Set options
//var options = {
//  sheetId: 2068827774183300,
//  body: row
//  };
//
//// Update rows in sheet
//smartsheet.sheets.updateRow(options)
//  .then(function(updatedRows) {
//    console.log(updatedRows);
//  })
//  .catch(function(error) {
//    console.log(error);
//  });

function updateStatus(rowSource, columnMap, newStatus) {
  var row = [
    {
      "id": rowSource,
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


function updateItem(rowSource, columnMap, revisedTaskInfo) {
  var row = [
    {
      "id": rowSource,
      "cells": [
        {
          "columnId": columnMap["Task"],
          "value": revisedTaskInfo.task
        },
//        {
//          "columnId": columnMap["Status"],
//          "value": revisedTaskInfo.status
//        },
        {
          "columnId": columnMap["Due Date"],
          "value": revisedTaskInfo.date
        }
      ]
    }
  ];
  return row;
}


function addItem(columnMap, taskInfo) {
  var row = [
    {
      "toTop": true,
      "cells": [
        {
          "columnId": columnMap["Task"],
          "value": taskInfo.task
        },
        {
          "columnId": columnMap["Status"],
          "value": taskInfo.status
        },
        {
          "columnId": columnMap["Date"],
          "value": taskInfo.date
        }
      ]
    }
  ];

  return row;
}

// mark an item as done
function markAsDone(sourceRow) {
    var rowToUpdate = null;

    // Find the cell and value to evaluate
    var statusCell = getCellByColumnName(sourceRow, "Status");
    if (statusCell.displayValue == "not done") {
//        var dueDateCell = getCellByColumnName(sourceRow, "Due Date");
//        if (dueDateCell.displayValue != "0") { // Skip if already 0
//            console.log("Need to update row # " + sourceRow.rowNumber);
//
//            // Build updated row with new cell value
//            rowToUpdate = {
//                id: sourceRow.id,
//                cells: [{
//                    columnId: columnMap["Due Date"],
//                    value: 0
//                }]
//            };
//        }
            // Build updated row with new cell value
            rowToUpdate = {
                id: sourceRow.id,
                cells: [{
                    columnId: columnMap["Status"],
                    value: "done"
                }]
            };    }
    return rowToUpdate;
}


// Modified from orig smartsheet example
// This *example* looks for rows with a "Status" column marked "Complete" and sets the "Remaining" column to zero
//
// Return a new Row with updated cell values, else null to leave unchanged
function evaluateRowAndBuildUpdates(sourceRow) {
    var rowToUpdate = null;

    // Find the cell and value to evaluate
    var statusCell = getCellByColumnName(sourceRow, "Status");
    if (statusCell.displayValue == "not done") {
//        var dueDateCell = getCellByColumnName(sourceRow, "Due Date");
//        if (dueDateCell.displayValue != "0") { // Skip if already 0
            console.log("Need to update row # " + sourceRow.rowNumber);

            // Build updated row with new cell value
            rowToUpdate = {
                id: sourceRow.id,
                cells: [{
                    columnId: columnMap["Due Date"],
                    value: '2018-05-01'
                }]
            };
//        }
    }
    return rowToUpdate;
}

function loadSheet() {
console.log('in loadSheet');
  
    // Load entire sheet
    ss.sheets.getSheet({ id: sheetId })
    .then(function(sheet, options) {
  
        console.log('sheet');
        console.log(sheet);
        console.log('sheet.columns[1].options');
        console.log(sheet.columns[1].options);
  
        console.log("Loaded " + sheet.rows.length + " rows from sheet '" + sheet.name + "'");

        // Build column map for later reference - converts column name to column id
        sheet.columns.forEach(function(column) {
            columnMap[column.title] = column.id;
        });


  
        console.log("Done");
    })
    .catch(function(error) {
        console.log(error);
    });
}


//// Load entire sheet
//ss.sheets.getSheet({ id: sheetId })
//    .then(function(sheet, options) {
//  
//        console.log('sheet');
//        console.log(sheet);
//        console.log('sheet.columns[1].options');
//        console.log(sheet.columns[1].options);
//  
//        console.log("Loaded " + sheet.rows.length + " rows from sheet '" + sheet.name + "'");
//
//        // Build column map for later reference - converts column name to column id
//        sheet.columns.forEach(function(column) {
//            columnMap[column.title] = column.id;
//        });
//
//        // Accumulate rows needing update here
//        var rowsToUpdate = [];
//
//        // Evaluate each row in sheet
//        sheet.rows.forEach(function(row) {
//            var rowToUpdate = markAsDone(row);
//            if (rowToUpdate)
//                rowsToUpdate.push(rowToUpdate);
//        });
//
//        if (rowsToUpdate.length == 0) {
//            console.log("No updates required");
//        } else {
//            // Finally, write all updated cells back to Smartsheet
//            console.log("Writing " + rowsToUpdate.length + " rows back to sheet id " + sheet.id);
//
//            var updateRowArgs = {
//                body: rowsToUpdate,
//                sheetId: sheet.id
//            };
//            ss.sheets.updateRow(updateRowArgs)
//                .then(function(updatedRows) {
//                    console.log("Updated succeeded");
//                })
//                .catch(function(error) {
//                    console.log(error);
//                });
//
//        }
//
////        // Add a row
////        var addNewRows = {
////            body: addItem(columnMap, newTaskInfo),
////            sheetId: sheet.id
////        };
////        ss.sheets.addRows(addNewRows)
////            .then(function(newRows) {
////                console.log(newRows);
////                console.log("Add row succeeded");
////            })
////            .catch(function(error) {
////                console.log(error);
////            });
//  
//  
////        // Delete a row
////        var rowToDelete = {
////          sheetId: sheet.id,
////          rowId: sheet.rows[0].id
////        };
////
////        // Delete row
////        ss.sheets.deleteRow(rowToDelete)
////          .then(function(results) {
////            console.log(results);
////            console.log("Delete row succeeded");
////          })
////          .catch(function(error) {
////            console.log(error);
////          });  
//  
//        // Update a row
//        var rowToEdit = updateItem(sheet.rows[3].id, columnMap, revisedTaskInfo);
//        var editRow = {
//            body: rowToEdit,
//            sheetId: sheet.id
//        };
//
//        ss.sheets.updateRow(editRow)
//            .then(function(results) {
//                console.log(results);
//                console.log("Row update succeeded");
//            })
//            .catch(function(error) {
//                console.log(error);
//            });
//  
//  
//        console.log("Done");
//    })
//    .catch(function(error) {
//        console.log(error);
//    });