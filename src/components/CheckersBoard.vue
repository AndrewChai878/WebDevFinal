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
                board: null,
                turn: 1,
                // the position of the most recently clicked piece
                currentPiecePos:'',
                // the number of the most recently clicked piece (1=red, 2= red-king, 3=black, 4=black-king)
                currentPieceNum:0,
            }
        },
        computed: {},
        methods:{
            // assigns a class which determines if the square is black or white
            assignClass: function(){
                let n = checkers.updateCounter()
                return n%2 == 0 ? 'type1':'type2'
            },
            getMoves: function(event, piece){
                //event.target.parentElement returns the parent element information
                // if the piece clicked matches the player whose turn it is
                if(this.turn%2 + 1 == piece || this.turn%2 + 2 == piece){
                    // unhighlight any highlighted squares
                    this.removeHighlight()
                    let position = event.target.parentElement.id
                    this.currentPiecePos = position
                    this.currentPieceNum = piece
                    let moves = checkers.getMoves(position,piece)
                    moves.forEach(pos=> document.getElementById(pos).classList.add('highlight'))
                }
            },
            // removes the highlight class from the squares that have it
            removeHighlight: function(){
                (document.querySelectorAll('.highlight')).forEach(square=>square.classList.remove('highlight'))
            },

            // move piece to the clicked square
            movePiece: function(event){
                // get the id of the square
                let id = event.target.id
                // if the clicked square is highlighted (a piece can move to it)
                if(event.target.classList.contains('highlight')){
                    let newX = parseInt(id[0])
                    let newY = parseInt(id[1])
                    let oldX = parseInt(this.currentPiecePos[0])
                    let oldY = parseInt(this.currentPiecePos[1])
                    this.board[oldX][oldY] = 0
                    this.board[newX][newY] = this.currentPieceNum
                    this.turn +=1
                    this.removeHighlight()
                }
            },
        },
        mounted(){
            this.board = checkers.generateBoard();
            // randomly decides who is going first
            this.turn = Math.floor(Math.random() * 2)==0? this.turn=0: this.turn =1
            console.log('current turn: '+this.turn)
        }
    }
</script>

<style scoped>

*{
    background: grey;
}

table{
    margin-left: auto;
    margin-right: auto;
    border-collapse: collapse;
    box-shadow: inset 0 3px 6px rgba(0,0,0,0.16), 0 4px 6px rgba(0,0,0,0.45);
    border-radius: 10px;
}

td{
    height: 10vh;
    width: 10vh;
    text-align:left;
    vertical-align:bottom;
}

.type1{
    background: whitesmoke;
}

.type2{
    background: '#204E70';
}

img{
    width: 90%;
    height: auto;
    background: whitesmoke;
    cursor: pointer;
}

.highlight{
    background: blue;
}

</style>