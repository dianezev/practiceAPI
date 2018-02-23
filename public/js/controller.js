/****************************************************
 * Notes on controller.js: 
 * All of these methods call other methods in BOTH model.js
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

    
    
    // Public functions here
    
    // Add a new task
    addTask: function(data) {
      console.log('add');
    },
    
    // Delete a task
    deleteTask: function(data) {
      console.log('del');
    },

    // Edit a task
    editTask: function(data) {
      console.log('edit');
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
    toggleStatus: function(data) {
      console.log('toggle');
    },

    
    
    
    // TBD: Settings options
    
//    // Called when user changes date selector
//    changeDate: function(date) {
//      model.changeDate(date, function (categSubtotals) {
//        console.log('model.changeDate returned date: ' + date + ' and categSubtotals:');
//        console.log(categSubtotals);
//
//        // Show actual & budget detail for user
//        view.setDate(date);
//        view.refreshDetail(categSubtotals.actual, "actual");
//        view.refreshDetail(categSubtotals.budget, "budget");
//        view.refreshSummary(categSubtotals);
//      });      
//    },
//    
//    // Set dates in date selectors and initialize data arrays (empty)
//    initialize: function() {
//      model.getData(function(data) {
//        console.log(data);
////        view.fillDateRg(dateArray);
////        view.setDate(date);
//      });
//    },
//    
//    
//    // Called when user submits expense data
//    sendExpense: function(dtype) {
//      var id = '#m_' + dtype;
//      var subCode = $(id + ' .entry select').val();
//      var date = $(id + ' input.dateOpt').val();
//      var amt = parseFloat($('#amt_' + dtype).val()).toFixed(2);
//      var detail = $('#det_' + dtype).val();
//      var expenseData = {subCode, date, amt, detail, dtype};
//      
//      // If amount entered is invalid, alert user
//      if ((amt === "NaN") || (amt === "0.00")) {
//        view.userMsg("The amount is not valid. Please try again.");
//        view.clearEntry();
//      
//      // Otherwise submit expense data
//      } else {
//      
//        model.sendExpense(expenseData, function (result) {
//          // maybe improve later: instead of getExpenses, could just add a new object to the actual or budget array, then recalc subtotals, etc.
//
//          model.getData(dtype, function (categSubtotals) {
//            view.clearEntry();
//            view.refreshDetail(categSubtotals[dtype], dtype);
//            view.refreshSummary(categSubtotals);
//          });
//        });
//      }
//    }    
  };
  return publicAPI;
})();