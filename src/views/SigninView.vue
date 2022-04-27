<template>
  <div class = "sign-in">
    <form>
      <input type="email" placeholder="email" v-model="email"/> 
      <br>
      <div class = "passwordSection">
        <input type="password" placeholder="password" v-model="password"/>
        <button class="link" style="background:none; border:none; padding: 0px; margin: 0px; text-align: right;" v-on:click="forgotPassword()">Forgot Password</button>
      </div>
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
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(()=> {
        console.log("Logged in!")
        alert("Logged in!")}).catch(() => {
          console.log("Login failure!")
          alert("Login failure!")});
          
    },
    register() {
      this.$router.push('/register');
    }
  }
  }

  
</script>

<style scoped lang="scss">

  .passwordSection {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .sign-in {
    padding: 5% 0%;
    text-align: center;
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

  /* Responsive layout*/
@media screen and (max-width: 800px) {
  .sign-in input {
    width: 50%;
  }
  .sign-in button {
    width: 50%;
  }
}
</style>