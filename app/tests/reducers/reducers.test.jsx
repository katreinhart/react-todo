var expect = require('expect');
var df = require('deep-freeze-strict');

var reducers = require('reducers');

describe('Reducers', () => {
  describe('searchTextReducer', () => {
    it('should set search text', () => {
      var action = {
        type: 'SET_SEARCH_TEXT',
        searchText: 'dog'
      }
      var res = reducers.searchTextReducer(df(''), df(action));

      expect(res).toEqual(action.searchText);
    });
  });

  describe('showCompletedReducer', () => {
    it('Should toggle show completed', () => {
      var action = {
        type: 'TOGGLE_SHOW_COMPLETED',
      }
      var res = reducers.showCompletedReducer(df(false), df(action));

      expect(res).toEqual(true);
    })
  })

  describe('todosReducer', () => {
    it('should add new todo', () => {
      var action = {
        type: 'ADD_TODO',
        todo: {
          id: 'abc124',
          text: 'something to do',
          completed: false,
          createdAt: 12343,
          completedAt: null
        }
      }
      var res = reducers.todosReducer(df([]), df(action));
      expect(res.length).toEqual(1);
      expect(res[0]).toEqual(action.todo);
    })
    it('should add existing todos', () => {
      var todos = [{
        id: 111,
        text: 'Anything',
        completed: false,
        completedAt: undefined,
        createdAt: 3300
      }]
      var action = {
        type: 'ADD_TODOS',
        todos
      }
      var res = reducers.todosReducer(df([]), df(action));
      expect(res.length).toEqual(1);
      expect(res[0]).toEqual(todos[0]);
    })
    it('should update todo', () => {
      var todos = [{
        id: 1,
        text: 'walk the dog',
        createdAt: 123,
        completed: false,
        completedAt: null
      }]
      var updates = {
        completed: false,
        completedAt: null
      }
      var action = {
        type: 'UPDATE_TODO',
        id: todos[0].id,
        updates
      }
      var res = reducers.todosReducer(df(todos), df(action));
      expect(res[0].completed).toEqual(updates.completed);
      expect(res[0].completedAt).toEqual(updates.completedAt);
      expect(res[0].text).toEqual(todos[0].text);
    })
  })
});
