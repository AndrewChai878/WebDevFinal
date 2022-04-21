<template>
    <div class = "tttBoard">
        <table id = "tttBoard-table">
            <tr v-for="(row,i) in this.board" :key="i">
                <td v-for="(col,j) in row" :key="j" @click="move($event)" :id="''+i+j">
                    <img v-if="this.board[i][j] == 0" src="../assets/tictactoe/x.png" :id="''+i+j"/>
                    <img v-else-if="this.board[i][j] == 1" src="../assets/tictactoe/o.png" :id="''+i+j"/>
                </td>
            </tr>
        </table>
    </div>
</template>


<script>
import ttt from '../js/ttt'
export default {
    name: 'TicTacToeBoard',
    data(){
        return{
            board: null,
            turn: 0 // 0 is X, 1 is O
        }
    },
    mounted(){
        this.board = ttt.newGame();
    },
    methods: {
        //Adds the piece of the current player to the cell that was clicked
        move(event){
            if(this.board[event.srcElement.id[0]][event.srcElement.id[1]] == -1){
                this.board[event.srcElement.id[0]][event.srcElement.id[1]] = this.turn;
                if(this.turn == 0){
                    this.turn = 1;
                }else{
                    this.turn = 0;
                }
            }else{
                console.log("Invalid Move");
            }
            
        }
    }
}
</script>


<style scoped lang="scss">
.tttBoard table{
    background-image: url(../assets/tictactoe/board.png);
    background-size: 100% 100%;
    height: 80vh;
    width: 80vh;
    margin: auto;
    table-layout: fixed;
}

td:hover{
    background-color: rgba($color: aqua, $alpha: 0.3);
}

td{
    width: 33.33%;
    height: 33.33%;
}
</style>