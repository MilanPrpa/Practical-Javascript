/*Functions inside of functions*/

/*Higher order functions:
	-functions that accept other functions and enchance their behavior.
Callback functions:
	-functions that are passed as arguments to the higher order funciton
	and then invoked. */


function logTenNumbers() {
	for (var i = 0; i < 2; i ++) {
		console.log(i);
	};
}

/*runWithDebugger enchances the function of another function. The callback function
is passed as an argument and run. */
function runWithDebugger(ourFunction) {
	debugger;
	ourFunction();
}

/*setTimeout function. */
setTimeout(function() {
	/*some code that will run after 3 seconds */
}, 3000)


/*forEach*/
var gradovi = ['Sibenik', 'Zadar', 'Split', 'Zagreb'];
/*forEach accepts another funciton as its argument and runs that funciton. The callback
anonymous function then accepts an argument to call the element of each item
in the array. The result lists all of the elements.*/
gradovi.forEach(function(name) {
	/*console.log(name); */
})

/*Create our own forEach function*/
/*  */
function forEach(myArray, myFunction) {
	for(var i = 0; i < myArray.length; i++) {
		myFunction(myArray[i]);
		/*console.log(i);*/
	}
}















