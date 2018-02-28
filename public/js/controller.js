SS = window.SS || {};

SS.controller = (function() {
  'use strict';
  
  let model = SS.model;
  let view = SS.view;
  
  /*
   * Use codes to access specific task for modification
   * in back-end (rowId) and DOM manipulation (index used in id selectors)
   */
  let codes = {rowId: -1, index: -1};
  
  /*
   * Use max ctr to keep track of next available indexes that 
   * can be used in HTML id selectors when adding a task. 
   * (Increment when adding a task to ensure that
   * unique ids are used for each addition,
   * but don't decrement when deleting a task.)
   */
  let maxCtr = 0;
    
  /*
   * Parses an index off of various id names ('status_5', 'edit_4' etc.)
   * and sets private var to keep track of rowId & index during edit
   */
  function updateCodes(idName) {
    
    if (idName === '') {
      resetCodes;
    } else {
      codes.index = idName.slice(idName.indexOf('_') + 1);
      codes.rowId = $('#todo_' + codes.index)[0].dataset.id;
    }
  }

  function resetCodes() {
    codes.index = -1;
    codes.rowId = -1;
  }
  
  // Public API
  let publicAPI = {
    
    // Close modal with Cancel
    cancelModal: function() {
      view.cancelEditModal();
    },
    
    // Delete a task
    deleteTodo: function(deleteId) {
      let route = '/todoSheet/delete';
      
      updateCodes(deleteId);
      
      view.showLoader(); 
      model.deleteTodoItem(route, codes.rowId, function() {
        view.removeItem(codes.index);
        view.hideLoader();
      });
    },
    
    // Initialize data for all tasks
    initialize: function() {
      view.showLoader(); 
      model.getData('/todoSheet', function(data) {
        maxCtr = data.length;
        view.refreshTodoList(data);
        view.hideLoader(); 
      });
    },
    
    // Save changes and refresh display for new or edited task
    saveTodoInfo: function(btnText) {
      let info = {};
      let route;
      
      info.task = $('#taskInput').val();
      info.dueDate = $('#dueDateInput').val();
      info.status = $('#statusInput').val();
      
      /*
       * Save data for ADD task and get a new
       * index to use in the HTML ids (since this is a new task)
       */
      if (btnText === 'Save new task') {
        codes.index = maxCtr++;
        route = '/todoSheet/add';
        
        view.showLoader(); 
        model.updateTodoItem(route, info, null, function (data) {
          view.displayNewTodoItem(data, codes.index);
          view.hideLoader(); 
        });
        
      /*
       * Save data for EDIT task. Use the rowId and index that was
       * stored to 'codes' when user selected edit option (see controller.showModal)
       */
      } else if (btnText === 'Save changes') {
        route = '/todoSheet/edit';
        
        view.showLoader(); 
        model.updateTodoItem(route, info, codes.rowId, function (data) {
          view.refreshTodoItem(data, codes.index);
          view.hideLoader(); 
        });
      }
    },
    
    /*
     * Show modal to add or edit a task:
     * Use private var 'codes' to keep track of codes.rowId and
     * codes.index, where index is used to reference HTML id names.
     * Reset both codes to -1 when adding a new item.
     */
    showModal: function(idName) {
      (typeof idName === "undefined") ? resetCodes() : updateCodes(idName);
      view.showModal(codes.index);
    },

    // Toggle done/not done status for a task
    toggleStatus: function(statusId) {
      
      let curStatus = $('#' + statusId)[0].dataset.status;
      let newStatus = (curStatus === "not done") ? "done" : "not done";
      let info = {status: newStatus};
      let route = '/todoSheet/toggleStatus';
      
      updateCodes(statusId);
      
      view.showLoader(); 
      model.toggleStatus(route, info, codes.rowId, function(rowInfo) {
        view.refreshStatus(rowInfo, codes.index);
        view.hideLoader();
      });
    }    
  };
    
  return publicAPI;
})();