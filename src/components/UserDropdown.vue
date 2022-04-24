<template>

  <div class="dropdown nav-link me-auto">
    <img id="profilePic2" />
    <a
      class="dropdown-toggle navbar-btn"
      id="dropdownMenuButton1"
      data-bs-toggle="dropdown"
      aria-expanded="false">
      {{name}}
    </a>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li class="dropdown-item"><router-link to="/usersettings">User Settings</router-link></li>
        <li class="dropdown-item">
          <router-link to="/" v-on:click="logout()">Sign-out</router-link>
        </li>
    </ul>
  </div>

</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import store from "@/store/index.js";
export default {
  name: "UserDropdown",
  data() {
    return {
      isOpen: false,
      name: firebase.auth().currentUser.displayName,
    };
  },
  mounted() {
    var tempUser = firebase.auth().currentUser;
    let storageRef = firebase
      .storage()
      .ref(tempUser.uid + "/profilePicture/avatar.png");
    storageRef.getDownloadURL().then(function (url) {
      document.getElementById("profilePic2").src = url;
    });
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(function () {
          console.log("Signed out successfully.");
          store.state.isLoggedIn = false;
          window.location.reload();
        })
        .catch(console.log("Signout failure!"));
    },
  },
};
</script>

<style scoped>

#profilePic2 {
  height: 1.5rem;
  padding-right: 0.5rem;
}


</style>