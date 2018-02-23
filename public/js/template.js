SS = window.SS || {};

SS.template = (function() {
    'use strict';   
  
    // Generates list of tasks
    var _tplTodoList = _.template(
      '<div class = "todoItem row" id="<%= id %>">' +
      '<div class="todo col-12 col-md-8">' +
        '<p><%= description %></p>' +
      '</div>' +
      '<div class="otherInfo col-12  col-md-4">' +
        '<div class="row">' +
          '<div class="dueDate col-6">' +
            '<p><span class="d-md-none">Due: </span><%= dueDate %></p>' +
          '</div>' +
          '<div class="icons col-6">' +
            '<div class="row">' +
              '<div class="status col-4" id="<%= statusId %>">' +
                '<a href="#">' +
                  '<i class="notDone far fa-square ' +
                    '<% if (status !== "not done") { %>' +
                      'd-none' +
                    '<% } %>' + 
                    '" title="Click if task is done."></i>' +
                  '<i class="done fas fa-check-square ' +
                    '<% if (status !== "done") { %>' +
                      'd-none' +
                    '<% } %>' +   
                  '" title="Task is done. (Click to reset.)"></i>' +
                '</a>' +
              '</div>' +
              '<div class="editTask col-4" id="<%= editId %>">' +
                '<a href="#">' +
                  '<i class="fas fa-pencil-alt" title="Edit task"></i>' +
                '</a>' +
              '</div>' +
              '<div class="delTask col-4" id="<%= deleteId %>">' +
                '<a href="#">' +
                  '<i class="fas fa-times" title="Delete task"></i>' +
                '</a>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>'
  );

  
    var publicAPI = {
            
        // Get todo list detail
        getTodoListHTML: function(data) {
          let ctr = 1;
          
          console.log('in getTodoListHTML and data is: ');
          console.log(data);
          var todoListHTML = '';
          
          for (var i = 0; i < data.length; i++) {
            todoListHTML += _tplTodoList({id: ('todo_' + i), 
                                          description: data[i].task, 
                                          dueDate: data[i].dueDate, 
                                          status: data[i].status, 
                                          statusId: ('status_' + i), 
                                          editId: ('edit_' + i), 
                                          deleteId: ('delete_' + i)});
          }
//            var m = data.sub[i].detail.length;
//
//            // Show total for a sub-category
//            todoListHTML += _tplTodoList({code: dtype + '_' + data.sub[i].code, name: data.sub[i].name, amt: data.sub[i].amt.toLocaleString()});
//            todoListHTML += '<table class="detail hide"><tbody>';
//
//            // Get detail for sub-category, if it exists
//            if (m > 0) {
//              for (var j = 0; j < m; j++) {
//                data.sub[i].detail[j].amt =             
//                      parseFloat(data.sub[i].detail[j].amt).toFixed(2).toLocaleString();
//                todoListHTML += _tplDetail(data.sub[i].detail[j]);
//              }
//
//            // Add note if no detail entered yet
//            } else {
//              todoListHTML += '<tr>' +
//                              '<td></td>' +
//                              '<td>no entries</td>' +
//                              '<td></td>' +
//                              '<td></td>' +
//                            '</tr>';
//            }
//            todoListHTML += '</tbody></table></li>';
//          }
          return todoListHTML;            
        }
          
//        // Fills detail in Budget and Actual pages
//        getDetailHTML: function(data, dtype) {
//          console.log('in getDetailHTML and ' + dtype + ' data is: ');
//          console.log(data);
//            var detailHTML = '';
//
//            /*
//             * Notes on data storage:
//             * Data entry triggers change to db
//             * php then returns new data object for actual or budget data,
//             * (whichever was changed)
//             * Saves it to model.act or model.bud objects
//             * Use cur sel date and UPDATE subtotals to reflect db change
//             * Refresh view based on new subtotals
//            */
//          
//            for (var i = 0, l = data.sub.length; i < l; i++) {
//              var m = data.sub[i].detail.length;
//
//              // Show total for a sub-category
//              detailHTML += _tplSubCat({code: dtype + '_' + data.sub[i].code, name: data.sub[i].name, amt: data.sub[i].amt.toLocaleString()});
//              detailHTML += '<table class="detail hide"><tbody>';
//              
//              // Get detail for sub-category, if it exists
//              if (m > 0) {
//                for (var j = 0; j < m; j++) {
//                  data.sub[i].detail[j].amt =             
//                        parseFloat(data.sub[i].detail[j].amt).toFixed(2).toLocaleString();
//                  detailHTML += _tplDetail(data.sub[i].detail[j]);
//                }
//                
//              // Add note if no detail entered yet
//              } else {
//                detailHTML += '<tr>' +
//                                '<td></td>' +
//                                '<td>no entries</td>' +
//                                '<td></td>' +
//                                '<td></td>' +
//                              '</tr>';
//              }
//              detailHTML += '</tbody></table></li>';
//            }
//            return detailHTML;            
//        },
//            
//        // Fills dates in date selectors
//        getDatesHTML: function(data) {
//            var datesHTML = '';
//          
//            for (var i = 0, l = data.length; i < l; i++) {
//
//              // Get html for date drop down
//              datesHTML += _tplSelectList({value: data[i].code, label: data[i].name});
//            }
//            return datesHTML;            
//        },
//      
//        // Fills subcategory list with sub-categories for current category
//        getSubCatHTML: function(data) {
//            var subCatsHTML = '';
//          
//            for (var i = 0, l = data.length; i < l; i++) {
//
//              // Get html for sub-category drop down
//              subCatsHTML += _tplSelectList({value: data[i].code, label: data[i].name});
//            }
//            return subCatsHTML;            
//        }   
    };

    return publicAPI;
})();
