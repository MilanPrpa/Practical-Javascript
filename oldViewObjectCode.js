var view = {
	/* Object responsible for things that the user sees. Takes the todos array and displays
	it to the screen. */

	displayTodos: function() {
		/* code before for loop clears 'ul' so it doesnt repeat. For loop creates li element for 
		every todo in todoList object.*/
		var todoUl = document.querySelector('ul');
		todoUl.innerHTML = '';
		
	
		for (var i = 0; i < todoList.todos.length; i++) {
			var todoLi = document.createElement('li');
			/* shortens the code using var todo */
			var todo = todoList.todos[i];
			var todoTextWithCompletion = '';

			if (todo.completed === true) {
				todoTextWithCompletion = '(X) ' + todo.todoText;
			} else {
				todoTextWithCompletion = '( ) ' + todo.todoText;
			}
			/* When the for loop runs, this will set the id of
			Li to i. It gives each Li a unique property so we
			can access as needed. */
			todoLi.id = i;
			/* textContent property sets content of the li */
			todoLi.textContent = todoTextWithCompletion;
			todoUl.appendChild(todoLi);
			 Everytime an Li is created using for loop we attach
			createDelete() method to add a delete button to Li. 
			todoLi.appendChild(this.createDeleteButton())

		}
	},
	createDeleteButton: function() {
		var deleteButton = document.createElement('button');
		deleteButton.textContent = 'DELETE';
		deleteButton.className = 'deleteButton';
		return deleteButton;
	},
	// This method helps us use a single event listener(ul in this case), it is event delegation.
	setUpEventListeners: function() {
		var todoUl = document.querySelector('ul');
		todoUl.addEventListener('click', function(event) {
	/* This area updates and deletes todo*/
	// Get element that was clicked
	var elementClicked = event.target;

	// Check if element clicked is a deleteButton. Class name finds this out.
	if( elementClicked.className === 'deleteButton') {
		// Run handlers.deleteTodo
		//parseInt function turns string into numbers 
		 handlers.deleteTodo(parseInt(elementClicked.parentNode.id));

	  }


	 });

	}
};
	// runs the deleteButton, need to put outside of object.
	view.setUpEventListeners();
