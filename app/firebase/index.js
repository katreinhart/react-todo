import firebase from 'firebase';

try {
  var config = {
    apiKey: "AIzaSyDvyeQHOSpiXhtoHKftQUnUJFLQWoZIvO4",
    authDomain: "kat-todo-app.firebaseapp.com",
    databaseURL: "https://kat-todo-app.firebaseio.com",
    storageBucket: "kat-todo-app.appspot.com",
    messagingSenderId: "807759084829"
  };
  firebase.initializeApp(config);
} catch (e) {

}

export var firebaseRef = firebase.database().ref();
export default firebase;
