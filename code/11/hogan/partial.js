var hogan = require('hogan.js');

var studentTemplate = '<p>Name: {{name}}, '
                    + 'Age: {{age}} years old</p>';

var mainTemplate = '{{#students}}'
                 + '{{>student}}'
                 + '{{/students}}';

var context = {
  students: [{
    name: 'Jane Narwal',
    age: 21
  },{
    name :'rick larue',
    age: 26
  }]
};

var template = hogan.compile(mainTemplate);
var partial = hogan.compile(studentTemplate);

var html = template.render(context, {student: partial});
console.log(html);
