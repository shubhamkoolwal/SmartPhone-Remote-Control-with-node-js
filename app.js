// This is the server-side file of our mobile remote controller app.
// It initializes socket.io and a new express instance.
// Start it by running 'node app.js' from your terminal.


// Creating an express server
const http = require('http');
const socketIO = require('socket.io');

var express = require('express'),
	app = express();

// This is needed if the app is run on heroku and other cloud providers:


// App Configuration

// Make the files in the public folder available to the world
app.use(express.static(__dirname + '/public'));

var server = http.createServer(app);
var io = socketIO(server);
var port = process.env.PORT || 3000;

// Initialize a new socket.io object. It is bound to 
// the express app, which allows them to coexist.



// This is a secret key that prevents others from opening your presentation
// and controlling it. Change it to something that only you know.


// Initialize a new socket.io application

io.on('connection', function (socket) {

	// A new client has come online. Check the secret key and 
	// emit a "granted" or "denied" message.
    console.log('New user connected');

	//socket.on('load', function(data){

		/*socket.emit('access', {
			access:  "granted" 
		});
*/
	//});

	// Clients send the 'slide-changed' message whenever they navigate to a new slide.

	socket.on('slide-changed', function(data){

		// Check the secret key again
      console.log("hash Change "+data.hash);
       
		
			// Tell all connected clients to navigate to the new slide
			io.emit('navigate', {
				hash: data.hash
			});
		

	});

     socket.on('disconnect', () => {
    console.log('User was disconnected');
  });

});
server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
