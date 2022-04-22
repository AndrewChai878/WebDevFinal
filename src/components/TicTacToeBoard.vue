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
    <div class = "button">
        <button @click="newGame">New Game</button>
    </div>
</template>


<script>
import ttt from '../js/ttt'
export default {
    name: 'TicTacToeBoard',
    data(){
        return{
            board: null,
            winner: false,
            turn: 0 // 0 is X, 1 is O
        }
    },
    mounted(){
        this.board = ttt.newGame();
    },
    methods: {
        //Adds the piece of the current player to the cell that was clicked
        move(event){
            if(this.board[event.srcElement.id[0]][event.srcElement.id[1]] == -1 && this.winner == false){
                this.board[event.srcElement.id[0]][event.srcElement.id[1]] = this.turn;
                this.isWinner(this.turn);
                if(this.turn == 0){
                    this.turn = 1;
                }else{
                    this.turn = 0;
                }
            }else if(this.winner){
                console.log("Start a new game");
            }
            else{
                console.log("Invalid Move");
            }  
        },

        newGame(){
            this.board = ttt.newGame();
            this.winner = false;
            this.turn = 0;
            //remove winner class from cells
            for(let i = 0; i < 3; i++){
                for(let j = 0; j < 3; j++){
                    document.getElementById(''+i+j).classList.remove('winner');
                }
            }
            console.log("New Game Started")
        },

        isWinner(turn){
            // check for horizontal winner
            for(let i = 0; i < 3; i++){
                let current3 = true;
                for(let j = 0; j < 3; j++){
                    if(this.board[i][j] != turn){
                        current3 = false;
                        break;
                    }
                }
                if(current3){
                    // add winner class to row/col/diagonal
                    for(let j = 0; j < 3; j++){
                        document.getElementById(''+i+j).classList.add('winner');
                    }
                    this.winner = true;
                    return;
                }
            }

            // check for vertical winner
            for(let i = 0; i < 3; i++){
                let current3 = true;
                for(let j = 0; j < 3; j++){
                    if(this.board[j][i] != turn){
                        current3 = false;
                        break;
                    }
                }
                if(current3){
                    // add winner class to row/col/diagonal
                    for(let j = 0; j < 3; j++){
                        document.getElementById(''+j+i).classList.add('winner');
                    }
                    this.winner = true;
                    return;
                }
            }

            // check for diagonal winner (TL to BR)
            let current3 = true;
            for(let i = 0; i < 3; i++){
                if(this.board[i][i] != turn){
                    current3 = false;
                    break;
                }
            }
            if(current3){
                // add winner class to row/col/diagonal
                for(let i = 0; i < 3; i++){
                    document.getElementById(''+i+i).classList.add('winner');
                }
                this.winner = true;
                return;
            }

            // check for diagonal winner (TR to BL)
            current3 = true;
            for(let i = 0; i < 3; i++){
                if(this.board[i][2-i] != turn){
                    current3 = false;
                    break;
                }
            }
            if(current3){
                // add winner class to row/col/diagonal
                for(let i = 0; i < 3; i++){
                    document.getElementById(''+i+(2-i)).classList.add('winner');
                }
                this.winner = true;
                return;
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
    border-collapse: collapse;
}

td:hover{
    background-color: rgba($color: aqua, $alpha: 0.3);
}

td{
    width: 33.33%;
    height: 33.33%;
}

.winner{
    background-color: rgba($color: red, $alpha: 0.5);
}
</style>