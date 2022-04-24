<template>
  <nav class="navbar">
    <div class="menu-item name"><router-link to="/">Home</router-link></div>
    <div class="menu-item"><router-link to="/settings">Settings</router-link></div>
    <NavDropdown class="menu-item" />
    <UserDropdown class="menu-item right-align" id="signin" v-if="store.state.isLoggedIn"/>
    <div class="menu-item right-align" id="signin" v-else><router-link to="/sign-in">Sign-in</router-link></div>
  </nav>
  <router-view />
</template>

<script>
import NavDropdown from "./NavbarDropdown.vue";
import UserDropdown from "../components/UserDropdown.vue";
import { useStore } from "vuex";
//import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
export default {
  name: "AppNavbar",
  components: {
    NavDropdown,
    UserDropdown,
  },
  data() {
    return {
      store: useStore(),
      isLoggedIn: false,
    };
  },
  computed: {
    checkLogin() {
      return this.$store.state.isLoggedIn;
    },
  },
};
</script>

<style scoped>
nav {
  background-color: #171717;
  color: #ededed;
  overflow: hidden;
  font-weight: bold;
}

/* Media query to limit max font-size */
@media screen and (min-width: 600px) {
  nav {
    font-size: 1.6em;
  }
}

/* Media query to center navbar elements on small screens*/
@media screen and (max-width: 600px) {
  nav {
    display: flex;
    justify-content: center;
  }
}

a {
  color: #ededed;
  text-decoration: none;
}

.menu-item{
  float: left;
  display: block;
  text-align: center;
  padding: 0.5rem 1rem 0px 0.5rem;
}

.right-align{
  float:right;
  padding-right: 2vw;
}

.name{
  padding-left: 2vw;
}

</style>