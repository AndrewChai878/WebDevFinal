<template>
        <div>
            <GameBox img_src="https://static.vecteezy.com/system/resources/previews/002/323/503/large_2x/chess-illustration-icon-king-game-isolated-symbol-free-vector.jpg" route="/chess" />
            <GameBox img_src="https://www.pngkit.com/png/detail/376-3762235_tic-tac-toe-game-vector-tic-tac-toe.png" route="/tictactoe" />
            <GameBox img_src="https://t4.ftcdn.net/jpg/02/49/92/03/360_F_249920338_FJINPhpJmH485L6Wrknr2aTbbv1X6LWB.jpg" route="/checkers" />
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