$(function() {

	// Initialize the Reveal.js library with the default config options
	// See more here https://github.com/hakimel/reveal.js#configuration
	Reveal.initialize({
		history: true		// Every slide will change the URL
	});

	// Connect to the socket

	var socket = io();

	// Variable initialization
	var presentation = $('.reveal');

	var  animationTimeout;

	
	socket.on('connect', function(data){

		// If we do, we can continue with the presentation.
          console.log("connected to the server");
		
			

			var ignore = false;

			$(window).on('hashchange', function(){

				// Notify other clients that we have navigated to a new slide
				// by sending the "slide-changed" message to socket.io

				if(ignore){
					// You will learn more about "ignore" in a bit
					return;
				}

				var hash = window.location.hash;
                  console.log("hash is "+hash);
				socket.emit('slide-changed', {
					hash: hash
				
				});
			});

			socket.on('navigate', function(data){
	
				// Another device has changed its slide. Change it in this browser, too:
               console.log("navigation key.........."+data.hash);
				window.location.hash = data.hash;

				// The "ignore" variable stops the hash change from
				// triggering our hashchange handler above and sending
				// us into a never-ending cycle.

				ignore = true;

				setInterval(function () {
					ignore = false;
				},100);

			});

	});

});
