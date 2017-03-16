var React = require('react');
var TodoList = require('TodoList');

var TodoApp = React.createClass({
  getInitialState: function() {
    return {
      todos: [
        {
          id: 1,
          text: 'walk the dog'
        },
        {
          id: 2,
          text: 'clean the floor'
        },
        {
          id: 3,
          text: 'make lunch'
        },
        {
          id: 4,
          text: 'work on react'
        }
      ]
    };
  },
  render: function(){
    var {todos} =  this.state;

    return (
      <div>
        <TodoList todos={todos} />
      </div>
    );
  }
});

module.exports = TodoApp;
