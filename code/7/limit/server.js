var connect = require('connect');

var app = connect()
          .use(connect.bodyParser());

app.listen(3000);
