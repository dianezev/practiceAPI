
SS = window.SS || {};

SS.model = (function() {
  'use strict';
  
  let columnInfo = {tasks: {}, status: {}, dueDate: {}};
  
  // Helper function to get column indexes and ids by title
  function getColumnInfoByTitle(columns) {

    for (let i = 0; i < columns.length ; i++) {
      let info = {index: columns[i].index, id: columns[i].id};

      switch (columns[i].title) {
        case "Tasks":
          columnInfo.tasks = info;
          break;
        case "Status":
          columnInfo.status = info;
          break;
        case "Due Date":
          columnInfo.dueDate = info;
          break;
      }
    }
  }
  
  // Helper function maps cell info for one row into object
  function mapCellsToRow(cellInfo) {
    let info = {};
    
    for (let i = 0; i < cellInfo.length ; i++) {
      
      switch (cellInfo[i].columnId) {
        case columnInfo.tasks.id:
          info.task = cellInfo[i].displayValue;
          break;
        case columnInfo.status.id:
          info.status = cellInfo[i].displayValue;
          break;
        case columnInfo.dueDate.id:
          info.dueDate = cellInfo[i].value;
          break;
      }
    }
    return info;
  }
  
  // Public API
  let publicAPI = {
    
    // Delete a task
    deleteTodoItem: function(route, rowId, callback) {
      let reqObject = {url: route,
                       data: {rowId},
                       type: 'POST',
                       success: function() {
                         callback();
                        },
                        error: function(xhr, status, error) {
                          alert('Sorry, there was an error. Your Smartsheet account cannot be ' +
                                'accessed right now so the task was not deleted. Please check ' +
                                'your connection and try again later. AJAX ERROR: ' + error);
                        }
                      };
      $.ajax(reqObject);
    },
    
    // Get all task info
    getData: function(route, callback) {
      
      let reqObject = {url: route,
                       success: function(results) {
                         let resultsToDisplay = [];
                         let rows = results.rows;
                         
                         getColumnInfoByTitle(results.columns);
                         
                         for (let i = 0; i < rows.length ; i++) {
                           resultsToDisplay[i] = {};
                           resultsToDisplay[i].task = rows[i].cells[columnInfo.tasks.index].displayValue;
                           resultsToDisplay[i].status = rows[i].cells[columnInfo.status.index].displayValue;
                           resultsToDisplay[i].dueDate = rows[i].cells[columnInfo.dueDate.index].value;
                           resultsToDisplay[i].rowId = rows[i].id;
                         }
                         callback(resultsToDisplay);
                       },
                       error: function(xhr, status, error) {
                         alert('Your Smartsheet account cannot be accessed' +
                               'right now. Please check your connection ' +
                               'and try again later. AJAX ERROR: ' + error);
                       }
                      };
      
      $.ajax(reqObject);
    },

    // Save status change for a task
    toggleStatus: function(route, info, rowId, callback) {

      let rowInfo = {};
      
      let reqObject = {url: route,
                       data: {status: info.status, rowId},
                       type: 'POST',
                       success: function(rows) {
                         rowInfo = mapCellsToRow(rows[0].cells);                                               
                         callback(rowInfo);
                        },
                        error: function(xhr, status, error) {
                          alert('Sorry, there was an error. Your Smartsheet account cannot be ' +
                                'accessed right now so the status was not be changed. Please check ' +
                                'your connection and try again later. AJAX ERROR: ' + error);
                        }
                      };
      $.ajax(reqObject);
    },
    
    /*
     * Save info for new or edited task
     * (Note that rowId is null for a new task)
     */
    updateTodoItem: function(route, info, rowId, callback) {
      let rowInfo = {};
      
      let reqObject = {url: route,
                       data: {task: info.task, dueDate: info.dueDate, status: info.status, rowId},
                       type: 'POST',
                       success: function(rows) {
                         rowInfo = mapCellsToRow(rows[0].cells);
                         rowInfo.rowId = rows[0].id;
                         callback(rowInfo);
                        },
                        error: function(xhr, status, error) {
                          alert('Sorry, there was an error. Your Smartsheet account cannot be ' +
                                'accessed right now so the task was not added or changed. Please check ' +
                                'your connection and try again later. AJAX ERROR: ' + error);
                        }
                      };
      $.ajax(reqObject);
    }
  };
  return publicAPI;
})();