<template>
    <div class="dropdown">
        <button class="dropbtn"><img id="profilePic2">{{name}} ▾</button>
        <div class="dropmenu" id="dropmenu">
            <div><router-link to="/usersettings">User Settings</router-link></div>
            <div><router-link to="/" v-on:click="logout()">Logout</router-link></div>
        </div>
    </div>
    
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import store from '@/store/index.js';
    export default{
        name: 'UserDropdown',
        data() {
            return{
                isOpen: false,
                name: firebase.auth().currentUser.displayName,
            }
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
                firebase.auth().signOut().then(function() {
                    console.log("Signed out successfully.")
                    store.state.isLoggedIn = false;
                    window.location.reload();
                }).catch(console.log("Signout failure!"))
            }
        }
    }
</script>

<style scoped>

    .dropdown{
        float: left;
        overflow: hidden;
        font-size:inherit;
    }

    .dropbtn{
        display: flex;
        font-weight: bold;
        font-size: inherit;
        border: none;
        outline: none;
        background-color: inherit;
        color: white;
        margin:0;   
    }

    .dropmenu{
        display: none;
        position: absolute;
        background-color: #EDEDED;
        min-width: 120px;
        box-shadow: 0px 2px black;
        z-index: 1;
        padding: 10px 0px;
    }

    .dropbtn:hover + .dropmenu{
        display: block;
    }

    .dropmenu:hover{
        display: block;
    }

    a{
        color: #171717;

        text-decoration: none;
    }
    
    #profilePic2 {
  height: 1.5rem;
          padding-right: 0.5rem;
}

</style>