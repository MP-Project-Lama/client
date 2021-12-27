import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD23PSo1x30RuzPxaM7RptUgAwKlkFWM4E",
  authDomain: "fir-6a568.firebaseapp.com",
  projectId: "fir-6a568",
  storageBucket: "fir-6a568.appspot.com",
  messagingSenderId: "843806323602",
  appId: "1:843806323602:web:8e8f06d2bc0f4616b4874b",
  measurementId: "G-01DTBKJFE7",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
