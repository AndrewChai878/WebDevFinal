// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBw2isk4-aYF3JXoUTlf1PDAhpvVWjgHdo",
  authDomain: "webdevfinal-e9585.firebaseapp.com",
  projectId: "webdevfinal-e9585",
  storageBucket: "webdevfinal-e9585.appspot.com",
  messagingSenderId: "306588800729",
  appId: "1:306588800729:web:a3c44f535d0898e7ec90c8",
  measurementId: "G-WFQHRCW8NF"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);