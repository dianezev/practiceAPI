// Add a task
$('#addTask').on('click', function(e) {
  e.preventDefault();
  console.log(e);
  SS.controller.addTask(this.name);
});


// Edit a task
$('[id^="edit_"]').on('click', function(e) {
  console.log($(e.target).val());
  SS.controller.editTask($(e.target).val());
});


// Delete a task
$('[id^="delete_"]').on('click', function(e) {
  console.log($(e.target).val());
  SS.controller.deleteTask($(e.target).val());
});



// Change status for task
$('[id^="status_"]').on('click', function(e) {
  console.log($(e.target).val());
  SS.controller.toggleStatus($(e.target).val());
});




/****************************************************/

//$('#m_actual button, #m_budget button').on('click', function(e) {
//  e.preventDefault();
//  SS.controller.sendExpense(this.name);
//});
//
//$('footer a').on('click', function() {
//  SS.view.toTop();
//});
//
//// For drop down of detailed actual & budget data
//$('.categ').on('click', 'li', function() {
//    SS.controller.handleDetail(this.id);
//});
//
//// Change date selection
//$('[id^="date_"]').bind('change', function(e) {
//  console.log($(e.target).val());
//  SS.controller.changeDate($(e.target).val());
//});
//
