<template>
        <div>
            <GameBox :img_src="require('../assets/home/chess2.png')" route="/chess" />
            <GameBox :img_src="require('../assets/home/ttt2.png')" route="/tictactoe" />
            <GameBox :img_src="require('../assets/home/checkers2.png')" route="/checkers" />
            <GameBox :img_src="require('../assets/home/connect42.png')" route="/connect4" />            
        </div>
    
    
</template>

<script>
    import GameBox from "./GameBox.vue"
    export default{
        name: 'HomeContainer',
        components : {
            GameBox
        }
    }

</script>

<style scoped>
    div{
        padding: 20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }
</style>