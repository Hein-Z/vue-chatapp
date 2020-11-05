import firebase from "firebase";
import firestore from "firebase/firestore"

var firebaseConfig = {
  apiKey: "AIzaSyDB4fIwf0Arl9suH_koKPULKoZaoVRzN8c",
  authDomain: "chat-app-78b9e.firebaseapp.com",
  databaseURL: "https://chat-app-78b9e.firebaseio.com",
  projectId: "chat-app-78b9e",
  storageBucket: "chat-app-78b9e.appspot.com",
  messagingSenderId: "48039426471",
  appId: "1:48039426471:web:c34375e87cf84684151e82",
  measurementId: "G-2MD5ZLPGM0"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebaseApp.firestore().settings({timestampsInSnapshots: true})

export default firebaseApp.firestore()

