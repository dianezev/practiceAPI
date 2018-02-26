
SS = window.SS || {};

SS.template = (function() {
    'use strict';   

    // Generates HTML for one task
    var _tplTodoItem = _.template(
      '<div class="todo col-12 col-md-8">' +
        '<p><%= description %></p>' +
      '</div>' +
      '<div class="otherInfo col-12  col-md-4">' +
        '<div class="row">' +
          '<div class="dueDate col-6">' +
            '<span class="d-md-none">Due: </span><p id="<%= dueDateId %>"><%= dueDate %></p>' +
          '</div>' +
          '<div class="icons col-6">' +
            '<div class="row">' +
              '<div class="status col-4" id="<%= statusId %>" data-status="<%= status %>">' +
                '<a href="#">' +
                  '<i class="notDone far fa-square ' +
                    '<% if (status !== "not done") { %>' +
                      'd-none' +
                    '<% } %>' + 
                    '" title="Click to mark as done."></i>' +
                  '<i class="done fas fa-check-square ' +
                    '<% if (status !== "done") { %>' +
                      'd-none' +
                    '<% } %>' +   
                  '" title="Task is done. (Click to reset.)"></i>' +
                '</a>' +
              '</div>' +
              '<div class="editTodo col-4" id="<%= editId %>">' +
                '<a href="#">' +
                  '<i class="fas fa-pencil-alt" title="Edit task"></i>' +
                '</a>' +
              '</div>' +
              '<div class="delTodo col-4" id="<%= deleteId %>">' +
                '<a href="#">' +
                  '<i class="fas fa-times" title="Delete task"></i>' +
                '</a>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
  );
  
  /*
   * Get short date. (used string methods instead of Date methods 
   * to work around issue with date mismatch - 5/1 converted to 4/30...)                       */   
  function getShortDate(isoDate) {
    let shortDate = '';
    let y, m, d;
    
    if ((typeof isoDate === 'string') && (isoDate.length === 10)) {
      y = isoDate.slice(0,4);
      m = trimLeading0(isoDate.slice(5,7));
      d = trimLeading0(isoDate.slice(8));
      shortDate = (m + '/' + d + '/' + y)
    }
    
    return shortDate;

    function trimLeading0(str) {
      return (str.slice(0,1) === 0) ? str.slice(1,2) : str.slice(0,2);
    }
  }
  
  // Public API
  var publicAPI = {

      // Get all todo list detail
      getTodoListHTML: function(data) {
        let todoListHTML = '';

        for (var i = 0; i < data.length; i++) {
          todoListHTML += '<div class = "todoItem row" data-id="' + data[i].rowId + '" id="todo_' + i + '">';

          todoListHTML += _tplTodoItem({description: data[i].task, 
                                        dueDate: getShortDate(data[i].dueDate),
                                        dueDateId: ('dueDate_' + i),
                                        status: data[i].status, 
                                        statusId: ('status_' + i), 
                                        editId: ('edit_' + i), 
                                        deleteId: ('delete_' + i)});
          todoListHTML += '</div>';
        }
        return todoListHTML;            
      },

      // Get detail for NEW todo item
      getNewTodoItemHTML: function(rowInfo, i) {
        console.log(rowInfo);
        let newTodoListHTML = '';

        newTodoListHTML += '<div class = "todoItem row" data-id="' + rowInfo.rowId + '" id="todo_' + i + '">';

        newTodoListHTML += _tplTodoItem({description: rowInfo.task, 
                                      dueDate: getShortDate(rowInfo.dueDate),
                                      dueDateId: ('dueDate_' + i),
                                      status: rowInfo.status, 
                                      statusId: ('status_' + i), 
                                      editId: ('edit_' + i), 
                                      deleteId: ('delete_' + i)});
        newTodoListHTML += '</div>';

        return newTodoListHTML;            
      },

      // Get refreshed detail for an existing todo item
      getTodoItemHTML: function(rowInfo, i) {

        var todoItemHTML = _tplTodoItem({description: rowInfo.task,
                                         dueDate: getShortDate(rowInfo.dueDate),
                                         dueDateId: ('dueDate_' + i),
                                         status: rowInfo.status,
                                         statusId: ('status_' + i),
                                         editId: ('edit_' + i),
                                         deleteId: ('delete_' + i)});
        return todoItemHTML;            
      }
  };

  return publicAPI;
})();
