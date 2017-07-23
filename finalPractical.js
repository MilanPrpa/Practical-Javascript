


var todoList = {

 todos: [],
 
addTodo: function(todoText) {
 	this.todos.push({
 		todoText: todoText,
 		completed: false
 	});

 },	
 
 changeTodo: function(position, todoText) {
 	this.todos[position].todoText = todoText;
 	
 },
 deleteTodo: function(position) {
 	
 	this.todos.splice(position, 1);
 	
 },
 toggleCompleted: function(position) {
 	var todo = this.todos[position];
 	todo.completed = !todo.completed;
 	
 },
 toggleAll: function() {
 	var completedTodos = 0;
 	var totalTodos = this.todos.length;

 	this.todos.forEach(function(todo) {
 		if (todo.completed === true) {
 			completedTodos ++;
 		}
 	});

 	this.todos.forEach(function(todo) {
 		if (completedTodos === totalTodos) {
 			todo.completed = false;
 		} else {
 			todo.completed = true;
 		}
 	});

 }



};


var handlers = {
	addTodo: function() {
		
		var addButtonText = document.getElementById('addButtonText');
		todoList.addTodo(addButtonText.value);
		addButtonText.value = '';
		/* This method displays addTodo to the DOM */
		view.displayTodos();
	},
	changeTodo: function() {
		var changeButtonPosition = document.getElementById('changeButtonPosition');
		var changeButtonText = document.getElementById('changeButtonText');
		todoList.changeTodo(changeButtonPosition.valueAsNumber, changeButtonText.value);
		changeButtonPosition.value = '';
		changeButtonText.value = '';
		view.displayTodos();
	},
	deleteTodo: function(position) {
		//var deleteButtonPosition = document.getElementById('deleteButtonPosition'); not needed.
		todoList.deleteTodo();
		//deleteButtonPosition.value = ''; not needed since we use setUpEventListener method.
		view.displayTodos();	
	},
	toggleCompleted: function() {
		var toggleButtonPosition = document.getElementById('toggleButtonPosition');
		todoList.toggleCompleted(toggleButtonPosition.valueAsNumber);
		toggleButtonPosition.value = '';
		view.displayTodos();
	},
	toggleAll: function() {
		
		todoList.toggleAll();
		view.displayTodos();
	},
};


var view = {
	

	displayTodos: function() {
		
		var todoUl = document.querySelector('ul');
		todoUl.innerHTML = '';
		
		todoList.todos.forEach(function(todo, position) {
			var todoLi = document.createElement('li');
			//** no longer needed, have access to i from forEach **
			//var todo = todoList.todos[i];
			var todoTextWithCompletion = '';


			if (todo.completed === true) {
				todoTextWithCompletion = '(X) ' + todo.todoText;
			} else {
				todoTextWithCompletion = '( ) ' + todo.todoText;
			}
			// i is replaced by position, forEach has a second position parameter.
			todoLi.id = position;
			todoLi.textContent = todoTextWithCompletion;
			todoUl.appendChild(todoLi);
			//Everytime an Li is created using for loop we attach
			//createDelete() method to add a delete button to Li. 
			todoLi.appendChild(this.createDeleteButton())
			// this is added to for each so createDeleteButton has access to the view object,
			//otherwise it would be inside forEach without access to view object. 
		}, this);
		
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


//**********************************************************************************

/*INTRO TO REDUCE*/
/*Reduce method reduces the element in the array to one value*/

var numbers = [1, 2, 3, 4];


// var sumSoFar = 0;
// sumSoFar = sumSoFar + 1;
// sumSoFar = sumSoFar + 2;
// sumSoFar = sumSoFar + 3;
// sumSoFar = sumSoFar + 4;


//use this adder() function to run sum so far. It is the same as work above.
function adder(sumSoFar, nextNumber) {
	return sumSoFar + nextNumber;
};

var sumSoFar = 0;

// sumSoFar = adder(sumSoFar, numbers[0]);
// sumSoFar = adder(sumSoFar, numbers[1]);
// sumSoFar = adder(sumSoFar, numbers[2]);
// sumSoFar = adder(sumSoFar, numbers[3]);


/*Final Function*/
function reduce(arr, callback, startingValue) {
	var sumSoFar = startingValue;
	for (var i = 0; i < arr.length; i++) {
		sumSoFar = callback(sumSoFar, arr[i]);
	}
	return sumSoFar;
}


// function sum() {
// 		for (var i = 0; i < numbers.lenth; i++) {
// 		 sumSoFar = adder(sumSoFar, numbers[i]);
// 		 return sumSoFar;
// }
// }








