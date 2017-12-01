import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCj6H_1C3GR8cp2D3p4qTTMakeLJMDMaw0",
    authDomain: "my-awesome-project-6.firebaseapp.com",
    databaseURL: "https://my-awesome-project-6.firebaseio.com",
    projectId: "my-awesome-project-6",
    storageBucket: "my-awesome-project-6.appspot.com",
    messagingSenderId: "682386649526"
  };
  firebase.initializeApp(config);

export default firebase;