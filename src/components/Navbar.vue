<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <div class="navbar-brand">
        <img src="../assets/branding/crowned-pawn.svg" height="60vh" alt="">
        <a class="navbar-brand" href="/">Checkmate Games</a>
      </div>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <!-- <div class="nav-link"><router-link to="/">Example</router-link></div> -->
          <div class="dropdown nav-link me-auto">
            <a
              class="dropdown-toggle navbar-btn"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false">
              Games
            </a>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li class="dropdown-item"><router-link to="/chess">Chess</router-link></li>
                <li class="dropdown-item"><router-link to="/checkers">Checkers</router-link></li>
                <li class="dropdown-item"><router-link to="/connect4">Connect-4</router-link></li>
                <li class="dropdown-item"><router-link to="/tictactoe">Tic Tac Toe</router-link></li>
            </ul>
          </div>
          <UserDropdown v-if="store.state.isLoggedIn"/>
          <div class="nav-link me-auto" v-else><router-link to="/sign-in">Sign-in</router-link></div>
          
        </div>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<script>
import UserDropdown from "../components/UserDropdown.vue";
import { useStore } from "vuex";
//import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
export default {
  name: "AppNavbar",
  components: {
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