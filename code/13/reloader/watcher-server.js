var fs = require('fs');
var url = require('url');
var http = require('http');
var path = require('path');
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var root = __dirname;

app.use(function (req, res, next) {
  var file = url.parse(req.url).pathname;
  var mode = 'stylesheet';
  if (file[file.length - 1] == '/') {
    file += 'index.html';
    mode = 'reload';
  }
  createWatcher(file, mode);
  next();
});

app.use(express.static(root));

var watchers = {};

function createWatcher (file, event) {
  var absolute = path.join(root, file);

  if (watchers[absolute]) {
    return;
  }

  fs.watchFile(absolute, function (curr, prev) {
    if (curr.mtime !== prev.mtime) {
      io.sockets.emit(event, file);
    }
  });

  watchers[absolute] = true;
}

server.listen(8080);
