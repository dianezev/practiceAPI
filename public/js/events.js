console.log('events running');

  /**************************************************
   * Events
   *************************************************/
  // Add a task
  $('#addTodo').on('click', function(e) {
    e.preventDefault();
    SS.controller.addTodo();
  });

  // Close modal when user cancels
  $('#inputModal button.close, #inputModal button.btn-secondary').on('click', function(e) {
    e.preventDefault();
    SS.controller.cancelEdit();
  });


  // Edit a task
  $('#todoListDetail').on('click', '[id^="edit_"] a', function(e) {
    e.preventDefault();
    SS.controller.editTodo(e.currentTarget.parentElement.id);
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


