var http = require('http');

var req = http.request({
    method: 'POST',
    port: 3000,
    headers: {
      'Content-Type': 'application/json'
    }
});

req.write('[');
var n = 300000;
while (n--) {
  req.write('"foo",');
}
req.write('"bar"]');

req.end();
