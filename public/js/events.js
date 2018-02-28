/**************************************************
 * Events
 *************************************************/

'use strict';

// Open modal in order to add a task
$('#addTodo').on('click', function(e) {
  e.preventDefault();
  SS.controller.showModal();
});

// Open modal in order to edit a task
$('#todoListDetail').on('click', '[id^="edit_"] a', function(e) {
  e.preventDefault();
  SS.controller.showModal(e.currentTarget.parentElement.id);
});

// Close modal when user cancels or clicks X
$('#inputModal button.close, #inputModal button.cancel').on('click', function(e) {
  e.preventDefault();
  SS.controller.cancelModal();
});

// Save changes for added or edited task
$('#inputModal button.save').on('click', function(e) {
  e.preventDefault();
  SS.controller.saveTodoInfo(e.target.innerText);
});

// Delete a task
$('#todoListDetail').on('click', '[id^="delete_"] a', function(e) {
  e.preventDefault();
  SS.controller.deleteTodo(e.currentTarget.parentElement.id);
});

// Change status for task
$('#todoListDetail').on('click', '[id^="status_"] a', function(e) {
  e.preventDefault();
  SS.controller.toggleStatus(e.currentTarget.parentElement.id);
});

// Scroll to top
$('#gotoTop').click(function (e) {
  e.preventDefault();
    $('html, body').animate({
        scrollTop: $('#main').offset().top
    }, 'slow');
});
