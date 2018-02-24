/****************************************************
 * Notes on controller.js: 
 * All of these methods call other methods in model.js
 * (for data management) and view.js (for DOM update).
 *
 ****************************************************/

SS = window.SS || {};

SS.controller = (function() {
  'use strict';
  
  var model = SS.model;
  var view = SS.view;
    
  
  
  var publicAPI = {
    
    // Public vars here

    
    
    
    // Add a new task
    addTodo: function(data) {
      console.log('add');
      view.showEditModal('Add');
    },
    
    // Close modal with Cancel
    cancelEdit: function() {
      view.cancelEditModal();
    },
    
    // Delete a task
    deleteTodo: function(data) {
      console.log('del');
    },

    // Edit a task
    editTodo: function(data) {
      console.log('edit');
      view.showEditModal();
    },

    // Set dates in date selectors and initialize data arrays (empty)
    initialize: function() {
      console.log('init');
//      model.getData('/todoSheet');
      model.getData('/todoSheet', function(data) {
        console.log('in controller and model has returned data:');
        console.log(data);
        view.refreshTodoList(data);
      });
//      model.initialize(function(dateArray, date) {
//        view.fillDateRg(dateArray);
//        view.setDate(date);
//      });
    },
    
    // Edit a task
    toggleStatus: function(statusId) {
      
      let $status = $('#' + statusId);
      let curStatus = $status[0].dataset.status;
      let newStatus = (curStatus === "not done") ? "done" : "not done";
      let index = statusId.slice(statusId.indexOf('_') + 1);
      let todoId = 'todo_' + index;
      let rowId = $('#' + todoId)[0].dataset.id;
      
      let info = {};
      info.route = '/todoSheet/toggleStatus';
      info.rowId = rowId;
      info.status = newStatus;
      
      model.toggleStatus(info, function(rowObj) {
        view.refreshStatus({index: index, 
                            status: rowObj.status, 
                            task: rowObj.task, 
                            dueDate: rowObj.dueDate});
      });
    }

    
  };
    
  return publicAPI;
})();