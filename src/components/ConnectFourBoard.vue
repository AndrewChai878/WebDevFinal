<template>
<table id="board">
    <tr v-for="(row,i) in this.board" :key="i">
        <td v-for="(column,j) in row" :key="j" :id="''+i+j">
            <img v-if="this.board[i][j] == 0" class="coin" src="../assets/connect4/Empty.svg" @click="dropPiece($event)">
            <img v-if="this.board[i][j] == 1" class="coin" src="../assets/connect4/Red.svg">
            <img v-else-if="this.board[i][j] == 2" class="coin" src="../assets/connect4/Yellow.svg">
        </td>
    </tr>
</table>

</template>

<script>
import connect4 from '../js/connect4'

    export default{
        name: 'ConnectFourBoard',
        data(){
            return{
                // the representation of the game board
                board: null,
                // turn number --> used to find current players turn by doing turn%2, 0 == p1, 1 == p2
                turn: 1,
            }
        },
        methods:{
            init: function(){
                this.board = connect4.generateBoard()
                this.turn = Math.floor(Math.random() * 2)==0? this.turn=0: this.turn =1
            },
            dropPiece: function(event){
                // get parent element id
                let id = event.target.parentElement.id
                // get the column of the clicked square
                let col = parseInt(id[1])
                // get the spot (row) in the column to drop the piece
                let row = connect4.getRow(col)
                if(row != -1){
                    this.board[row][col] = (this.turn%2) + 1
                    this.turn +=1
                }
            }
        },
        mounted(){
            this.init();
        },
    }
</script>

<style scoped>

img{
    height: 100%;
}

table{
    margin-left: auto;
    margin-right: auto;
    margin-top: 3vmin;
    display: inline-block;
}

td{
    height: 11vmin;
    width: 11vmin;
    background: #324CA3;
}

</style>

