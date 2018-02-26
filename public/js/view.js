
SS = window.SS || {};

SS.view = (function() {
  'use strict';
  
  var template = SS.template;
  
  function getISODate(date) {
    var isoDate = '';
    var d = new Date(date);
    var day;
    var month;
    
    if (d instanceof Date && !isNaN(d.valueOf())) {
      month = (d.getMonth() < 9) ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
      day = (d.getDate() < 10) ? '0' + d.getDate() : d.getDate();
      isoDate = d.getFullYear() + '-' + month + '-' + day;
    }
    console.log('ret ' + isoDate);
    return isoDate;
  }
  //LEFT OFF HERE: test add task with no date
  
  
  // Public API
  var publicAPI = {
    
    // Refresh UI after adding task
    displayNewTodoItem: function(rowInfo, index) {
      var newTodoItemHTML = template.getNewTodoItemHTML(rowInfo, index);
      $('#todoListDetail').prepend(newTodoItemHTML);
      $('#inputModal').removeClass('show');
    },
    
    // Close modal without saving any edits/additions
    cancelEditModal: function() {
      $('#inputModal').removeClass('show');
    },
    
    // Refresh UI after status change
    refreshStatus: function(rowInfo, index) {
      let todoItemHTML = template.getTodoItemHTML(rowInfo, index);
      $('#todo_' + index).empty().append(todoItemHTML);
    },
    
    // Refresh UI for all tasks
    refreshTodoList: function(data) {
      var todoListHTML = template.getTodoListHTML(data);
      $('#todoListDetail').empty().append(todoListHTML);
    },
    
    // Display modal for user add/edit
    showModal: function(index) {
      let info = {};
      
      // For ADD: set default fields for new task
      if (index === -1) {
        info = {title: 'Add a task', 
                task: '', 
                status: 'not done', 
                dueDate: '',
                confirmButton: 'Save new task'
               };
        
      // For EDIT: get task, due date etc from selected task
      } else {
        info = {title: 'Edit task information', 
                task: $('#todo_' + index + ' .todo p').text(), 
                status: $('#status_' + index).data('status'), 
                dueDate: $('#dueDate_' + index).text(),
                confirmButton: 'Save changes'
               };
      }
      
      // Put info into modal
      $('#inputModalDescrip').empty().append(info.title);
      $('#taskInput').empty().val(info.task);
      $('#dueDateInput').empty().val(getISODate(info.dueDate));
      $('#statusInput').val(info.status);
      $('#saveInfo').text(info.confirmButton);

      $('#inputModal').addClass('show');
    }
  };
  return publicAPI;
})();