<template>
<table id="board">
    <tr v-for="(row,i) in this.board" :key="i">
        <td v-for="(column,j) in row" :key="j" :id="''+i+j">
            <img v-if="this.board[i][j] == 1" src="../assets/checkers/red.png">
            <img v-else-if="this.board[i][j] == 2" src="../assets/checkers/red-king.png">
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
            }
        },
        methods:{
            init: function(){
                this.board = connect4.generateBoard()
            }
        },
        mounted(){
            this.init();
        },
    }
</script>

<style scoped>
table{
    margin-left: auto;
    margin-right: auto;
    border-collapse: collapse;
    padding: 10px;
    display: inline-block;
}

td{
    height: 11vmin;
    width: 11vmin;
    border: 1px solid black;
}

</style>

