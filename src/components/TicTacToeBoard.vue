<template>
    <div class = "tttBoard">
        <table id = "tttBoard-table">
            <tr v-for="(row,i) in this.board" :key="i">
                <td v-for="(col,j) in row" :key="j" @click="move($event)" :id="''+i+j">
                    <img v-if="this.board[i][j] == 0" src="../assets/tictactoe/x.png" class="animate__animated animate__pulse" :id="''+i+j"/>
                    <img v-else-if="this.board[i][j] == 1" src="../assets/tictactoe/o.png" class="animate__animated animate__pulse" :id="''+i+j"/>
                </td>
            </tr>
        </table>
        <div class = "button">
            <button @click="newGame">New Game</button>
        </div>
    </div>
</template>


<script>
import ttt from '../js/ttt'
import 'animate.css'

export default {
    name: 'TicTacToeBoard',
    emits: ["turn", "getWinner"],
    data(){
        return{
            board: null,
            winner: -1,
            turn: 0 // 0 is X, 1 is O
        }
    },
    mounted(){
        this.board = ttt.newGame();
    },
    methods: {
        //Adds the piece of the current player to the cell that was clicked
        move(event){
            if(this.board[event.srcElement.id[0]][event.srcElement.id[1]] == -1 && this.winner == -1){
                this.board[event.srcElement.id[0]][event.srcElement.id[1]] = this.turn;
                this.isWinner(this.turn);
                if(this.turn == 0){
                    this.turn = 1;
                }else{
                    this.turn = 0;
                }
                this.$emit('turn', this.turn);
            }else if(this.winner == -1){
                console.log("Start a new game");
                this.$emit('getWinner', this.winner);
            }
        },

        newGame(){
            this.board = ttt.newGame();
            this.winner = -1;
            this.turn = 0;
            this.$emit('turn', this.turn);
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
                    this.winner = turn;
                    this.$emit('getWinner', this.winner);
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
                    this.winner = turn;
                    this.$emit('getWinner', this.winner);
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
                this.winner = turn;
                this.$emit('getWinner', this.winner);
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
                this.winner = turn;
                this.$emit('getWinner', this.winner);
                return;
            }
        }
    }
}
</script>


<style scoped lang="scss">
table{
    background-image: url(../assets/tictactoe/board.png);
    background-size: 100% 100%;
    height: 80vh;
    width: 80vh;
    border-collapse: collapse;
    margin: auto;
    padding: auto;
}

.tttBoard{
    display: flex;
    flex-direction: row;;
}

td:hover{
    background-color: rgba($color: aqua, $alpha: 0.3);
}

td{
    width: 33.33%;
    height: 33.33%;
}

.button{
    white-space: nowrap;
    margin: 37.5% 5%;
}

.button button{
    background-color: #DA0037;
    font-size: 1.875em;
    border-radius: 12px;
    padding: 10% 30%;
}

.winner{
    background-color: rgba($color: red, $alpha: 0.5);
}

/* Responsive layout*/
@media screen and (max-width: 800px) {
    .tttBoard{
        display: block;
    }

    table{
        background-image: url(../assets/tictactoe/board.png);
        width: 40vh;
        height: 40vh;
    }

    table img {
        width: 70%;
        height: 70%;
    }

    td {
    width: 33.33%;
    height: 33.33%;
    }

    td:hover {
        background-color: rgba($color: aqua, $alpha: 0.3);
    }

    .button button{
        padding: 5% 15%;
    }

}
</style>