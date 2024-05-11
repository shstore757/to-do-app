import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDvGQVqMcYwFnOpSht0qFgJb0ysz8pZTIY",
  authDomain: "to-do-8ca0a.firebaseapp.com",
  projectId: "to-do-8ca0a",
  storageBucket: "to-do-8ca0a.appspot.com",
  messagingSenderId: "875885171037",
  appId: "1:875885171037:web:8832dbb1b3fab40025d8b4",
  measurementId: "G-DGK8JM1BCT",
};

// console.log("Firebase Config: " + firebaseConfig);

const appFirebase = initializeApp(firebaseConfig);

export default appFirebase;
