import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase/compat/app';
import store from './store/index'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'firebase/storage';
import 'firebase/compat/storage';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const firebaseConfig = {
    apiKey: "AIzaSyBw2isk4-aYF3JXoUTlf1PDAhpvVWjgHdo",
    authDomain: "webdevfinal-e9585.firebaseapp.com",
    projectId: "webdevfinal-e9585",
    storageBucket: "webdevfinal-e9585.appspot.com",
    messagingSenderId: "306588800729",
    appId: "1:306588800729:web:a3c44f535d0898e7ec90c8",
    measurementId: "G-WFQHRCW8NF"
};

firebase.initializeApp(firebaseConfig);


firebase.auth().onAuthStateChanged(user => {
  if(user){
    console.log("Welcome back", user.displayName)
    store.state.isLoggedIn = true;

      } else{
        //Not logged in
      }
    });

createApp(App).use(router).use(store).use(VueAxios, axios).mount('#app')
