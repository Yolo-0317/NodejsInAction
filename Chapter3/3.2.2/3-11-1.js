/**
 * Created by baymax on 16/8/4.
 */
const net = require('net');
const client = net.createConnection({port: 8124},function () {
    //'connect' listener
    console.log('connected to server!');
    client.write('world!\r\n');
});
client.on('data', function (data) {
    console.log(data.toString());
    client.end();
});
client.on('end', function () {
    console.log('disconnected from server');
});