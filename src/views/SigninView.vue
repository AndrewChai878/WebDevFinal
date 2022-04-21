<template>
  <div class = "sign-in">
    put sign-in components/code here
    <form>
      <input type="email" placeholder="email" v-model="email"/> 
      <br>
      <input type="password" placeholder="password" v-model="password"/>
      <br>
      <button type="button" v-on:click="login()">Login</button>
      <br>
      <button type="button" v-on:click="register()">Sign up</button>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/storage';
import 'firebase/compat/storage';
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
            var tempUser = firebase.auth().currentUser;

    let storageRef = firebase.storage().ref(tempUser.uid + '/profilePicture/avatar.png', );

 
    fetch('default-avatar.png')
    .then(function(response) {
      
      return response.blob()
    })
    .then(function(blob) {
      // here the image is a blob
      storageRef.put(blob)
    });
        data.user.sendEmailVerification();
      }).catch(() => {
          console.log("u messed register up u dent")
          alert("you messed register up u dent")});
    }
  }
  }

  
</script>

<style scoped lang="scss">
  .sign-in {
    padding: 10% 0%;
    text-align: center;
    width: 100%;
  }

  .sign-in input {
    width: 25%;
    height: 20%;
    padding: 0.5%;
    margin: 2.5% 0% 0%;
    background-color: lightgray;
    color: #DA0037;
  }

  .sign-in button {
    width: 25%;
    height: 50%;
    padding: 0.5%;
    margin: 2.5% 0% 0%;
    border-radius: 30px;
    background-color: #DA0037;
  }

  ::placeholder {
    color: #DA0037;
  }
</style>