<template>

<table id="board">
    <tr v-for="(row,i) in this.board" :key="i">
        <td v-for="(column,j) in row" :key="j" :class="assignClass()" :id="''+i+j" @click="movePiece($event)">
            <img v-if="this.board[i][j] == 1" src="../assets/checkers/red.png" @click="getMoves($event,1)">
            <img v-else-if="this.board[i][j] == 2" src="../assets/checkers/red-king.png" @click="getMoves($event,2)">
            <img v-else-if="this.board[i][j] == 3" src="../assets/checkers/black.png" @click="getMoves($event,3)">
            <img v-else-if="this.board[i][j] == 4" src="../assets/checkers/black-king.png" @click="getMoves($event,4)">
        </td>
    </tr>
</table>

</template>

<script>
import checkers from '../js/checkers'
    export default{
        name:"CheckersBoard",
        data(){
            return{
                // the representation of the game board
                board: null,
                // turn number --> used to find current players turn by doing turn%2, 0 == p1, 1 == p2
                turn: 1,
                // is there a followup move being made
                followup: false,
                // the position of the most recently clicked piece
                currentPiecePos:'',
                // the number of the most recently clicked piece (1=red, 2= red-king, 3=black, 4=black-king)
                currentPieceNum:0,
            }
        },

        methods: {
            // assigns a class which determines if the square is black or white
            assignClass: function(){
                let n = checkers.updateCounter()
                return n%2 == 0 ? 'type1':'type2'
            },

            getMoves: function(event, piece){
                if(this.followup){
                    return
                }
                //event.target.parentElement returns the parent element information
                // if the piece clicked matches the player whose turn it is
                if((this.turn%2 == 0 && (piece == 1 || piece==2)) || (this.turn%2 == 1 && (piece == 3 || piece==4))){
                    // unhighlight any highlighted squares
                    this.removeHighlight()
                    let position = event.target.parentElement.id
                    this.currentPiecePos = position
                    this.currentPieceNum = piece
                    let moves = checkers.getMoves(position,piece,false)
                    moves.forEach(pos=> document.getElementById(pos).classList.add('highlight'))
                    document.getElementById(position).classList.add('pieceHighlight')
                }
            },
            
            // removes the highlight class from the squares that have it
            removeHighlight: function(){
                (document.querySelectorAll('.highlight')).forEach(square=>square.classList.remove('highlight'));
                let piece = (document.querySelector('.pieceHighlight'))
                if(piece != null){piece.classList.remove('pieceHighlight');}
            },

            // moves piece to the clicked square and eats any pieces in the way,
            // also levels the piece up if it reaches the end
            movePiece: function(event){
                // get the id of the square
                let id = event.target.id
                // if the clicked square is highlighted (a piece can move to it)
                if(event.target.classList.contains('highlight')){
                    let newX = parseInt(id[0])
                    let newY = parseInt(id[1])
                    let oldX = parseInt(this.currentPiecePos[0])
                    let oldY = parseInt(this.currentPiecePos[1])
                    // clear old position
                    this.board[oldX][oldY] = 0
                    // move piece to new position
                    this.board[newX][newY] = this.currentPieceNum
                    // reset square highlights
                    this.removeHighlight()
                    // update current piece position
                    this.currentPiecePos = ''+newX+newY
                    
                    // level up if possible
                    if(newX == 0 || newX == 7){
                        if(this.currentPieceNum != 2 && this.currentPieceNum != 4){
                            this.board[newX][newY] += 1
                            this.currentPieceNum += 1
                        }
                    }

                    // eat piece
                    if(Math.abs(newX-oldX) > 1 && Math.abs(newY-oldY) > 1){
                        // get coordinates of eaten piece
                        let middleX = Math.round((newX+oldX)/2)
                        let middleY = Math.round((newY+oldY)/2)
                        
                        // delete eaten piece from the board and update the parent component
                        let eatenPiece = this.board[middleX][middleY]
                        if(eatenPiece == 2 || eatenPiece == 4){eatenPiece-=1}
                        this.$emit('eat', eatenPiece)
                        this.board[middleX][middleY] = 0
                        
                        // update counts of pieces
                        checkers.setCount(this.currentPieceNum)
                        
                        // check for winner
                        let winner = checkers.checkWin()
                        if(winner == 'red'){alert('Player 1 wins')}
                        if(winner == 'black'){alert('Player 2 wins')}

                        // check for followup
                        this.followUpMove(id)
                    }else{                
                        // next players turn
                        this.turn +=1
                        this.$emit('turn', this.turn)
                        // no follow up move
                        this.followup = false
                    }
                }
            },

            followUpMove: function(position){
                let moves = checkers.getFollowUpMoves(position,this.currentPieceNum,true)
                moves.forEach(pos=> document.getElementById(pos).classList.add('highlight'))
                // there are follow up moves available
                if(moves.length != 0){
                    document.getElementById(position).classList.add('pieceHighlight')
                    this.followup = true
                }else{
                    // next players turn
                    this.turn +=1
                    this.$emit('turn', this.turn)
                    this.followup = false
                }
            },

        },

        mounted(){
            this.board = checkers.generateBoard();
            // randomly decides who is going first
            this.turn = Math.floor(Math.random() * 2)==0? this.turn=0: this.turn =1
            this.$emit('turn', this.turn)
        }
    }
</script>

<style scoped>

table{
    margin-left: auto;
    margin-right: auto;
    border-collapse: collapse;
    box-shadow: inset 0 3px 6px rgba(0,0,0,0.16), 0 4px 6px rgba(0,0,0,0.45);
    border-radius: 10px;
}

td{
    height: 9vmin;
    width: 9vmin;
    text-align:left;
    vertical-align:bottom;
}

.type1{
    background: whitesmoke;
}

.type2{
    background-color: #708090;
}

img{
    width: 90%;
    height: auto;
    cursor: pointer;
}

.highlight{
    background: rgb(174, 226, 176);
    border-radius: 50%;
    margin-top: 10px;
}

.pieceHighlight{
    background: rgb(174, 226, 176);
}

</style>