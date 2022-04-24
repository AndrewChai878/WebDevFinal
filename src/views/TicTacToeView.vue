<template>
    <div class="container">
        <div class="info">
            <h2>Turn:</h2>
            <img v-if="turn == 0" src="../assets/tictactoe/x.png" alt="X">
            <img v-else-if="turn == 1" src="../assets/tictactoe/o.png" alt="O">
        </div>
        <div class="board">
            <TicTacToeBoard v-on:turn="turn=($event)" />
        </div>
    </div>
</template>




<script>
    import TicTacToeBoard from '../components/TicTacToeBoard.vue'
    export default {
        name: 'TicTacToeView',
        components:{
            TicTacToeBoard
        },
        data(){
            return{
                turn: 0
            }
        }
    }
</script>


<style scoped>
.container{
    display: flex;
    width: 100%;
    box-sizing: border-box;
}

.board{
    flex: 50%;
}

img{
    width: 120px;
}

</style>