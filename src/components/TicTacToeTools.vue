<template>
    <div>
        <button v-on:click="newGame()">New Game</button>
    </div>
</template>



<script>
    import ttt from '../js/ttt.js'
    export default {
        name: 'TicTacToeTools',
        methods:{
            newGame(){
                ttt.newGame();
                console.log("New Game Started")
            }
        }
    }
</script>