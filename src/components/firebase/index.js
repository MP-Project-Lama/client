import firebase from "firebase/compat/app";
import "firebase/compat/storage";

export { storage, firebase as default };
const firebaseConfig = {
  apiKey: "AIzaSyAZdmuqphfMdgQlIVzHoqxdct21rC8aCJ0",
  authDomain: "mp-project-c5a45.firebaseapp.com",
  databaseURL: "gs://mp-project-c5a45.appspot.com",
  projectId: "mp-project-c5a45",
  storageBucket: "mp-project-c5a45.appspot.com",
  messagingSenderId: "136394325401",
  appId: "1:136394325401:web:435888ca0b74bdda28a708",
  measurementId: "G-JL5S02V2PQ",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

