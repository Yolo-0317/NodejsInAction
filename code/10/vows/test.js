var vows = require('vows');
var assert = require('assert');
var Todo = require('./todo');

vows.describe('Todo').addBatch({
  'when adding an item': {
    topic: function () {
      var todo = new Todo();
      todo.add('Feed my cat');
      return todo;
    },
    'it should exist in my todos': function(er, todo) {
      assert.equal(todo.getCount(), 1);
    }
  }
}).run();
