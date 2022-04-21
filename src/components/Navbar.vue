<template>
    <nav>
        <div class="menu-item"><router-link to="/">Home</router-link></div>
        <div class="menu-item"><router-link to="/settings">Settings</router-link></div>
        <NavDropdown /> 
        <UserDropdown class="menu-item" id="signin" v-if="store.state.isLoggedIn" />
        <div class="signin" id="signin" v-else><router-link to="/sign-in">Sign-in</router-link></div>
    </nav>
    <router-view/>
</template>

<script>
    import NavDropdown from './NavbarDropdown.vue';
    import UserDropdown from '../components/UserDropdown.vue';
    import { useStore } from 'vuex'
    //import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
    export default{
        
        name: 'AppNavbar',
        components:{
            NavDropdown,
            UserDropdown
        },
        data() {
    return {
        store: useStore(),
        isLoggedIn: false
    };},
        computed: {
            checkLogin() {
                return this.$store.state.isLoggedIn;
            }
        }
    }
    
</script>

<style scoped>
    nav {
        background-color: #171717;
        color: #EDEDED;
        font-size: 3.5vw;
        overflow: hidden;
        font-weight: bold;
    }

    /* Media query to limit max font-size */
    @media screen and (min-width: 600px) {
        nav {
            font-size: 26px;
        }
    }

    /* Media query to center navbar elements on small screens*/
    @media screen and (max-width: 600px) {
        nav {
            display: flex;
            justify-content: center;
        }
    }
    
    div{
        float: left;
        display: block;
        text-align: center;
        padding: 15px 15px 0px 15px;
    }

    a {
        color: #EDEDED;
        text-decoration: none;
    }
    #signin{
        align-content: center;
        justify-content: center;
    }

</style>