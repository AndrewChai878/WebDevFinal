export default {

    //function for creating a 12x12 array to hold the internal 8x8 board with a padding
    generateEmptyBoard(){
        let offset = 2;

        //initialize board to 12x12, easier for checking legal moves
        let board = new Array(12);
        for (let i = 0; i < board.length; i++){
            board[i] = new Array(12);
        }
        //initialize all values to 99
        for (let i = 0; i < board.length; i++){
            for (let j = 0; j < board.length; j++){
                board[i][j] = 99;
            }
        }
        //set actual game squares to 0
        //uses and offset of 2 
        //to ensure playable area has a 2 tile buffer around it
        for (let i = 0; i < 8; i++){
            for (let j = 0; j < 8; j++){
                board[i+offset][j+offset] = 0;
            }
        }

        return board;
    },

    //takes in a blank 12x12 board and sets all of the values for default chess pieces
    setBoard(board){
        let offset = 2;
        /*
        Squares represented as 0
        Actual pieces represented as integers
        Positive integers for white negative for black
        pawn = 1
        knight = 2
        bishop = 3
        rook = 4
        queen = 5
        king = 6
        */
    
        //set white pawns
        for (let i = 0; i < 8; i++){
            board[i+offset][1+offset] = 1; 
        }
    
        //set black pawns
        for (let i = 0; i < 8; i++){
            board[i+offset][6+offset] = -1; 
        }
    
        //set white peices 
        board[offset][offset] = 4
        board[offset+1][offset] = 2
        board[offset+2][offset] = 3
        board[offset+3][offset] = 5
        board[offset+4][offset] = 6
        board[offset+5][offset] = 3
        board[offset+6][offset] = 2
        board[offset+7][offset] = 4
    
        //set black pieces
        board[offset][offset+7] = -4
        board[offset+1][offset+7] = -2
        board[offset+2][offset+7] = -3
        board[offset+3][offset+7] = -5
        board[offset+4][offset+7] = -6
        board[offset+5][offset+7] = -3
        board[offset+6][offset+7] = -2
        board[offset+7][offset+7] = -4
    
        return board;
    }


}