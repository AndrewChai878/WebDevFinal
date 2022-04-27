<template>
  <div class = "register">
    <form>
    <input type="username" placeholder="Username" v-model="username"/>
      <br>
      <input type="email" placeholder="Email" v-model="email"/> 
      <br>
      <input type="password" placeholder="Password" v-model="password"/>
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
    name: 'RegisterView',
    data() {
    return {
        email: "",
        password: "",
        username: ""
    };},
    methods: {
    register() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(data => {
        data.user.updateProfile({
          displayName: this.username
        });
            var tempUser = firebase.auth().currentUser;
    console.log(tempUser.uid);
    let storageRef = firebase.storage().ref(tempUser.uid + '/profilePicture/avatar.png', );

 
    fetch('default-avatar.png')
    .then(function(response) {
      
      return response.blob()
    })
    .then(function(blob) {
        console.log(blob);
      // here the image is a blob
      storageRef.put(blob)
    });
        data.user.sendEmailVerification();
        console.log("Registration email sent!")
        alert("Registration email sent!")
        setTimeout(() => {
            window.location.replace('/');
        }, 1000);
        
      }).catch(() => {
          console.log("Registration failure!")
          alert("Registration failure!")});
    }
  }
  }

  
</script>

<style scoped lang="scss">
  .register {
    padding: 10% 0%;
    text-align: center;
    width: 100%;
  }

  .register input {
    width: 25%;
    height: 20%;
    padding: 0.5%;
    margin: 2.5% 0% 0%;
    background-color: lightgray;
    color: #DA0037;
  }

  .register button {
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