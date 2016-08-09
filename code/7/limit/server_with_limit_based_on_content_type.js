var connect = require('connect');

function type(type, fn) {
  return function(req, res, next){
    var ct = req.headers['content-type'] || '';
    if (0 != ct.indexOf(type)) {
      return next();
    }
    fn(req, res, next);
  }
}

var app = connect()
          .use(type('application/x-www-form-urlencoded', connect.limit('64kb')))
          .use(type('application/json', connect.limit('32kb')))
          .use(type('image', connect.limit('2mb')))
          .use(type('video', connect.limit('300mb')))
          .use(connect.bodyParser());

app.listen(3000);
