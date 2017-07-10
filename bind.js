var myFakeElement = {};

var myFakeElement = {
	on: function(something) {
		console.log('Running .on with ' + something)
		return this;
	}
}



// Using this

// myFakeElement
// .on('x')
// .on('y')
// .on('z')
