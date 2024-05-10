// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRABASE_KEY,
  authDomain: "to-do-8ca0a.firebaseapp.com",
  projectId: "to-do-8ca0a",
  storageBucket: "to-do-8ca0a.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIRABASE_MS_ID,
  appId: import.meta.env.VITE_FIRABASE_APP_ID,
  measurementId: import.meta.env.VITE_FIRABASE_M_ID,
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
//const analytics = getAnalytics(appFirebase);

export default appFirebase;
