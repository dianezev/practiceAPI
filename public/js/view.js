
SS = window.SS || {};

SS.view = (function() {
  'use strict';
  
  let template = SS.template;
  
  /*
   * Helper function returns ISO date from mm/dd/yyyy format
   * (if invalid date, alerts user & returns '')
   */
  function getISODate(date) {
    let isoDate = '';
    let d = new Date(date);

    // If date is valid get ISO format
    if (!isNaN( d.getTime())) {
      isoDate = d.toISOString().substring(0,10);
    }
    
    return isoDate;
  }
  
  // Public API
  let publicAPI = {
    
    attachDatePicker: function() {
        $('#dueDateInput').datepicker({
            uiLibrary: 'bootstrap4'
        });    
    },
    
    // Close modal without saving any edits/additions
    cancelEditModal: function() {
      $('#inputModal').removeClass('show');
    },
    
    checkModalInputs() {
      let info = {};
      
      info.isValid = true;
      info.task = $('#taskInput').val();
      info.dueDate = getISODate($('#dueDateInput').val());
      info.status = $('#statusInput').val();

      // Alert user if task desciption is blank or & invalid date
      if (info.task.trim() === '') {
        alert('Please enter a description for the task.');
        info.isValid = false;
        
      } else if (info.dueDate === '') {
        alert('Please enter a valid date in mm/dd/yyyy format.');
        info.isValid = false;
      }
      
      return info;
    },
    
    // Refresh UI after adding task
    displayNewTodoItem: function(data, index) {
      
      // If error during add, alert user
      if (data.hasOwnProperty('err')) {
        alert(data.err);
        
      // Otherwise update UI
      } else {
        let newTodoItemHTML = template.getNewTodoItemHTML(data.rowInfo, index);
        $('#todoListDetail').prepend(newTodoItemHTML);
      }
    },
    
    // Hide wait symbol after read/write finished
    hideLoader: function() {
      $('.loader').fadeOut('slow');
    },
    
    // Hide modal
    hideModal: function() {
      $('#inputModal').removeClass('show');
    },

    // Refresh UI after status change
    refreshStatus: function(data, index) {
      
      // If error during status change, alert user
      if (data.hasOwnProperty('err')) {
        alert(data.err);
        
      // Otherwise update UI
      } else {
        let todoItemHTML = template.getTodoItemHTML(data.rowInfo, index);
        $('#todo_' + index).empty().append(todoItemHTML);
      }
    },

    // Refresh UI after editing task
    refreshTodoItem: function(data, index) {
      
      // If error during edit, alert user
      if (data.hasOwnProperty('err')) {
        alert(data.err);
        
      // Otherwise update UI
      } else {
        let todoItemHTML = template.getTodoItemHTML(data.rowInfo, index);
        $('#todo_' + index).empty().append(todoItemHTML);
      }
    },
    
    // Refresh UI for all tasks
    refreshTodoList: function(data) {
      
      // If Smartsheet call succeeded, display info
      if (data.hasOwnProperty('todoInfo')) {
        let todoListHTML = template.getTodoListHTML(data.todoInfo);
        $('#todoListDetail').empty().append(todoListHTML);
        $('#header').fadeIn().removeClass('d-none');
        $('#content').fadeIn().removeClass('d-none');
        $('#footer').fadeIn().removeClass('d-none');
        
      // Otherwise, alert user about failure
      } else {
        alert(data.err);
      }
    },
    
    // Refresh UI after deleting task
    removeItem: function(index, result) {
      
      // If error deleting task alert user
      if (result.hasOwnProperty('err')) {
        alert(result.err);
        
      // Otherwise update UI
      } else {
        $('#todo_' + index).remove();
      }
    },

    // Show wait symbol when waiting for read/write
    showLoader: function() {
      $('.loader').fadeIn('slow');
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
                dueDate: $('#dueDate_' + index + ' span.date').text(),
                confirmButton: 'Save changes'
               };
      }
      
      // Put task info into modal
      $('#inputModalDescrip').empty().append(info.title);
      $('#taskInput').empty().val(info.task);
      $('#dueDateInput').empty().val(info.dueDate);
      $('#statusInput').val(info.status);
      $('#saveInfo').text(info.confirmButton);

      $('#inputModal').addClass('show');
    }
  };
  return publicAPI;
})();