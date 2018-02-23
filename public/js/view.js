/****************************************************
 * Notes on view.js: 
 *
 * View.js updates the DOM (and model.js manages data).
 *
 * These methods are called by some events in events.js 
 * and they're used as callback functions in controller.js.
 ****************************************************/


SS = window.SS || {};

SS.view = (function() {
  'use strict';
  
  // Private vars here
  var template = SS.template;
  
//  // Private functions here
//  
//  // Clear user data when user logs out
//  function clearData() {
//    var defText = '<br><h3>Please log in to view your expenses...</h3>'
//    
//    $('#list_actual').empty().append(defText);
//    $('#list_budget').empty().append(defText);
//  }
//  
//  // Displays message in modal window
//  function showMsg(msg) {
//      $('#userMsg p').text(msg);
//      $('#userMsg').show();
//      $('#userMsg button').focus();  
//  }
  
  
  // Public vars & functions here
  var publicAPI = {
    
//    // Public vars here
//    
//    
//
    // Public functions here
    refreshTodoList: function(data) {
      var todoListHTML = template.getTodoListHTML(data);
      $(todoListDetail).empty().append(todoListHTML);
    },

    //    animateModal: function(target) {
//      $(target).animate({height: "toggle", opacity: "toggle"}, "slow");
//    },
//    clearEntry: function() {
//      $('[id^="amt_"').val('');
//      $('[id^="det_"').val('');
//    },
//    defDate: function() {
//      var date = new Date();
//
//      $('.dateOpt').attr('value', date.getFullYear().toString() +
//                         '-' + ('0' + (date.getMonth() + 1).toString()).slice(-2) +
//                         '-' + ('0' + date.getDate().toString()).slice(-2));
//    },
//    fillDateRg: function(arr) {
//      var datesHTML = template.getDatesHTML(arr);
//
//      // If any template data returned, append
//      if (datesHTML !== '') {
//          $("[id^='date_']").empty().append(datesHTML);
//      }      
//    },
//    hideModal: function(id) {
//      $(id).hide();
//    },
//    
//    makeActiveCateg: function(i, subCodeInfo) {
//      console.log(subCodeInfo);
//      var subCategoriesHTML = template.getSubCatHTML(subCodeInfo);
//
//      // If any template data returned, append
//      if (subCategoriesHTML !== '') {
//          $("[id^='input_'] select").empty().append(subCategoriesHTML);
//      }    
//
//      // Highlight category option on submenu
//      $("[id^='s_'] a").removeClass('active');
//      $("[id^='s_'] a:nth-child(" + i + ")").addClass('active');
//    },
//    
//    // Gets subtotal info for 'Actual' and 'Budget'
//    // pages based on currently selected date & category
//    refreshDetail: function(data, dtype, date) {
//      var id = "#list_" + dtype;
//      var detailHTML = template.getDetailHTML(data, dtype);
//      
//      // Append html results & set date
//      if (detailHTML !== '') {
//        $(id).empty().append(detailHTML);
//      }
//    },
//
//    // Gets summary info
//    refreshSummary: function(data) {
//      // TBD
//    },
//    
//    setDate: function(date) {
//      $('[id^="date_"]').val(date);
//    },
//    
//    showModal: function(id) {
//      $(id).show();
//      $(id + ' button').focus();  
//    },
//    toggleDetail: function(id) {
//
//      // Toggle between displaying/hiding <table> element in a <li>
//      if ($('#' + id + ' table.detail').hasClass('hide')) {
//
//        // First hide <table> for all <li> & set pointer to RIGHT
//        $('#' + id).parent().find('.detail').addClass('hide');
//        $('#' + id).parent().find('.pointDown').addClass('hide');
//        $('#' + id).parent().find('.pointRight').removeClass('hide');
//
//        // Next disply <table> for selected <li> and set pointer to DOWN
//        $('#' + id + ' table.detail').removeClass('hide'); 
//        $('#' + id + ' .pointRight').addClass('hide');
//        $('#' + id + ' .pointDown').removeClass('hide');
//
//      // Otherwise collapse the <table> element & reset pointer to RIGHT
//      } else {
//        $('#' + id + ' table.detail').addClass('hide');
//        $('#' + id + ' .pointDown').addClass('hide');
//        $('#' + id + ' .pointRight').removeClass('hide');
//      }    
//    },
//    toggleItem: function(target) {
//      $(target).toggle();
//    },
//    togglePages: function(hash) {
//
//      // If no hash spec'd, default to start screen
//      hash = hash || '#m_home';
//
//      // TBD: streamline this
//      $('#myNavbar a').removeClass('active');
//      if (hash === '#m_settings') {
//        $('#gotoSettings').addClass('active');
//      } else if (hash === '#m_actual') {
//        $('#gotoActual').addClass('active');      
//      } else if (hash === '#m_budget') {
//        $('#gotoBudget').addClass('active');
//      } else if (hash === '#m_summary') {
//        $('#gotoSummary').addClass('active');
//      }
//      
//      $('[id^="m_"]').hide();
//      $(hash).show();
//      this.toTop();
//    },
//    toTop: function() {
//      window.scrollTo(0,0);
//    },
//    
//    // Note this is called for login & logout
//    userAcct: function(res) {
//      var name;
//      var menuItem;
//
//      $('#register').hide();
//
//      // If user chose 'Log out' result should be null
//      if (res === null) {
//        this.togglePages();
//        $('a.toLogin').text('LOG IN/SIGN UP');
//        $('#myNavbar div a:first-child').hide();
//        $('#mySidebar a:nth-child(2)').hide();
//        
//        // Clear all user data
//        clearData();
//        
//      // If user successfully signed in, update menu
//      } else if (res.hasOwnProperty('user')) {        
//        name = res.user.name.toUpperCase();
//        $('a.toLogin').text('LOG OUT');
//        $('#myNavbar div a:first-child span').text(' ' + name);
//        $('#mySidebar a:nth-child(2) span').text(' ' + name);
//        $('#myNavbar div a:first-child').show();
//        $('#mySidebar a:nth-child(2)').show();        
//      
//      // If error occurred during login, display modal window
//      } else {
//        console.log('there was an error in view.userAcct');
//      }      
//    },
//    userMsg: function(result) {
//      var msg = (result.hasOwnProperty('msg'))
//                ? result.msg
//                : (result.hasOwnProperty('err_msg')) 
//                   ? result.err_msg 
//                   : result;
//      $('#register').hide();
//      
//      showMsg(msg);
//    },
//    
//    // Note this is called with 
//    // email verification link
//    userVerify: function(result) {
//      console.log('in v.userVerify and result is:');
//      console.log(result);
//            
//      // Prompt user to create/reset password
//      if (result.hasOwnProperty('user')) {
//          $('#password_prompt').show();        
//
//      // If error occurred display msg
//      } else {
//        showMsg(result.err_msg);
//      }
//      
//    }
  };
  return publicAPI;
})();