
SS = window.SS || {};

SS.controller = (function() {
  'use strict';
  
  let model = SS.model;
  let view = SS.view;
  let codes = {rowId: -1, index: -1};
  
  // Use max ctr to keep track of indexes that are used 
  // in HTML id selectors for each task. 
  // Increment when adding a task to ensure that
  // unique ids are used for each addition.
  // (Note these indexes won't be contiguous after a deletion -
  // so maxCtr doesn't nec. equal total # of tasks.)
  let maxCtr = 0;
    
  // Parses an index off of various id names ('status_5', 'edit_4' etc.)
  // and sets private var to keep track of rowId & index during edit
  function updateCodes(idName) {
    
    if (idName === '') {
      resetCodes;
    } else {
      codes.index = idName.slice(idName.indexOf('_') + 1);
      codes.rowId = $('#todo_' + codes.index)[0].dataset.id;
    }
    
    return;
  }

  function resetCodes() {
    codes.index = -1;
    codes.rowId = -1;
    
    return;
  }
  
  // Public API
  var publicAPI = {
    
    // Show modal to add or edit a task.
    // First add a 'rowId' val to info argument before calling view.showEditAddModal()
    // (if adding task, use rowId = -1; if editing task, use dataset.id to get rowId)
    showModal: function(idName) {
      (typeof idName === "undefined") ? resetCodes() : updateCodes(idName);
      view.showModal(codes.index);
    },
    
    // Close modal with Cancel
    cancelModal: function() {
      view.cancelEditModal();
    },
    
    // Delete a task
    deleteTodo: function(data) {
      console.log('del');
    },

    // Initialize data
    initialize: function() {
      model.getData('/todoSheet', function(data) {
        maxCtr = data.length;
        view.refreshTodoList(data);
      });
    },
    
    // Save changes and refresh display
    saveTodoInfo: function(btnText) {
      let info = {};
      let index;
      
      info.task = $('#taskInput').val();
      info.dueDate = $('#dueDateInput').val();
      info.status = $('#statusInput').val();
      
      if (btnText = 'Save new task') {
        console.log(info);
        index = maxCtr++;
        info.route = '/todoSheet/addTodo';

        model.addTodoItem(info, function (data) {
          view.displayNewTodoItem(data, index);
        });      
      } else if (btnText = 'Save changes') {
        // TBD
      }
    },

    // Toggle status for a task
    toggleStatus: function(statusId) {
      
      let curStatus = $('#' + statusId)[0].dataset.status;
      let newStatus = (curStatus === "not done") ? "done" : "not done";
      let info = {};
      
      updateCodes(statusId);
      info.route = '/todoSheet/toggleStatus';
      info.rowId = codes.rowId;
      info.status = newStatus;
      
      model.toggleStatus(info, function(rowInfo) {
        view.refreshStatus(rowInfo, codes.index);
      });
    }    
  };
    
  return publicAPI;
})();