<template>
    <div class = "board">
        <div v-if="active_board">
            <table id = "board-table">
                <tr v-for="(row,i) in this.trimmedBoard" :key="i">
                    <td v-for="(column,j) in row" :key="j">
                        <img class = "piece-image" src="@/assets/chess/BBishop.png" />
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    import chess from '../js/chess'
    export default {
        name: 'ChessBoard',
        data() {
            return {
                active_board: null
            }
        },
        computed: {
            trimmedBoard(){
                //return a board without the padding
                return this.active_board.slice(2,10).map(function(val){
                    return val.slice(2,10)
                })
            }
        },
        mounted(){
            this.active_board = chess.generateEmptyBoard()
            this.active_board = chess.setBoard(this.active_board)
            console.log(this.trimmedBoard)
        },
        methods: {
            getAsset(){

            }
        }
        
        
    }
</script>


<style scoped lang="scss">

.board{
      background-image: url(../assets/chess/board.png);
      background-repeat: no-repeat;
      background-size: 80vh;
      height: 80vh;
      width: 80vh;
      margin: auto;
  }

  .board table tr{
      border: 0px;
      margin: 0px;

  }

  .board table tr td{
      width: 10vh;
      height: 10vh;
      border: 0px;
      margin: 0px;
      padding: 0px;

  }

  .board table tr td:hover{
      width: 10vh;
      height: 10vh;
      background-color: aqua;
  }

  .piece-image{
      border: 0px;
      margin: 0px;
      padding: 0px;
      width: 10vh;
      height: 10vh;
  }

  .square[active = "true"]{
      background-color: rgba(221, 197, 79,0.5);
  }

</style>