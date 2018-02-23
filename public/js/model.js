/****************************************************
 * Notes on model.js: 
 *
 * Model.js manages data (and view.js updates the DOM).
 *
 * Most of these methods use AJAX calls to get or
 * modify database data. Note that the 'cb' parameter
 * is the callback function - which calls methods
 * in view.js to update the DOM if the AJAX call succeeds.
 *
 * These methods are called by controller.js.
 ****************************************************/

SS = window.SS || {};

SS.model = (function() {
  'use strict';
  
//  // Private vars here
//  //var actSubtotals;
//  //var budSubtotals;
//  var subtotals = [];
//  
//  var dateReset = ''  
//  var date = ''; // initialized to current year & mo but user can change
//  
//  var categSel = 0; // def to 1st category; changes with submenu selection
//  var user = {email: '', name: '', e:'', v:'', userId: ''};
//  var bud;
//  var act;
//
//  // Private functions here
//  
//  
//  function getDateRg() {
//
//    // Use today's date to generate date selector
//    var today = new Date();
//    var mo = today.getMonth() + 1;
//    var cur_year = today.getFullYear();
//
//    mo = mo > 9 ? mo : '0' + mo;  
//
//    // Set date (for selector) to current year & mo and
//    date = cur_year + '-' + mo;
//    dateReset =  cur_year + '-' + mo;
//
//    var months = [{name: 'January', idx: '01'},
//                  {name: 'February', idx: '02'},
//                  {name: 'March', idx: '03'},
//                  {name: 'April', idx: '04'},
//                  {name: 'May', idx: '05'},
//                  {name: 'June', idx: '06'},
//                  {name: 'July', idx: '07'},
//                  {name: 'August', idx: '08'},
//                  {name: 'September', idx: '09'},
//                  {name: 'October', idx: '10'},
//                  {name: 'November', idx: '11'},
//                  {name: 'December', idx: '12'}
//                 ];
//    var date_rg = [];
//    var index = 0;
//
//    for (var i = (cur_year - 1); i <= (cur_year + 1); i++) {
//      var year = i.toString();
//      date_rg[index] = {name: "FULL YEAR " +  year, code: year};
//      index++;
//
//      for (var j = 0; j <12; j++) {
//        date_rg[index] = {name: months[j].name + ' ' + year,
//                          code: year + '-' + months[j].idx};
//        index++;
//      }
//
//    }
//
//    return date_rg;
//  }
//  
//  // Returns subtotals for a specific category or sub-category
//  function getSubtotals(arr, code, name, date, showDetail) {
//    var result = {name, code, date, amt: 0};
//
//    // Filter by code/subCode & date
//    var data = arr.filter(
//      function(obj) {
//        return ((obj.subCode.startsWith(code)) 
//                && (obj.date.startsWith(date)));
//      }
//    );
//
//    if (showDetail) {
//      result.detail = data;
//    }
//
//    result.amt = getSum(data);
//
//    return result;  
//  }
//
//  // Returns sum of an array on the 'amt' field, to 2 decimals
//  function getSum(arr) {
//
//    return arr.reduce((a,b) => (a + parseFloat(b.amt)), 0)
//              .toFixed(2);
//  }
//
//  // Initialize data variables (actual & budget data empty)
//  function initData() {
//
//    // Initializes data array to empty
//    return [];
//
//  }
  
//  // Build column map for later reference - converts column name to column id
//  sheet.columns.forEach(function(column) {
//      columnMap[column.title] = column.id;
//  });
//
//  // Helper function to find cell in a row
//  function getCellByColumnName(row, columnName) {
//      var columnId = columnMap[columnName];
//      return row.cells.find(function(c) {
//          return (c.columnId == columnId);
//      });
//  }  
  
  var columnInfo = {tasks: {}, status: {}, dueDate: {}};
  
  // Helper function to get column indexes by title
  function getColumnInfoByTitle(columns) {

    for (var i = 0; i < columns.length ; i++) {
      let info = {index: columns[i].index, id: columns[i].id};
      console.log(columns[i].title);
      if (columns[i].title === "Tasks") {
        columnInfo.tasks = info;
      } else if (columns[i].title === "Status") {
        columnInfo.status = info;
      } else if (columns[i].title === "Due Date") {
        columnInfo.dueDate = info;
      }
    }
  }  
  
  // Public vars & functions here
  var publicAPI = {
    
    // Public vars here
//    subtotals: [],

    // Public functions here  
    getData: function(route, callback) {
      
      let reqObject = {url: route,
                  success: function(results) {
                    let resultsToDisplay = [];
                    getColumnInfoByTitle(results.columns);
                    console.log(columnInfo);
                    
                    for (var i = 0; i < results.rows.length ; i++) {
                      resultsToDisplay[i] = {};
                      resultsToDisplay[i].task = results.rows[i].cells[columnInfo.tasks.index].displayValue;
                      resultsToDisplay[i].status = results.rows[i].cells[columnInfo.status.index].displayValue;
                      resultsToDisplay[i].dueDate = results.rows[i].cells[columnInfo.dueDate.index].value;
                    }
                    console.log('success');
                    console.log(resultsToDisplay);
                    
                    callback(resultsToDisplay);
                  },
                  error: function(xhr, status, error) {
                    alert('ajax ERROR: ' + error);
                  }
                };
      
      $.ajax(reqObject);
            
      return;
    }
    
    // Calculates subtotal and detail info, 
    // based on selected date
//    calcSubtotals: function () {
//      var CAT = this.CAT;
//      var subs = [];
//
//      for (var i = 0, l = CAT.length; i < l ; i++) {  
//        subs[i] = {actual:{}, budget: {}};
//
//        // Get category totals
//        subs[i].actual = getSubtotals(act, CAT[i].code, 
//                        CAT[i].name, date, false);
//        subs[i].budget = getSubtotals(bud, CAT[i].code, 
//                        CAT[i].name, date, false);
//
//        // Get Sub-category totals:
//        subs[i].actual.sub = [];
//        subs[i].budget.sub = [];
//
//        for (var j = 0, k = CAT[i].sub.length; j < k ; j++) {
//          subs[i].actual.sub[j] = getSubtotals(act, CAT[i].sub[j].code,
//                                CAT[i].sub[j].name, date, true);
//          subs[i].budget.sub[j] = getSubtotals(bud, CAT[i].sub[j].code,
//                                CAT[i].sub[j].name, date, true);
//        }
//      }
//      console.log('FINISHING calc of SUBTOTALS and actual household subtotals are:');
//      console.log(subs[0].actual);
//      return subs;
//    },
//    
//    changeDate: function(dateSel, cb) {
//      date = dateSel;
//
//      // Update subtotals for current date
//      subtotals = this.calcSubtotals();
//      console.log('in model.changeDate and new subtotals are:');
//      console.log(subtotals);
//
//      // Callback refreshes data detail for selected date
//      cb(subtotals[categSel]);
//    },
//    
//    checkUrl: function(urlInfo, cb) {
//      console.log('in m.checkUrl and urlInfo, cb are:');
//      console.log(urlInfo);
//      console.log(cb);
//      cb = cb || function () {};
//      
//      $.ajax({
//        method: "POST",
//        data: {e: urlInfo.e, v: urlInfo.v},
//        url: "php/api/checkUrl.php",
//        success: function(result){
////          console.log('success and result is:')
////          console.log(result);
//          // Update variables if login was successful
//          if (result.hasOwnProperty('user')) {
//            user.email = result.user.email;
//            user.name = result.user.name;
//          }
//
//          cb(result);
//        },
//        error: function(xhr, status, error) {
//          alert('ajax ERROR: ' + error);
//        }
//      });        
//    },
//
//    filterData: function(index, cb) {
//      console.log('in model.filterData and subtotals[index] is:');
//      console.log(subtotals[index]);
//      categSel = index;
//      cb(subtotals[categSel]);
//    },
//    getData: function(dtype, cb) {
//      var that = this;
//      var userId = user.userId;
//
//      $.ajax({
//        method: "GET",
//        url: "php/api/v1/" + dtype + "/" + userId,
////        url: "php/api/v1/" + dtype + "/" + userId,
//        success: function(result){
//          console.log('in getData for user: ' + userId + ' type: ' + dtype + ' and result is: ');
//          console.log(result);
//
//          if (dtype === "actual") {
//            if (result !== null) {
//              act = result;
//
//            } else {
//
//              // If result is null, re-initialize variable
//              act = initData();            
//            }
//          } else if (dtype === "budget") {
//            if (result !== null) {
//              bud = result;
//
//            } else {
//
//              // If result is null, re-initialize variable
//              bud = initData();            
//            }
//          }
//          
//          // Update subtotals for current date
//          // TBD: Could pass add'l arg so it only updates based on 'dtype'
//          // instead of updating both the actual & budget
//          subtotals = that.calcSubtotals();
//
//          console.log('in model.getData and subtotals is:');
//          console.log(subtotals); /// HERE it is correct but
//
//          // Pass subtotals for current category to callback
//          cb(subtotals[categSel], date);
//        },
//        error: function () {
//          console.log('error');
//        }
//      });    
//    },
//    
//    initialize: function (cb) {
//      
//      // Get range of dates for selector and initialize 'date' to cur mo & yr
//      var date_rg = getDateRg();
//      
//      // Initialize data arrays to empty
//      act = initData();
//      bud = initData();
//      
//      // Initialize subtotals
//      subtotals = this.calcSubtotals();
//       alert('initialize called calcSubtotals');
//     
//      cb(date_rg, date);
//    },
//      
//    // If login is successful, return user info (userId, name...)
//    login: function(userInfo, cb) {
//      var email = userInfo.email;
//      var password = userInfo.password;
//      var that = this;
//      
//      // Reset date
//      date = dateReset;
//
//      cb = cb || function () {};
//
//      $.ajax({
//        method: "POST",
//        data: {email, password},
//        url: "php/api/login.php",
////        url: "https://totalfinance-api.herokuapp.com/php/api/login.php",
//        success: function(result){
//
//          // Update variables if login was successful
//          if (result.hasOwnProperty('user')) {
//            var res = {};
//            
//            user = result.user;
//            categSel = 0;
//            
//            cb({user, categSel, date});
//
//          } else {
//            console.log('error with log in');
//            cb(result);
//          }
//        },
//        error: function(xhr, status, error) {
//          alert('ajax ERROR: ' + error);
//        }
//      });      
//    },
//    logout: function() {
//      user = {email: '', name: '', e:'', v:'', userId: ''}
//      
//      // Initialize data arrays to empty
//      act = initData();
//      bud = initData();
//      
//      // Re-initialize subtotals
//      subtotals = this.calcSubtotals();
//      alert('logout called calcSubtotals');
//
//      // TBD: other db/backend processing?
//    },
//    requestReset: function(userInfo, cb) {
//      var email = userInfo.email;
//      
//      cb = cb || function () {};
//      
//      // If email format is OK...
//      $.ajax({
//        method: "POST",
//        data: {email},
//        url: "php/api/requestReset.php",
//        success: function(result){
//          console.log(result);
//          cb(result);
//        },
//        error: function(xhr, status, error) {
//          alert('ajax ERROR: ' + error);
//        }
//      });      
//    },
//    sendExpense: function(expenseData, cb) {
//      cb = cb || function () {};
//      var userId = user.userId;
//      var dtype = expenseData.dtype;
//      
//      // Add userId to expenseData obj
//      expenseData.userId = userId;
//
//      console.log('in sendExpense and expenseData obj is:');
//      console.log(expenseData);
//      
//      // TBD: continue with cb fcn when php returns updated actual or budget data
//      // need to update view
//      $.ajax({
//        method: "POST",
//        data: expenseData,
//        url: "php/api/v1/" + dtype + "/" + userId,
////        url: "php/api/v1/" + dtype + "/" + userId,
//        success: function(result){
//          console.log('success with POSTing expense data and result is:');
//          console.log(result);
//          cb(result);
//        },
//        error: function(xhr, status, error) {
//          alert('ajax ERROR: ' + error);
//        }
//      });            
//    },
//    setPassword: function(userInfo, cb) {
//      cb = cb || function () {};
//      
//      $.ajax({
//        method: "POST",
//        data: {v: userInfo.v, password: userInfo.password},
//        url: "php/api/setPassword.php",
//        success: function(result){
//          console.log('success with setPassword.php and result is:');
//          console.log(result);
//          cb(result);
//        },
//        error: function(xhr, status, error) {
//          alert('ajax ERROR: ' + error);
//        }
//      });      
//    },
//    signup: function(userInfo, cb) {
//      var email = userInfo.email;
//      var name = userInfo.name;
//      
//      cb = cb || function () {};
//      
//      // TBD: Check email format here rather than doing that in php? faster?
//      
//      // If email format is OK...
//      $.ajax({
//        method: "POST",
//        data: {email, name},
//        url: "php/api/signup.php",
//        success: function(result){
//          console.log('success with signup.php and result is:');
//          console.log(result);
//          cb(result);
//        },
//        error: function(xhr, status, error) {
//          alert('ajax ERROR: ' + error);
//        }
//      });      
//    }
  };
  return publicAPI;
})();