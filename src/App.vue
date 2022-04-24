<template>
  <AppHeader/>
  <AppNavbar/>
</template>


<script>
  import AppHeader from './components/Header.vue';
  import AppNavbar from './components/Navbar.vue';
  
  export default{
    name: 'App',
    components:{
      AppHeader,
      AppNavbar,
    }
  }
</script>


<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

/* Feel free to swap the font */
@import url('https://fonts.googleapis.com/css2?family=Roboto&family=Source+Sans+Pro&display=swap');
*{
  font-family: 'Roboto', sans-serif;
}

nav {
  a{
    color: white;
    text-decoration: none;
    cursor: pointer;
  }
  a:hover{
    color: red;
  }
  a {
    &.router-link-exact-active {
      color: #DA0037;
    }
  }
}

li{
  a{
    color: black;
  }
}

</style>
