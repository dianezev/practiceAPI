
SS = window.SS || {};

SS.model = (function() {
  'use strict';
  
//  // Private vars here
//
//  // Private functions here
//  
//  
  
//  // Build column map for later reference - converts column name to column id
//  sheet.columns.forEach(function(column) {
//      columnMap[column.title] = column.id;
//  });
//
//  // Helper function to find cell in a row
//  function getCellByColumnName(row, columnName) {
//      var columnId = columnMap[columnName];
//      return row.cells.find(function(c) {
//          return (c.columnId == columnId);
//      });
//  }  
  
  var columnInfo = {tasks: {}, status: {}, dueDate: {}};
  
  // Helper function to get column indexes by title
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
  
  function mapDescriptionsToRowInfo(rowInfo) {
    let info = {};
    
    for (var i = 0; i < rowInfo.length ; i++) {
      let columnId = rowInfo[i].columnId;
      
      if (columnId === columnInfo.tasks.id) {
        info.task = rowInfo[i].displayValue;
      } else if (columnId === columnInfo.status.id) {
        info.status = rowInfo[i].displayValue;      
      } else if (columnId === columnInfo.dueDate.id) {
        info.dueDate = rowInfo[i].value;
      }
    }
    return info;
  }
  
  // Public vars & functions here
  var publicAPI = {
    
    // Public vars here
//    subtotals: [],

    // Public functions here  
    getData: function(route, callback) {
      
      let reqObject = {url: route,
                  success: function(results) {
                    let resultsToDisplay = [];
                    getColumnInfoByTitle(results.columns);
                    console.log(columnInfo);
                    
                    for (var i = 0; i < results.rows.length ; i++) {
                      resultsToDisplay[i] = {};
                      resultsToDisplay[i].task = results.rows[i].cells[columnInfo.tasks.index].displayValue;
                      resultsToDisplay[i].status = results.rows[i].cells[columnInfo.status.index].displayValue;
                      resultsToDisplay[i].dueDate = results.rows[i].cells[columnInfo.dueDate.index].value;
                      resultsToDisplay[i].rowId = results.rows[i].id;
                    }
                    console.log('success');
                    console.log(resultsToDisplay);
                    
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
      // write data - can I just write 1 row?
      // pull fresh data and either return full set or one row
      let reqObject = {url: info.route,
                  data: {rowId: info.rowId, status: info.status},
                  type: 'POST',
//                  contentType: 'application/json; charset=utf-8',
                  success: function(rowInfo) {
                    
                    let rowObj = mapDescriptionsToRowInfo(rowInfo);
                    console.log('success in model.toggleStatus');
                    console.log(rowInfo);
                    console.log(rowObj);

                    
                    
                    callback(rowObj);
                  },
                  error: function(xhr, status, error) {
                    alert('ajax ERROR: ' + error);
                  }
                };
      console.log(reqObject);
      $.ajax(reqObject);
            
      return;
    }
  };
  return publicAPI;
})();