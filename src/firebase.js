import * as firebase from "firebase";
import "firebase/database";

let config = {
  apiKey: "AIzaSyDjbWrGaIRBPS4av5LJohVHkHOtyiv6iww",
  authDomain: "933547731367-rb0fnrnqckl9g022b61qru8skeq4fnpm.apps.googleusercontent.com",
  databaseURL: "https://web2-1b5da-default-rtdb.firebaseio.com/",
  projectId: "web2-1b5da",
  storageBucket: "web2-1b5da.appspot.com",
  messagingSenderId: "933547731367",
  appId: "1:933547731367:web:d2b6d6848cfd3157a8ee82",
};

firebase.initializeApp(config);

export default firebase.database();
