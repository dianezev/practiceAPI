
SS = window.SS || {};

SS.model = (function() {
  'use strict';
  
  let columnInfo = {tasks: {}, status: {}, dueDate: {}};
  
  // Helper function to get column indexes and ids by title
  function getColumnInfoByTitle(columns) {

    for (var i = 0; i < columns.length ; i++) {
      let info = {index: columns[i].index, id: columns[i].id};
      console.log(columns[i].title);
      if (columns[i].title === "Tasks") {
        columnInfo.tasks = info;
      } else if (columns[i].title === "Status") {
        columnInfo.status = info;
      } else if (columns[i].title === "Due Date") {
        columnInfo.dueDate = info;
      }
    }
  }  
  
  // Map cell info for one row into simple object
  function mapCellsToRow(cellInfo) {
    let info = {};
    
    for (var i = 0; i < cellInfo.length ; i++) {
      if (cellInfo[i].columnId === columnInfo.tasks.id) {
        info.task = cellInfo[i].displayValue;
      } else if (cellInfo[i].columnId === columnInfo.status.id) {
        info.status = cellInfo[i].displayValue;      
      } else if (cellInfo[i].columnId === columnInfo.dueDate.id) {
        info.dueDate = cellInfo[i].value;
      }
    }
    return info;
  }
  
  // Public API
  var publicAPI = {
    
    // Add new task
    addTodoItem: function(info, callback) {
      let rowInfo = {};
      
      let reqObject = {url: info.route,
                       data: {task: info.task, dueDate: info.dueDate, status: info.status},
                       type: 'POST',
                       success: function(rows) {
                         console.log(rows);
                         rowInfo = mapCellsToRow(rows[0].cells);                      
                         rowInfo.rowId = rows[0].id;
                         callback(rowInfo);
                        },
                        error: function(xhr, status, error) {
                          alert('ajax ERROR: ' + error);
                        }
                      };
      $.ajax(reqObject);
      
      return;
    },
    
    // Get all task info
    getData: function(route, callback) {
      
      let reqObject = {url: route,
                       success: function(results) {
                         let resultsToDisplay = [];
                         let rows = results.rows;
                         
                         getColumnInfoByTitle(results.columns);
                         
                         for (var i = 0; i < rows.length ; i++) {
                           resultsToDisplay[i] = {};
                           resultsToDisplay[i].task = rows[i].cells[columnInfo.tasks.index].displayValue;
                           resultsToDisplay[i].status = rows[i].cells[columnInfo.status.index].displayValue;
                           resultsToDisplay[i].dueDate = rows[i].cells[columnInfo.dueDate.index].value;
                           resultsToDisplay[i].rowId = rows[i].id;
                         }
                         callback(resultsToDisplay);
                       },
                       error: function(xhr, status, error) {
                         alert('ajax ERROR: ' + error);
                       }
                      };
      
      $.ajax(reqObject);
            
      return;
    },
    
    toggleStatus: function(info, callback) {
      let rowInfo = {};
      
      let reqObject = {url: info.route,
                       data: {rowId: info.rowId, status: info.status},
                       type: 'POST',
                       success: function(rows) {
                         rowInfo = mapCellsToRow(rows[0].cells);                                               
                         callback(rowInfo);
                        },
                        error: function(xhr, status, error) {
                          alert('ajax ERROR: ' + error);
                        }
                      };
      $.ajax(reqObject);
      
      return;
    }
  };
  return publicAPI;
})();