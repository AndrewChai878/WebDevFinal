<template>
  <div class="row">
    <div class="board">
      <CheckersBoard v-on:turn="turn=$event%2"/>
    </div>
    <div class="column">
      <div class="container">
        CURRENT TURN: 
        <img v-if="turn == 0" src="../assets/checkers/red.png">
        <img v-else-if="turn == 1" src="../assets/checkers/black.png">
      </div> 
    </div>
</div>
 
</template>

<script>
import CheckersBoard from "../components/CheckersBoard.vue"

export default {
  name: 'App',
  data(){
    return {
      turn:1
    }
  },
  
  components: {
    CheckersBoard,
  },

}
</script>

<style scoped>
div{
  box-sizing: border-box;
}

/* Create three equal columns that floats next to each other */
.column {
  flex:25%;
  border-radius: 20px;
  padding-left: 10px;
  padding-right: 10px;
}

.board{
  flex: 75%
}

/* Clear floats after the columns */
.row{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  padding:10px;
}

/* Responsive layout - makes the three columns stack on top of each other instead of next to each other */
@media screen and (max-width: 800px) {
  .board {
    min-width: 100%;
  }
}

.container{
  display:flex;
  justify-content: space-evenly;
  align-items: center;
  height:9vmin;
  background: whitesmoke;
  border: solid 3px black;
  border-radius: 20px;
  font-weight: bold;
  font-size: 2vmin;
}

img{
  height:90%
}

</style>
