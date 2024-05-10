import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "to-do-8ca0a.firebaseapp.com",
  projectId: "to-do-8ca0a",
  storageBucket: "to-do-8ca0a.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MS_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_M_ID,
};

console.log("Firebase Config:", firebaseConfig);

const appFirebase = initializeApp(firebaseConfig);

export default appFirebase;
