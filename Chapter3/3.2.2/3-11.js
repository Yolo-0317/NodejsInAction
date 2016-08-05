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
            this.clients[id].write(message);
        }
    };
    var welcome = "Welcome!\n" + "Guests online " + this.listeners('broadcast').length;
    client.write(welcome + '\n');
    this.on('broadcast', this.subscriptions[id]);
});

//当有用户离开时,通知其他用户
channel.on('leave',function (id) {
   channel.removeListener('broadcast',this.subscriptions[id]);
    channel.emit('broadcast',id, id + "has left the chat.\n");
});

var server = net.createServer(function (client) {
    var id = client.remoteAddress + ': ' + client.remotePort;
    // client.on('connect', function () {
        channel.emit('join', id, client);
    // });
    client.on('data', function (data) {
        var data = data.toString();
        channel.emit('broadcast', id, data);
    });
    client.on('close',function () {
        channel.emit('leave',id);
    })
});

server.listen(8888);