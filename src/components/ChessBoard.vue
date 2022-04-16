<template>
    <div class = "board">
        <table id = "board-table"></table>
    </div>
</template>

<script>
    import chess from '../js/chess'
    export default {
        name: 'ChessBoard',
        active_board: null,
        mounted(){
            this.active_board = chess.generateEmptyBoard()
            this.active_board = chess.setBoard(this.active_board)
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
      width: 10vh;
      height: 10vh;
  }

  .square[active = "true"]{
      background-color: rgba(221, 197, 79,0.5);
  }
</style>