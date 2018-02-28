
SS = window.SS || {};

SS.view = (function() {
  'use strict';
  
  let template = SS.template;
  
  // Helper function returns ISO date from mm/dd/yyyy format
  function getISODate(date) {
    let isoDate = '';
    let d = new Date(date);
    
    if (d instanceof Date && !isNaN(d.valueOf())) {
      let month = (d.getMonth() < 9) ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
      let day = (d.getDate() < 10) ? '0' + d.getDate() : d.getDate();
      isoDate = d.getFullYear() + '-' + month + '-' + day;
    }
    return isoDate;
  }
  
  // Public API
  let publicAPI = {
    
    // Close modal without saving any edits/additions
    cancelEditModal: function() {
      $('#inputModal').removeClass('show');
    },
    
    // Refresh UI after adding task
    displayNewTodoItem: function(rowInfo, index) {
      let newTodoItemHTML = template.getNewTodoItemHTML(rowInfo, index);
      $('#todoListDetail').prepend(newTodoItemHTML);
      $('#inputModal').removeClass('show');
    },
    
    // Hide wait symbol when read/write finished
    hideLoader: function() {
      $('.loader').fadeOut('slow');
    },

    // Refresh UI after status change
    refreshStatus: function(rowInfo, index) {
      let todoItemHTML = template.getTodoItemHTML(rowInfo, index);
      $('#todo_' + index).empty().append(todoItemHTML);
    },

    // Refresh UI after editing task
    refreshTodoItem: function(rowInfo, index) {
      let todoItemHTML = template.getTodoItemHTML(rowInfo, index);
      $('#todo_' + index).empty().append(todoItemHTML);
      $('#inputModal').removeClass('show');
    },
    
    // Refresh UI for all tasks
    refreshTodoList: function(data) {
      let todoListHTML = template.getTodoListHTML(data);
      $('#todoListDetail').empty().append(todoListHTML);
      $('#header').fadeIn().removeClass('d-none');
      $('#content').fadeIn().removeClass('d-none');
      $('#footer').fadeIn().removeClass('d-none');
    },
    
    // Refresh UI after deleting task
    removeItem: function(index) {
      $('#todo_' + index).remove();
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
                dueDate: $('#dueDate_' + index).text(),
                confirmButton: 'Save changes'
               };
      }
      
      // Put task info into modal
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