SS = window.SS || {};

SS.view = (function() {
  'use strict';
  
  // Private vars here
  var template = SS.template;
  
  // Private functions here

  
  // Public vars & functions here
  var publicAPI = {
    
    // Public vars here
    
    
    // Close modal without saving any edits/additions
    cancelEditModal: function() {
      $('#inputModal').removeClass('show');
    },
    
    // Refresh a task after status change
    refreshStatus: function(rowObj) {
      let index = rowObj.index;
      let id = 'todo_' + index;
      
      
      var todoItemHTML = template.getTodoItemHTML(rowObj);
      console.log(id);
      console.log(todoItemHTML);
      $('#' + id).empty().append(todoItemHTML);
    },
    
    // Refresh list of all tasks
    refreshTodoList: function(data) {
      var todoListHTML = template.getTodoListHTML(data);
      $('#todoListDetail').empty().append(todoListHTML);
    },
    
    // Display modal for user add/edit
    showEditModal: function(title, todoId) {
      $('#inputModalDescrip').empty().append(title + ' a task');

      $('#taskInput').empty();
      $('#dueDateInput').empty();
      // tbd reset to not done

      // If info passed in for EDIT, get info to display 
      if (arguments.length === 2) {
        $('#taskInput').append();
        $('#dueDateInput').append();
        // tbd set status
      
      }
      
      $('#inputModal').addClass('show');
      
    }
  };
  return publicAPI;
})();