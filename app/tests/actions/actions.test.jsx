import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
var expect = require('expect');

import firebase, {firebaseRef} from 'app/firebase'
var actions = require('actions');

var createMockStore = configureMockStore([thunk]);

describe('Actions', () => {
  it('should generate search text action', () => {
    var action = {
      type: 'SET_SEARCH_TEXT',
      searchText: 'Some search text'
    };
    var res = actions.setSearchText(action.searchText);

    expect(res).toEqual(action);
  });

  it('should generate add todo action', () => {
    var action = {
      type: 'ADD_TODO',
      todo: {
        id: '12342r',
        text: 'anything we like',
        completed: false,
        createdAt: 123456
      }
    }
    var res = actions.addTodo(action.todo);

    expect(res).toEqual(action);
  });

  it('should create todo and dispatch ADD_TODO', (done) => {
    const store = createMockStore({});
    const todoText = 'A todo item';

    store.dispatch(actions.startAddTodo(todoText)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toInclude({
        type: 'ADD_TODO'
      });
      expect(actions[0].todo).toInclude({
        text: todoText
      });
      done();
    }).catch(done);
  });

  it('should generate add todos action object', () => {
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
    var res = actions.addTodos(todos);

    expect(res).toEqual(action);
  });

  it('should generate toggle show completed action', () => {
    var action = {
      type: 'TOGGLE_SHOW_COMPLETED'
    }
    var res = actions.toggleShowCompleted();

    expect(res).toEqual(action);
  });

  it('should generate update todo action', () => {
    var action = {
      type: 'UPDATE_TODO',
      id: 1,
      updates: {completed: false}
    }
    var res = actions.updateTodo(action.id, action.updates);

    expect(res).toEqual(action);
  });

  describe('Tests with firebase Todos', () => {
    var testTodoRef;

    beforeEach((done) => {
      var todosRef = firebaseRef.child('todos');

      todosRef.remove().then(() => {
        testTodoRef = firebaseRef.child('todos').push()

        return testTodoRef.set({
          text: 'something to do',
          completed: false,
          createdAt: 1232523
        })
      })
      .then(() => done())
      .catch(done);
    })

    afterEach((done) => {
      testTodoRef.remove().then(()=> done());
    })

    it('Should toggle todo and dispatch UPDATE_TODO action', (done) => {
      const store = createMockStore({})
      const action = actions.startToggleTodo(testTodoRef.key, true)

      store.dispatch(action).then(() => {
        const mockActions = store.getActions();
        expect(mockActions[0]).toInclude({
          type: 'UPDATE_TODO',
          id: testTodoRef.key
        });
        expect(mockActions[0].updates).toInclude({
          completed: true
        })
        expect(mockActions[0].updates.completedAt).toExist();

        done();
      }, done);
    })

    it('Should dispatch ADD_TODOS action and populate Todos from firebase', (done) => {
      const store = createMockStore({})
      const action = actions.startAddTodos()

      store.dispatch(action).then(() => {
        const mockActions = store.getActions();
        expect(mockActions[0].type).toEqual('ADD_TODOS');
        expect(mockActions[0].todos.length).toEqual(1);
        expect(mockActions[0].todos[0].text).toEqual('something to do');

        done();
      }, done)
    })
  })

  describe('Auth actions', () => {

    it ('Should dispatch login action on user login', () => {
      const store = createMockStore({})
      const action = actions.login(1234)

      var res = store.dispatch(action)

      expect(res.type).toEqual('LOG_IN')
      expect(res.uid).toExist()

    })

    it ('should dispatch logout action on logout', () => {
      const store = createMockStore({})
      const action = actions.logout()

      var res = store.dispatch(action)

      expect(res.type).toEqual('LOG_OUT')
      expect(res.uid).toNotExist()

    })
  })

})
