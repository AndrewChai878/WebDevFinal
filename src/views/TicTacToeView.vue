<template>
    <div class="container">
        <div class="info">
            <h2>Turn:</h2>
            <img v-if="turn == 0" src="../assets/tictactoe/x.png" alt="X">
            <img v-else-if="turn == 1" src="../assets/tictactoe/o.png" alt="O">
        </div>
        <div class="board">
            <TicTacToeBoard v-on:turn="turn=($event)" v-on:getWinner="winner=($event);popup=true" />
        </div>
        <PopUp
            :message="'X wins!'"
            :win="true"
            :option="2"
            v-on:response="handleResponse($event)" 
            v-if="popup && this.winner == 0"
        />
        <PopUp
            :message="'O wins!'"
            :win="true"
            :option="2"
            v-on:response="handleResponse($event)" 
            v-if="popup && this.winner == 1"
        />
        <PopUp
            :message="'Match is a draw!'"
            :win="false"
            :option="2"
            v-on:response="handleResponse($event)" 
            v-if="popup && this.winner == -1"
        />
    </div>
</template>




<script>
    import TicTacToeBoard from '../components/TicTacToeBoard.vue'
    import PopUp from "../components/Popup.vue";

    export default {
        name: 'TicTacToeView',
        components:{
            TicTacToeBoard,
            PopUp
        },
        data(){
            return{
                turn: 0,
                winner: null,
                popup: false
            }
        },
        methods:{
            winGame(){
                if(this.winner != null){
                    this.popup = true;
                }
            },
            handleResponse: function(){
                this.winner = null;
                this.popup = false;
            },
        }
    }
</script>


<style scoped>
.info{
    margin: 25% 5%;
    margin-right: 5%;
}

.container{
    display: flex;
    width: 100%;
}

.board{
    flex: 50%;
    display: flex;
}

</style>