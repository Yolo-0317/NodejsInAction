/**
 * Created by baymax on 16/8/4.
 */
var events = require("events");
var net = require("net");

var channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};

channel.on('join',function (id, client) {
    this.clients[id] = client;
    this.subscriptions[id] = function (senderId, message) {
        if(id != senderId){
            console.log(message);
            this.clients[id].write(message);
        }
    };
    this.on('broadcast', this.subscriptions[id]);
});

var server = net.createServer(function (client) {
    var id = client.remoteAddress + ': ' + client.remotePort;
    // client.on('connect', function () {
        channel.emit('join', id, client);
    // });
    client.on('data', function (data) {
        var data = data.toString();
        channel.emit('broadcast', id, data);
    })
});

server.listen(8888);
