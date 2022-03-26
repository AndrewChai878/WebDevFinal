<template>
    <nav>
        <div class="menu-item"><router-link to="/">Home</router-link></div>
        <div class="menu-item"><router-link to="/sign-in">Sign-in</router-link></div>
        <div class="menu-item"><router-link to="/settings">Settings</router-link></div>
        <NavDropdown /> 
    </nav>
    <router-view/>
</template>

<script>
    import NavDropdown from './NavbarDropdown.vue';
    export default{
        name: 'AppNavbar',
        components:{
            NavDropdown,
        },
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

</style>