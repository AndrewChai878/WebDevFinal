export default{
    generateBoard(){
        // flush board
        board = []
        for(let i = 0; i < 6; i++){
            board.push([0,0,0,0,0,0,0])
        }
        return board
    },

    // returns what spot in the column the piece should drop to
    getRow(col){
        for(let i = 5; i >-1; i--){
            if(board[i][col] == 0){
                return i;
            }
        }
        // col is full
        return -1
    }

}

// array representing the board
let board = []