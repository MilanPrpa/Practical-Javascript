


var todoList = {

 todos: [],

/* This method was used to show data to the console. No longer needed becasue
	the view object is handling the display now. */
 // displayTodos: function() {

 // 	if (this.todos.length === 0){
 // 		console.log('EMPTY!!');
 // 	}  else {
 // 		console.log('My Todos:')
	// 	for (var i = 0; i < this.todos.length; i++) {

 // 		if (this.todos[i].completed === true) {
 // 			console.log('(x)', this.todos[i].todoText);
 // 		} else {
 // 			console.log('( )', this.todos[i].todoText);
 // 		}

 // 	 }
 //  }
 
 
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


 	// ** OLD FOR LOOP, REPLACED BY forEach below **
 	// for (var i = 0; i < totalTodos; i++) {
 	// 	if (this.todos[i].completed === true) {
 	// 		completedTodos ++;
 	// 	}
 	// }

 	this.todos.forEach(function(todo) {
 		if (todo.completed === true) {
 			completedTodos ++;
 		}
 	});
 
 	// ** OLD FOR LOOP, REPLACED BY forEach below **
  	// if (completedTodos === totalTodos) {
 	// for (var i = 0; i < totalTodos; i ++) {
 	// 	this.todos[i].completed = false;
 	// }
  // } else {
  // 	for (var i = 0; i < totalTodos; i ++) {
  // 		this.todos[i].completed = true;
  // 	}
  // }

 	this.todos.forEach(function(todo) {
 		if (completedTodos === totalTodos) {
 			todo.completed = false;
 		} else {
 			todo.completed = true;
 		}
 	});

 }



};


/* using add eventListener option */
// create element with an id in HTML.
// var displayTodosButton = document.getElementById('displayTodosButton');
// 	displayTodosButton.addEventListener('click', function(){
// 		todoList.displayTodos();
// });

/* handlers object methods are passed to onclick event in html.
	Handlers run the methods from the todoList object. */
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

 /* Escaping the console
 	var todoLi = document.createElement('li'); creates the element.
 	var todoUl = document.querySelector('ul'); locates the element on the dom.
 	todoUl.appendChild(todoLi); inserts the child element(todoLi) into the queried element(todoUl).
 */

var view = {
	

	displayTodos: function() {
		
		var todoUl = document.querySelector('ul');
		todoUl.innerHTML = '';
		
		todoList.todos.forEach(function(todo, position) {
			debugger;
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







/* Delete buttons having access to todo id */
/* Adding a single event listener to Ul will be 
	more efficient instead of adding to each individual Li
	since all Li are children of Ul.*/
/* Target is the click event, it has a parentNode
	which contains contains the Li id. Below is how
	we access that button.*/

/* Move to view object*/
// var todoUl = document.querySelector('ul');
// todoUl.addEventListener('click', function(event) {
// 	/* This area updates and deletes todo*/
// 	// Get element that was clicked
// 	var elementClicked = event.target;

// 	// Check if element clicked is a deleteButton. Class name finds this out.
// 	if( elementClicked.className === 'deleteButton') {
// 		// Run handlers.deleteTodo
// 		//parseInt function turns string into numbers 
// 		handlers.deleteTodo(parseInt(elementClicked.parentNode.id));

// 	}
// })


















/////**** Version before createDeleteButton *****/////



// var todoList = {

//  todos: [],

// /* This method was used to show data to the console. No longer needed becasue
// 	the view object is handling the display now. */
//  // displayTodos: function() {

//  // 	if (this.todos.length === 0){
//  // 		console.log('EMPTY!!');
//  // 	}  else {
//  // 		console.log('My Todos:')
// 	// 	for (var i = 0; i < this.todos.length; i++) {

//  // 		if (this.todos[i].completed === true) {
//  // 			console.log('(x)', this.todos[i].todoText);
//  // 		} else {
//  // 			console.log('( )', this.todos[i].todoText);
//  // 		}

//  // 	 }
//  //  }
 
 
//  addTodo: function(todoText) {
//  	this.todos.push({
//  		todoText: todoText,
//  		completed: false
//  	});
 	
//  },
//  changeTodo: function(position, todoText) {
//  	this.todos[position].todoText = todoText;
 	
//  },
//  deleteTodo: function(position) {
//  	this.todos.splice(position, 1);
 	
//  },
//  toggleCompleted: function(position) {
//  	var todo = this.todos[position];
//  	todo.completed = !todo.completed;
 	
//  },
//  toggleAll: function() {
//  	var completedTodos = 0;
//  	var totalTodos = this.todos.length;

//  	for (var i = 0; i < totalTodos; i++) {
//  		if (this.todos[i].completed === true) {
//  			completedTodos ++;
//  		}
//  	}
//  	if (completedTodos === totalTodos) {
//  	for (var i = 0; i < totalTodos; i ++) {
//  		this.todos[i].completed = false;
//  	}
//   } else {
//   	for (var i = 0; i < totalTodos; i ++) {
//   		this.todos[i].completed = true;
//   	}
//   }

//  }



// };


// /* using add eventListener option */
// // create element with an id in HTML.
// // var displayTodosButton = document.getElementById('displayTodosButton');
// // 	displayTodosButton.addEventListener('click', function(){
// // 		todoList.displayTodos();
// // });

// /* handlers object methods are passed to onclick event in html.
// 	Handlers run the methods from the todoList object. */
// var handlers = {
// 	addTodo: function() {
// 		var addButtonText = document.getElementById('addButtonText');
// 		todoList.addTodo(addButtonText.value);
// 		addButtonText.value = '';
// 		/* This method displays addTodo to the DOM */
// 		view.displayTodos();
// 	},
// 	changeTodo: function() {
// 		var changeButtonPosition = document.getElementById('changeButtonPosition');
// 		var changeButtonText = document.getElementById('changeButtonText');
// 		todoList.changeTodo(changeButtonPosition.valueAsNumber, changeButtonText.value);
// 		changeButtonPosition.value = '';
// 		changeButtonText.value = '';
// 		view.displayTodos();
// 	},
// 	deleteTodo: function() {
// 		var deleteButtonPosition = document.getElementById('deleteButtonPosition');
// 		todoList.deleteTodo(deleteButtonPosition.valueAsNumber);
// 		deleteButtonPosition.value = '';
// 		view.displayTodos();	
// 	},
// 	toggleCompleted: function() {
// 		var toggleButtonPosition = document.getElementById('toggleButtonPosition');
// 		todoList.toggleCompleted(toggleButtonPosition.valueAsNumber);
// 		toggleButtonPosition.value = '';
// 		view.displayTodos();
// 	},
// 	toggleAll: function() {
// 		todoList.toggleAll();
// 		view.displayTodos();
// 	},
// };

//  /* Escaping the console
//  	var todoLi = document.createElement('li'); creates the element.
//  	var todoUl = document.querySelector('ul'); locates the element on the dom.
//  	todoUl.appendChild(todoLi); inserts the child element(todoLi) into the queried element(todoUl).
//  */

// var view = {
// 	/* Object responsible for things that the user sees. Takes the todos array and displays
// 	it to the screen. */

// 	displayTodos: function() {
// 		/* code before for loop clears 'ul' so it doesnt repeat. For loop creates li element for 
// 		every todo in todoList object.*/
// 		var todoUl = document.querySelector('ul');
// 		todoUl.innerHTML = '';
		
// 		for (var i = 0; i < todoList.todos.length; i++) {
// 			var todoLi = document.createElement('li');
// 			/* shortens the code using var todo */
// 			var todo = todoList.todos[i];
// 			var todoTextWithCompletion = '';

// 			if (todo.completed === true) {
// 				todoTextWithCompletion = '(X) ' + todo.todoText;
// 			} else {
// 				todoTextWithCompletion = '( ) ' + todo.todoText;
// 			}
// 			/* textContent property sets content of the li */
// 			todoLi.textContent = todoTextWithCompletion;
// 			todoUl.appendChild(todoLi);

// 		}
// 	}
// };










