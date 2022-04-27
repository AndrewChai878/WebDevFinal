<template>
    <div class="board">
        <ConnectFourBoard
            v-on:draw="drawGame()"
            v-on:win="winGame($event)" 
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
      
</template>

<script>

import ConnectFourBoard from "../components/ConnectFourBoard.vue"
import PopUp from "../components/Popup.vue";

export default{
    
    name: 'ConnectFourView',
    data(){
        return{
            popup:false,
            winner:'',
            draw:false,
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


</style>