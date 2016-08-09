var soda = require('soda')
var assert = require('assert');

var browser = soda.createSauceClient({
  'url': 'http://www.reddit.com/',
  'username': 'yourusername',
  'access-key': 'youraccesskey',
  'os': 'Windows 2003',
  'browser': 'firefox',
  'browser-version': '3.6',
  'name': 'This is an example test',
  'max-duration': 300
});

browser.on('command', function(cmd, args){
  console.log(cmd, args.join(', '));
});

browser
  .chain
  .session()
  .open('/')
  .type('user', 'mcantelon')
  .type('passwd', 'mahsecret')
  .clickAndWait('//button[@type="submit"]')
  .assertTextPresent('logout')
  .testComplete()
  .end(function(err){
  if (err) throw err;
  console.log('Done!');
  });
