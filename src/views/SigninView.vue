<template>
  <div class = "sign-in">
    <form>
      <input type="email" id="email" placeholder="email" v-model="email"/> 
      <br>
      <div class = "passwordSection">
        <input type="password" id="password" placeholder="password" v-model="password"/>
        <button class="link" style="background:none; border:none; padding: 0px; margin: 0px; text-align: right;" v-on:click="forgotPassword()">Forgot Password</button>
      </div>
      <br>
      <button type="button" id="login" v-on:click="login()">Login</button>
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
    mounted(){
            document.getElementById("email").addEventListener("keypress", function(e) {
        if(e.key == "Enter"){
          e.preventDefault();
  }
})
      document.getElementById("password").addEventListener("keypress", function(e) {
        if(e.key == "Enter"){
          e.preventDefault();

          this.email = document.getElementById("email").value
          this.password = document.getElementById("password").value
                    console.log(this.email, document.getElementById("password").value)
          firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(()=> {
              console.log("Logged in!")
              this.$router.push('/');
              alert("Logged in!")}).catch(() => {
                console.log("Login failure!")
                alert("Login failure!")});
  }
})
  },
    methods: {
      forgotPassword() {
      if(this.email == "" || this.email == null){
        alert("Please enter your email in the email box!")
      } else {
        firebase.auth().sendPasswordResetEmail(this.email)
        alert("Please check your email for a password recovery email!\nMake sure you check your spam mail if not found!")
      }

    },
    login() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(()=> {
        console.log("Logged in!")
        this.$router.push('/');
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