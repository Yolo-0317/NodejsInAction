var connect = require('connect');

var app = connect()
          .use(connect.logger())
          .listen(3000);
