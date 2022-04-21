<template>
  <div>
    This is all about you my man!
    <div class="card">
      <img id="profilePic" />
      <div id="bottom" v-if="changingName">
        <input
          type="text"
          id="displayName"
          name="displayName"
          placeholder="{{name}}"
        />
        <button v-on:click="confirmDisplayName()">Confirm Display Name</button>
      </div>
      <div id="bottom" v-else>
        <h4 id="displayName">
          <b>{{ name }}</b>
        </h4>
        <button v-on:click="changeDisplayName()">Change Display Name</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/storage";
import "firebase/compat/storage";
export default {
  name: "UserSettingsView",
  data() {
    return {
      name: null,
      changingName: false,
    };
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var tempUser = firebase.auth().currentUser;

        let storageRef = firebase
          .storage()
          .ref(tempUser.uid + "/profilePicture/avatar.png");
        storageRef.getDownloadURL().then(function (url) {
          document.getElementById("profilePic").src = url;
        });
        this.name = user.displayName;
      } else {
          console.log("not logged in idiot")
      }
    });
  },
  methods: {
    changeDisplayName() {
      this.changingName = true;
    },
    confirmDisplayName() {
      firebase.auth().currentUser.updateProfile({
        displayName: document.getElementById("displayName").value,
      });
      this.changingName = false;
      window.location.reload();
    },
  },
};
</script>

<style>
#profilePic {
  height: 10rem;
}
</style>