<template>
  <section class="play-area">
    <div class = "gameplay-info">
            <p>
              Game Information <br> <br>
            </p>
            <p class = "game-turn">
              {{playerTurn}} <br> <br>
              {{inCheck}}  <br> <br>
              {{gameOver}} <br> <br>
            </p>
    </div>
    <div class = "board">
        <div v-if="active_board">
            <table id = "board-table">
                <tr v-for="(row,i) in this.trimmedBoard" :key="i">
                    <td v-for="(column,j) in row" :key="j" @click="movePiece($event)" class = "square">
                        <div v-if="column != 0">
                            <img class = "piece-image" :src="getPieceAsset(column)" />
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <ChessMoveHistory class = "move-history" :moves="move_history" />
  </section>
</template>



<script>
  import chess from '../js/chess'
  import ChessMoveHistory from '@/components/ChessMoveHistory.vue'
  export default {
    name: 'ChessView',
    components:{
      ChessMoveHistory
    },
    data() {
      return {
        active_board: null,
        active_square: null,
        side: 1,
        //keep track if rooks or kings have moved
        //for the sake of castling
        have_kings_moved: [false,false],
        have_rooks_moved: [false,false,false,false],
        move_history: "",
        move_counter: 1
      }
    },
    computed: {
      trimmedBoard(){
        //return a board without the padding
        return this.active_board.slice(2,10).map(function(val){
          return val.slice(2,10)
        })
      },

      inCheck(){
        if (this.active_board != null){
          if (chess.kingInCheck(this.active_board, 1)){
            return "In Check: White"
          }
          else if (chess.kingInCheck(this.active_board, -1)){
            return "In Check: Black"
          }
          else {
            return null
          }
        } else {
          return null
        }
      },

      playerTurn(){
        if (this.side == 1){
          return "Turn: White"
        } else {
          return "Turn: Black"
        }
      },

      gameOver(){
        if (this.active_board != null){
            if (chess.isGameOver(this.active_board, 1) == "Checkmate"){
              return "White Is Checkmated"
            }
            if (chess.isGameOver(this.active_board, 1) == "Stalemate"){
              return "Draw! White Is Stalemated"
            }
            if (chess.isGameOver(this.active_board, -1) == "Checkmate"){
              return "Black Is Checkmated"
            }
            if (chess.isGameOver(this.active_board, -1) == "Stalemate"){
              return "Draw! Black Is Stalemated"
            }
            else {
              return null
            }
          }
        else {
          return null
        } 
      }


    },
    mounted(){
        this.active_board = chess.generateEmptyBoard()
        this.active_board = chess.setBoard(this.active_board)
        console.log(this.trimmedBoard)
    },
    methods: {
      getPieceAsset(piece_value){
        let piece_arr = [require("@/assets/chess/BKing.png"), require("@/assets/chess/BQueen.png"),
          require("@/assets/chess/BRook.png"), require("@/assets/chess/BBishop.png"),
          require("@/assets/chess/BKnight.png"), require("@/assets/chess/BPawn.png"),
          "",
          require("@/assets/chess/WPawn.png"), require("@/assets/chess/WKnight.png"),
          require("@/assets/chess/WBishop.png"), require("@/assets/chess/WRook.png"),
          require("@/assets/chess/WQueen.png"), require("@/assets/chess/WKing.png")]
        
        return piece_arr[piece_value+6]
      },
      movePiece(event){
        /*
        event listeners for squares being selected
        logic flow:
        this has two purposes, selecting a piece to move
        moving piece to square.
        if selected == null then we dont currently have an active square
        and we are selecting a piece to move
        if selected == null and square is not a peice then dont set selected
        if selected != NaN then selected square is destination
        *need to work out sides/legality of move
        */
        //store the newly clicked square
        console.log("piece clicked")
        let square;
        
        //if the square has an image then its a piece and we need the td
        if (event.target.nodeName == "IMG"){
          square = event.target.parentElement.parentElement;
        }
        else {
          square = event.target;
        }
        //if the active square is null and selected square is empty do nothing
        if (this.active_square == null && !square.firstChild.firstChild){
          return;
        }
        //if there is no active square and selected square has a piece
        else if (this.active_square == null && square.firstChild){
          this.active_square = square;
          let active_col = this.active_square.cellIndex;
          let active_row = this.active_square.parentNode.rowIndex;
          //if the selected piece is of the wrong side return without doing anything
          //(do not select the piece)
          if (Math.sign(this.active_board[active_row+2][active_col+2]) != Math.sign(this.side)){
            this.active_square = null;
            return;
          }
          this.active_square.setAttribute("active","true");
          let target_squares = chess.getPotentialMoves(this.active_board, active_row, active_col);
          //prune illegal moves
          target_squares = chess.pruneIllegalMoves(this.active_board, active_row, active_col, target_squares);
          //if the piece moving is a king add castling as legal moves
          if (Math.abs(this.active_board[active_row+2][active_col+2]) == 6){
            let castling_moves = chess.getLegalCastling(this.active_board, this.side, this.have_kings_moved, this.have_rooks_moved);
            for (let i = 0; i < castling_moves.length; i++){
              target_squares.push(castling_moves[i]);
            }
          }
          //map to coords
          target_squares = target_squares.map(x => [x[0]-2,x[1]-2])
          console.log(target_squares);
          //highlight target squares
          for (let i = 0; i < target_squares.length; i++){
            target_squares[i]
            let target = document.getElementById('board-table').rows[target_squares[i][0]].cells[target_squares[i][1]];
            if (target){
              target.setAttribute("target","true");
            }
          }
          return;
        }
        //if there is an active square then this square is the target
        //get the legal moves for the active square
        //check to see if the target is a legal move
        //update flags if either a rook or king is moving
        //move the active square to the target
        //clear the highlighted squares
        //flip the side
        
        else if (this.active_square != null && this.active_square != square){
          let target_col = square.cellIndex;
          let target_row = square.parentNode.rowIndex;
          let active_col = this.active_square.cellIndex;
          let active_row = this.active_square.parentNode.rowIndex;
          console.log("active square", this.active_board[target_row+2][target_col+2])
          console.log("target square", this.active_board[active_row+2][active_col+2])
          

          //get legal moves of active piece
          let potential_moves = chess.getPotentialMoves(this.active_board, active_row, active_col);
          let legal_moves = chess.pruneIllegalMoves(this.active_board, active_row, active_col, potential_moves);
          //if the piece moving is a king add castling as legal moves
          if (Math.abs(this.active_board[active_row+2][active_col+2]) == 6){
            let castling_moves = chess.getLegalCastling(this.active_board, this.side, this.have_kings_moved, this.have_rooks_moved);
            for (let i = 0; i < castling_moves.length; i++){
              legal_moves.push(castling_moves[i]);
            }
          }

          //check to see if the target is in the legal move list
          console.log("legal moves", legal_moves);
          let is_legal = false;
          for (let i = 0; i < legal_moves.length; i++){
            if ((legal_moves[i][0] == target_row+2) && (legal_moves[i][1] == target_col+2)){
              is_legal = true;
            }
          }

          //if the move isnt legal clear all the highlights and unset the active piece
          if (!is_legal){
            let target_squares = document.querySelectorAll('[target="true"]');
            for (let i = 0; i < target_squares.length; i++){
              target_squares[i].setAttribute("target","false")
            }
            this.active_square.setAttribute("active","false");
            this.active_square = null;
            return;
          }

          //if the moving piece is a king change flag
          if (this.active_board[active_row+2][active_col+2] == 6){
            console.log("moved king");
            this.have_kings_moved[0] = true;
          }
          if (this.active_board[active_row+2][active_col+2] == -6){
            console.log("moved king");
            this.have_kings_moved[1] = true;
          }

          //if the moving piece is a rook change flag
          if (active_row == 0 && active_col == 0){
            console.log("moved rook");
            this.have_rooks_moved[0] = true;
          }
          if (active_row == 0 && active_col == 7){
            console.log("moved rook");
            this.have_rooks_moved[1] = true;
          }
          if (active_row == 7 && active_col == 0){
            console.log("moved rook");
            this.have_rooks_moved[2] = true;
          }
          if (active_row == 7 && active_col == 7){
            console.log("moved rook");
            this.have_rooks_moved[3] = true;
          }

          //if legal move and pieces are on same side
          if (Math.sign(this.active_board[target_row+2][target_col+2]) != Math.sign(this.active_board[active_row+2][active_col+2])){
            
            //if castling
            if (this.active_board[active_row+2][active_col+2] == 6 && active_col+2 == 6 && target_col+2 == 8){
              this.active_board[9][9] = 0;
              this.active_board[9][6] = 0;
              this.active_board[9][8] = 6;
              this.active_board[9][7] = 4;
              this.move_history = this.move_history + "\n" + this.move_counter + ". O-O ";
            }
            else if (this.active_board[active_row+2][active_col+2] == 6 && active_col+2 == 6 && target_col+2 == 4){
              this.active_board[9][2] = 0;
              this.active_board[9][6] = 0;
              this.active_board[9][4] = 6;
              this.active_board[9][5] = 4;
              this.move_history = this.move_history + "\n" + this.move_counter + ". O-O-O ";
            }
            else if (this.active_board[active_row+2][active_col+2] == -6 && active_col+2 == 6 && target_col+2 == 8){
              this.active_board[2][9] = 0;
              this.active_board[2][6] = 0;
              this.active_board[2][8] = -6;
              this.active_board[2][7] = -4;
              this.move_history = this.move_history + " O-O ";
            }
            else if (this.active_board[active_row+2][active_col+2] == -6 && active_col+2 == 6 && target_col+2 == 4){
              this.active_board[2][2] = 0;
              this.active_board[2][6] = 0;
              this.active_board[2][4] = -6;
              this.active_board[2][5] = -4;
              this.move_history = this.move_history + " O-O-O ";
            }
            //if promoting a pawn
            else if (this.active_board[active_row+2][active_col+2] == 1 && target_row+2 == 2){
              this.move_history = this.move_history + "\n" + this.move_counter + ". " +  chess.colToFile(active_col+2);
              if (this.active_board[target_row+2][target_col+2] != 0){
                this.move_history = this.move_history + "x";
              }
              this.move_history = this.move_history + chess.colToFile(target_col+2) + (8-target_row) + "=Q";
              this.active_board[target_row+2][target_col+2] = 5;
              this.active_board[active_row+2][active_col+2] = 0;
              
            } 
            else if (this.active_board[active_row+2][active_col+2] == -1 && target_row+2 == 9){
              this.move_history = this.move_history + " " +  chess.colToFile(active_col+2);
              if (this.active_board[target_row+2][target_col+2] != 0){
                this.move_history = this.move_history + "x";
              }
              this.move_history = this.move_history + chess.colToFile(target_col+2) + (8-target_row) + "=Q";
              this.active_board[target_row+2][target_col+2] = -5;
              this.active_board[active_row+2][active_col+2] = 0;
            }
            else {
              //if on white side add newline and turn to move history
              if (this.side == 1){
                this.move_history = this.move_history + "\n" + this.move_counter + ".";
              }
              //add the piece that is moving
              this.move_history = this.move_history + " " + chess.pToChar(this.active_board[active_row+2][active_col+2]);
              
              
              //if there is a capture add x
              if (this.active_board[target_row+2][target_col+2] != 0){
                //if piece doing the capturing is a pawn
                if (Math.abs(this.active_board[active_row+2][active_col+2]) == 1){
                  this.move_history = this.move_history + " " + chess.colToFile(active_col+2);
                }
                this.move_history = this.move_history + "x";
              }
              //add destination information
              this.move_history = this.move_history + chess.colToFile(target_col+2) + (8-target_row)
              //move the active square's value to the target's location
              this.active_board[target_row+2][target_col+2] = this.active_board[active_row+2][active_col+2];
              //piece has moved out of square fill with 0
              this.active_board[active_row+2][active_col+2] = 0;

              if (chess.isGameOver(this.active_board, ((-1)* this.side)) == "Checkmate"){
                this.move_history = this.move_history + "#";
              }
              else if (chess.kingInCheck(this.active_board, ((-1)* this.side))){
                this.move_history = this.move_history + "+";
              }
              
            }

          }
          
          //done making the move so set the active square to false
          this.active_square.setAttribute("active","false");
          this.active_square = null;

          //clear highlighted squares
          let target_squares = document.querySelectorAll('[target="true"]');
          for (let i = 0; i < target_squares.length; i++){
            target_squares[i].setAttribute("target","false")
          }

          //increment move counter
          if (this.side == -1){
            this.move_counter = this.move_counter + 1
          }
          //change the side
          if (this.side == 1){
            this.side = -1;
          } else {
            this.side = 1;
          }

          
          

        }
      }
    }   
  }
</script>

<style scoped lang="scss">

  .play-area{
    display: grid;
    grid-template-columns: 20vw auto 20vw;
    background-image: url(../assets/chess/wood-591631.jpg);
    margin: 0; 
  }

  .gameplay-info{
    grid-column: 1;
    font-size: x-large;
    font-weight: 600;
    text-align: center;
    background-color: antiquewhite;
    border-style: solid;
    border-width: 3px;
    border-color: black;
    overflow: auto;
    margin-left: 2.5vw;
    margin-right: 2.5vw;
    margin-top: 5vw;
    margin-bottom: 5vw;
  }

  .game-turn {
    padding: 25% 0% 0%;
  }

  .flip:hover{
    background-color: aquamarine;
  }

  .board{
    grid-column: 2;
  }
  .board table{
    background-image: url(../assets/chess/board.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-color: #331a00;
    height: 80vh;
    width: 80vh;
    margin: auto;
    table-layout: fixed;
  }

  .board table tr{
    border: 0px;
    margin: 0px;
    padding: 0px;
  }

  .board table tr td{
    width: 10vh;
    height: 10vh;
    border: 0px;
    margin: 0px;
    padding: 0px;
  }

  .board table tr td div{
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
    background-color: rgba(255, 217, 26, 0.552);
  }

  .square[target = "true"]{
    background-color: rgba(45, 255, 26, 0.552);
  }

  .move-history{
    grid-column: 3;
    font-size: large;
    font-weight: 600;
    text-align: center;
    background-color: antiquewhite;
    border-style: solid;
    border-width: 3px;
    border-color: black;
    margin-left: 2.5vw;
    margin-right: 2.5vw;
    margin-top: 5vw;
    margin-bottom: 5vw;
    overflow: auto;
    white-space: pre;
  }

</style>