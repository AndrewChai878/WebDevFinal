<template>
    <div>
        <router-link :to="route">
            <img :src="img_src" alt="Game Image">
        </router-link>
    </div>
    <router-view/>
</template>

<script>
    export default{
        name: 'GameBox',
        props:{
            route: String,
            img_src: String,
        },
    }

</script>

<style scoped>
    div{
        border: 2px solid black;
        margin:5px;
        flex: 1 1 0px; /* All boxes are the same size*/
        display: flex; /* this line and the two under center the images in their box*/
        justify-content: center;
        align-items: center;
    }

    /* Make boxes take up full width on small screens*/
    @media screen and (max-width: 850px) {
        div {
            min-width: 100%;
        }
    }
    
    img{ 
        width: 100%;
        height: 100%;
        vertical-align: bottom;
    }

</style>