<template>
  <div>
    put sign-in components/code here
    <form>
      <input type="email" placeholder="email" v-model="email"/> 
      <input type="password" placeholder="password" v-model="password"/>
      <button type="button" v-on:click="login()">Login</button>
      <button type="button" v-on:click="register()">Sign up</button>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

  export default {
    name: 'SigninView',
    data() {
    return {
        email: "",
        password: ""
    };},
    methods: {
    login() {
      console.log("temp");
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(()=> {
        document.getElementById("signin").innerHTML = `<router-link to="/#">${firebase.auth().currentUser.displayName}</router-link>`
        console.log("logged in u rat")
        alert("logged in u baka")}).catch(() => {
          console.log("u messed up login u dent")
          alert("you messed login up u dent")});
          
    },
    register() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(data => {
        data.user.updateProfile({
          displayName: "Probably Not Wabz"
        });
        data.user.sendEmailVerification();
      }).catch(() => {
          console.log("u messed register up u dent")
          alert("you messed register up u dent")});
    }
  }
  }

</script>

<style>

</style>