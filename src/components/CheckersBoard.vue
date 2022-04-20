<template>

<table id="board">
    <tr v-for="(row,i) in this.board" :key="i">
        <td v-for="(column,j) in row" :key="j" :class="assignClass()" :id="''+i+j">
            <img v-if="this.board[i][j] == 1" src="../assets/checkers/red.png" @click="change($event,1)">
            <img v-else-if="this.board[i][j] == 2" src="../assets/checkers/red-king.png" @click="change($event,2)">
            <img v-else-if="this.board[i][j] == 3" src="../assets/checkers/black.png" @click="change($event,3)">
            <img v-else-if="this.board[i][j] == 4" src="../assets/checkers/black-king.png" @click="change($event,4)">
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
            }
        },
        computed: {},
        methods:{
            assignClass: function(){
                let n = checkers.updateCounter()
                return n%2 == 0 ? 'type1':'type2'
            },
            change: function(event, piece){
                //event.target.parentElement returns the parent element information
                let position = event.target.parentElement.id
                let moves = checkers.getMoves(position,piece)
                console.log(moves)
                
            }
        },
        mounted(){
            this.board = checkers.generateBoard();
            console.log(this.board)
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

td:hover{
    background: blue;
}

img{
    width: 90%;
    height: auto;
    background: whitesmoke;
    cursor: pointer;
}

</style>