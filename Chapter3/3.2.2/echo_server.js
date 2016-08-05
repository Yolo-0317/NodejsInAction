/**
 * Created by baymax on 16/8/4.
 */
var net = require("net");

var server = net.createServer(function (socket) {
    // socket.on('connect',function (client) {
        console.log("client");
    // });
    socket.on('data',function (data) {
        console.log(data.toString());
        socket.write(data);
    })
});

server.listen(8888, '127.0.0.1');