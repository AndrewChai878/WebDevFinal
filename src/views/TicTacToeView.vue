<template>
    <div>
        <TicTacToeBoard />
    </div>
</template>




<script>
    import TicTacToeBoard from '../components/TicTacToeBoard.vue'
    export default {
        name: 'TicTacToeView',
        components:{
            TicTacToeBoard
        }
    }
</script>


<style scoped lang="scss">
.tttBoard table{
    background-image: url(../assets/tictactoe/board.png);
    background-size: 100% 100%;
    height: 80vh;
    width: 80vh;
    margin: auto;
}
</style>
