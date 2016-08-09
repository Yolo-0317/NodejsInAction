var connect = require('connect');

var app = connect();

var User = {
  authenticate: function(credentials, callback) {
    if (credentials.user == 'tobi'
      && credentials.pass == 'ferret') {
      callback(null, credentials);
    } else {
      callback(new Error('Incorrect credentials.'));
    }
  }
}

app.use(connect.basicAuth(function(user, pass, callback){
  User.authenticate({ user: user, pass: pass }, gotUser);

  function gotUser(err, user) {
    if (err) return callback(err);
    callback(null, user);
  }
}));

app.listen(3000);
