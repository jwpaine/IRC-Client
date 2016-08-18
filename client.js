var server = require('./connection');
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);
var net = require('net');

rl.setPrompt('> ');
rl.prompt();

/* client info */
var nickname = "my_nick";
var realname = "my_realname";
var version = "Custom 1.0";

var Server = function (address, port, socket) {
    this._address = address;
    this._port = port;
    this._socket  = socket;
};

Server.prototype.send = function(message) {
	/* if command */
	if (message[0]=="/") {
		/* slice off '/' and split into array of strings */
		var data = message.slice(1).split(" ")
		/* check command */
		if (data[0] == "msg") {
			/* convert into a foreach */
			var msg = "PRIVMSG "+data[1]+" :";
			for (var i = 2; i < data.length; i++) {
				msg += data[i];
			};

			console.log("sending:"+msg);
			this._socket.write(msg+"\r\n");
		} else {
		/* not msg */
			var msg = message.slice(1, message.length);
			console.log("sending:"+msg);
			this._socket.write(msg+"\r\n");
		}

		
	};
}
Server.prototype.connect = function () {
    console.log('Connecting to IRC server: ' + this._address + " on port " + this._port);
    	/* call server.connect export, passing reference to 
 	 * server self, nick/username, and a callback
	 */
    server.connect(this, nickname, realname, function(socket, msg) {
	if(!socket) {
		console.log("socket null");
		return;
	}
	/* if msg from server is present and not null, print it */
	if (msg) {
		console.log(msg.toString('utf8'));
	}	
    });     

};

/* create server object and connect */
var s1 = new Server("irc.freenode.com", 6667, null);
s1.connect();

	/* provide basic CLI for user input */
rl.on('line', (line) => {
	var input = line.trim();
	s1.send(line);
  	rl.prompt();
});


