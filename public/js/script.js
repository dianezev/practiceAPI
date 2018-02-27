/*
 * Description: Smartsheet API...
 *
 * Developer: Diane Zevenbergen, dianezev@gmail.com
 * 
 * still to do:
 * check ES6 stuff var, let, arrow fcns...
 * maybe switch display of status toggle to be upfront
 * comments
 * delete feature
 * edit feature
 * make header fixed
 * add up arrow at bottom
 * get rid of extraneous stuff in addToDo
 * rename addToDo
 * constants
 * config /.env?
 * test invalid dates entered on smartsheet side
 *
 *
 */

// ---------------INITIALIZE--------------------//

$(document).ready(function() {
console.log('in doc ready');
  
 SS.controller.initialize();
  
  console.log(SS);

});
