<template>
    <div class="dropdown">
        <button class="dropbtn">Games ▾</button>
        <div class="dropmenu" id="dropmenu">
            <div><router-link to="/chess">Chess</router-link></div>
            <div><router-link to="/">Tic Tac Toe</router-link></div>
            <div><router-link to="/checkers">Checkers</router-link></div>
        </div>
    </div>
    
</template>

<script>
    export default{
        name: 'NavDropdown',
        data() {
            return{
                isOpen: false,
            }
        },
    }
</script>

<style scoped>

    .dropdown{
        float: left;
        overflow: hidden;
        font-size:inherit;
    }

    .dropbtn{
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

</style>