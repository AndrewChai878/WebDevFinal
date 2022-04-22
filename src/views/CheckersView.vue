<template>
  <div class="row">
    <div class="board">
      <CheckersBoard 
      v-on:turn="turn=$event%2" 
      v-on:eat="$event==1?numReds-=1:numBlacks-=1"
      />
    </div>
    <div class="column">
      <div class="container">
        CURRENT TURN: 
        <img v-if="turn == 0" src="../assets/checkers/red.png">
        <img v-else-if="turn == 1" src="../assets/checkers/black.png">
      </div> 
      <div class="pieces">
        Player 1:
        <div class="pieceContainer"><img v-for="index in (12 - this.numReds)" src="../assets/checkers/red.png" :key="index" /></div>
      </div> 
      <div class="pieces">
        Player 2:
        <div class="pieceContainer"><img v-for="index in (12 - this.numBlacks)" src="../assets/checkers/black.png" :key="index" /></div>
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
      turn:1,
      numReds:12,
      numBlacks:12,
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

/* Responsive layout*/
@media screen and (max-width: 800px) {
  .board {
    min-width: 100%;
  }

  .pieces{
    height: 9vh !important;
    background: blue;
  }

}

.container{
  display:flex;
  justify-content: space-evenly;
  align-items: center;
  height:9vh;
  background: whitesmoke;
  border: solid 3px black;
  border-radius: 20px;
  font-weight: bold;
  font-size: 2vmin;
  margin-top: 10px;
}

.pieceContainer{
  display:flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items:center;
}

.pieces{
  justify-content: start;
  padding: 0.5vmax;
  display:flex;
  align-items:center;
  background: whitesmoke;
  border: solid 3px black;
  border-radius: 20px;
  font-weight: bold;
  font-size: 2vmin;
  margin-top: 10px;
}

.pieceContainer > img{
    width:3vmax;
  }

img{
  height:90%;
}

</style>
