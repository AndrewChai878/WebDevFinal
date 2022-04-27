<template>
  <div>
    <div class="card">
      <input id="profileImageUpload" style="display:none"  type="file"/>
      <img id="profilePic" @click="changeImage()"/>
      <div id="progressBar">
        <div id="actualBar"></div>
      </div>
      <div id="bottom" v-if="changingName">
        <input
          type="text"
          id="displayName"
          name="displayName"
          :placeholder='[[name]]'
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
import $ from 'jquery'
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
    changeImage() {
      console.log("temp")
      $('#profileImageUpload').trigger('click');
      $('#progressBar').css("visibility", "visible")
      $('#actualBar').css("width", "0%")
      let uploadImage = document.getElementById('profileImageUpload');
      uploadImage.addEventListener('change', function(event){
        let file = event.target.files[0]
        let tempUser = firebase.auth().currentUser;
        let storageRef = firebase.storage().ref(tempUser.uid + "/profilePicture/avatar.png");
        let uploadTask = storageRef.put(file)
        uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    $('#actualBar').css("width", `${progress + "%"}`)
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
    console.log(error)
    $('#progressBar').css("visibility", "hidden")
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    $('#progressBar').css("visibility", "hidden")
    storageRef.getDownloadURL().then(function (url) {
      document.getElementById("profilePic").src = url;
      window.location.reload();
    })
    storageRef.getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
    });
  }
);
      })
    },
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
  cursor: pointer;
  height: 33%;
  width: 33%;
  margin: 0% 33%;
}

#progressBar {
  visibility: hidden;
  width: 100%;
  background-color: grey;
}

#actualBar {

  width: 0%;
  height: 1rem;
  background-color: aqua;
}
</style>