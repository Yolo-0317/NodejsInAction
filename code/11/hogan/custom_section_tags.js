var hogan = require('hogan.js');
var md = require('github-flavored-markdown');

var template = '{{_markdown}}'
             + '**Name**: {{name}}'
             + '{{/markdown}}';

var context = {
  name: 'Rick LaRue',
  _markdown: function(text) {
    return md.parse(text);
  }
};

var template = hogan.compile(
  template,
  {sectionTags: [{o: '_markdown', c: 'markdown'}]}
);

console.log(template.render(context));
