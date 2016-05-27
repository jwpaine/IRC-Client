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

var Server = function (address, port) {
    this._address = address;
    this._port = port;
};

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
var s1 = new Server("irc.freenode.com", 6667);
s1.connect();
 
/* var s2 = new Server("irc.efnet.us", 6667);
s2.connect();
*/
