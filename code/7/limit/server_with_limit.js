var connect = require('connect');

var app = connect()
          .use(connect.limit('32kb'))
          .use(connect.bodyParser());

app.listen(3000);
