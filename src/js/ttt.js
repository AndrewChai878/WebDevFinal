export default{

    //clears the board
    newGame(){
        let board = new Array(3);
        for (let i = 0; i < board.length; i++){
            board[i] = new Array(3);
        }
        //initialize all values to -1
        for (let i = 0; i < board.length; i++){
            for (let j = 0; j < board.length; j++){
                board[i][j] = -1;
            }
        }

        return board;
    }



}