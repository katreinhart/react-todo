import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyDvyeQHOSpiXhtoHKftQUnUJFLQWoZIvO4",
  authDomain: "kat-todo-app.firebaseapp.com",
  databaseURL: "https://kat-todo-app.firebaseio.com",
  storageBucket: "kat-todo-app.appspot.com",
  messagingSenderId: "807759084829"
};
firebase.initializeApp(config);

var firebaseRef = firebase.database().ref();

firebaseRef.set({
  app: {
    name: 'Todo Application',
    version: '0.1.1'
  },
  isRunning: true,
  user: {
    name: 'Kat',
    age: 34
  }
})

var todosRef = firebaseRef.child('todos')

todosRef.on('child_added', (snapshot) => {
  console.log('Child added', snapshot.key, snapshot.val())
})

todosRef.push({text: 'Walk the dog'})

todosRef.push({text: 'Eat breakfast'})
