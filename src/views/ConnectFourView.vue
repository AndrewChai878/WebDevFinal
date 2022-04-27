<template>
    <div class="container">
        <div class="info">
            <h2>Turn:</h2>
            <img v-if="turn == 0" src="../assets/connect4/red-coin.svg" class="animate__animated animate__rotateIn" alt="red">
            <img v-else-if="turn == 1" src="../assets/connect4/yellow-coin.svg" class="animate__animated animate__rotateIn" alt="yellow">
        </div>

        <div class="board">
            <ConnectFourBoard
                v-on:draw="drawGame()"
                v-on:win="winGame($event)"
                v-on:turn="turn=$event"
                ref="connect4board"
            />
        </div>
        <PopUp
            :message="this.winner + ' Won!'"
            :win="true"
            :option="1"
            v-on:response="handleResponse($event)" 
            v-if="popup && (winner != '')"
        />
        <PopUp
            :message="'Match is a draw!'"
            :win="false"
            :option="1"
            v-on:response="handleResponse($event)" 
            v-if="popup && draw"
        />
    </div>
      
</template>

<script>

import ConnectFourBoard from "../components/ConnectFourBoard.vue"
import PopUp from "../components/Popup.vue";
import 'animate.css'

export default{
    
    name: 'ConnectFourView',
    data(){
        return{
            popup:false,
            winner:'',
            draw:false,
            turn:1,
        }
    },

    components:{
        ConnectFourBoard,
        PopUp,
    },
    methods: {
        winGame: function(event){
            this.winner = event
            this.popup = true
        },
        drawGame: function(){
            this.draw = true
            this.popup = true
        },
        handleResponse: function(event){
            this.popup = false
            if(event == 'yes'){
                this.playAgain()
            }
        },
        playAgain: function(){
            this.winner = ''
            this.draw = false
            this.$refs.connect4board.init()
        },
    },
}
</script>

<style scoped>

.container{
    display: flex;
    flex-wrap: wrap-reverse;
    justify-content: center;
    align-items: center;
}

.info{
    margin-right:5vmin;
}

</style>