var net = require('net');


exports.connect = function(server, nickname, realname, callback) {

	var socket = new net.Socket();
	var msg = null;
	/* connect to server as defined by variables _port and _address */
	socket.connect(server._port, server._address, function() {
		/* send NICK / USER handshake */	
		socket.write("NICK "+nickname+"\r\n");
		socket.write("USER "+nickname+" * * :"+realname+"\r\n");
		callback(socket);
	});
	
      	socket.on('data', function(data) {
		/* KEEP IRC CONNECTION ALIVE
		 * check for ping and reply with appropriate pong 
		*/
		if (data.slice(0,4) == "PING") {
			console.log('Received: ' + data);
			var reply = "PONG "+data.slice(5);
			console.log("replying with "+reply);
			socket.write(reply);
		
		} else {
			/* if data is not ping, callback with data for client to process */
			callback(socket,data);		
		}	
	});

	socket.on('close', function() {
	       	console.log('Connection closed');
	});   	
};

