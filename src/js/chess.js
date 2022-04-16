
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
            board[6+offset][i+offset] = 1; 
        }
    
        //set black pawns
        for (let i = 0; i < 8; i++){
            board[1+offset][i+offset] = -1; 
        }
    
        //set white peices 
        board[offset+7][offset] = 4
        board[offset+7][offset+1] = 2
        board[offset+7][offset+2] = 3
        board[offset+7][offset+3] = 5
        board[offset+7][offset+4] = 6
        board[offset+7][offset+5] = 3
        board[offset+7][offset+6] = 2
        board[offset+7][offset+7] = 4
    
        //set black pieces
        board[offset][offset] = -4
        board[offset][offset+1] = -2
        board[offset][offset+2] = -3
        board[offset][offset+3] = -5
        board[offset][offset+4] = -6
        board[offset][offset+5] = -3
        board[offset][offset+6] = -2
        board[offset][offset+7] = -4
    
        return board;
    },

    kingInCheck(board, s){
        /*
        This is gonna be quite the big boy function 
        The point of it is to check to see if there is a king in check  
        
        logic flow:
        Looks left to right from the king for a rook or a queen
        Looks up and down from the king for a rook or a queen
        Looks diagonally for a queen or bishop
        Looks for a knight in an L shape away from the king 
        
        note: it returns if in check after each search to make sure it doesn't keep looking
            because if you're in check your're in check! more than 1 check is still check.
        */
        let in_check = false;
        let king_loc = [null,null];
        let loc_check;

        //find the current location of the king
        //king value is either 6 or -6, s is 1 or -1
        //6 * side will give us either black or white king
        for(let i = 0; i < 12; i++){
            for(let j = 0; j < 12; j++){
                if(board[i][j] == 6*s){
                    king_loc = [i,j];
                }
            }
        }

        //check if an enemy rook or queen can take current king
        //horizontally or veritcally

        //check left from square one left of king all the way to end of board
        for(let i = king_loc[1] - 1; i > 0; i--){
            loc_check = board[king_loc[0]][i];
            //if out of the board
            if(loc_check == 99){
                break;
            }
            //if piece is on own side
            if(Math.sign(loc_check) == Math.sign(s)){
                break;
            }
            //if run in to a piece that is a queen or rook before own piece
            if(Math.abs(loc_check) == 5 || Math.abs(loc_check) == 4){
                in_check = true;
                return in_check;
            }
            //if a piece has been run in to and its not own side and is not rook or queen then
            //must be enemy peice and not giving check
            if(Math.abs(loc_check) != 0){
                break;
            }
        }

        //check right from square one right of king to end of board
        for(let i = king_loc[1] + 1; i < 12; i++){
            loc_check = board[king_loc[0]][i];
            //if out of the board
            if(loc_check == 99){
                break;
            }
            //if piece is on own side
            if(Math.sign(loc_check) == Math.sign(s)){
                break;
            }
            //if run in to a piece that is a queen or rook before own piece
            if(Math.abs(loc_check) == 5 || Math.abs(loc_check) == 4){
                in_check = true;
                return in_check;
            }
            //if a piece has been run in to and its not own side and is not rook or queen then
            //must be enemy peice and not giving check
            if(Math.abs(loc_check) != 0){
                break;
            }
        }

        if (in_check){
            console.log("check!");
            return true;
        }

        //check from one square up to the end of the board
        for(let i = king_loc[0] + 1; i < 12; i++){
            loc_check = board[i][king_loc[1]];
            //if out of the board
            if(loc_check == 99){
                break;
            }
            //if piece is on own side
            if(Math.sign(loc_check) == Math.sign(s)){
                break;
            }
            //if run in to a piece that is a queen or rook before own piece
            if(Math.abs(loc_check) == 5 || Math.abs(loc_check) == 4){
                in_check = true;
                return in_check;
            }
            //if a piece has been run in to and its not own side and is not rook or queen then
            //must be enemy peice and not giving check
            if(Math.abs(loc_check) != 0){
                break;
            }
        }

        //check from one square down to the end of the board
        for(let i = king_loc[0] - 1; i > 0; i--){
            loc_check = board[i][king_loc[1]];
            //if out of the board
            if(loc_check == 99){
                break;
            }
            //if piece is on own side
            if(Math.sign(loc_check) == Math.sign(s)){
                break;
            }
            //if run in to a piece that is a queen or rook before own piece
            if(Math.abs(loc_check) == 5 || Math.abs(loc_check) == 4){
                in_check = true;
                return in_check;
            }
            //if a piece has been run in to and its not own side and is not rook or queen then
            //must be enemy peice and not giving check
            if(Math.abs(loc_check) != 0){
                break;
            }
        }

        //look diagonally down and to the right for a bishop or queen
        for(let i = 1; i < 8; i++){
            loc_check = board[king_loc[0] + i][king_loc[1] + i];
            //console.log("HELLO?", loc_check);
            //if our of board
            if(loc_check == 99){
                break;
            }
            //if piece is on own side
            if(Math.sign(loc_check) == Math.sign(s)){
                break;
            }
            //if run in to a piece that is a queen or bishop before own piece
            if(Math.abs(loc_check) == 5 || Math.abs(loc_check) == 3){
                in_check = true;
                return in_check;
            }
            //if a piece has been run in to and its not own side and is not rook or queen then
            //must be enemy peice and not giving check
            if(Math.abs(loc_check) != 0){
                break;
            }
        }

        //look diagonally up and to the right for a bishop or queen
        for(let i = 1; i < 8; i++){
            loc_check = board[king_loc[0] - i][king_loc[1] + i];
            //console.log("HELLO?", loc_check);
            //if our of board
            if(loc_check == 99){
                break;
            }
            //if piece is on own side
            if(Math.sign(loc_check) == Math.sign(s)){
                break;
            }
            //if run in to a piece that is a queen or bishop before own piece
            if(Math.abs(loc_check) == 5 || Math.abs(loc_check) == 3){
                in_check = true;
                return in_check;
            }
            //if a piece has been run in to and its not own side and is not rook or queen then
            //must be enemy peice and not giving check
            if(Math.abs(loc_check) != 0){
                break;
            }
        }

        //look diagonally up and to the left for a bishop or queen
        for(let i = 1; i < 8; i++){
            loc_check = board[king_loc[0] - i][king_loc[1] - i];
            //console.log("HELLO?", loc_check);
            //if our of board
            if(loc_check == 99){
                break;
            }
            //if piece is on own side
            if(Math.sign(loc_check) == Math.sign(s)){
                break;
            }
            //if run in to a piece that is a queen or bishop before own piece
            if(Math.abs(loc_check) == 5 || Math.abs(loc_check) == 3){
                in_check = true;
                return in_check;
            }
            //if a piece has been run in to and its not own side and is not rook or queen then
            //must be enemy peice and not giving check
            if(Math.abs(loc_check) != 0){
                break;
            }
        }

        //look diagonally down and to the left for a bishop or queen
        for(let i = 1; i < 8; i++){
            loc_check = board[king_loc[0] + i][king_loc[1] - i];
            //console.log("HELLO?", loc_check);
            //if our of board
            if(loc_check == 99){
                break;
            }
            //if piece is on own side
            if(Math.sign(loc_check) == Math.sign(s)){
                break;
            }
            //if run in to a piece that is a queen or bishop before own piece
            if(Math.abs(loc_check) == 5 || Math.abs(loc_check) == 3){
                in_check = true;
                return in_check;
            }
            //if a piece has been run in to and its not own side and is not rook or queen then
            //must be enemy peice and not giving check
            if(Math.abs(loc_check) != 0){
                break;
            }
        }

        //check for an enemy knight
        /*
        need to check 8 squares in an L shape around the king
            j-1     j+1
            i-2     i-2
        j-2             j+2
        i-1             i-1
                king
                king
        j-2             j+2
        i+1             i+1
            j-1     j+1
            i+2     i+2
        
        */
        let i = king_loc[0];
        let j = king_loc[1];

        if (board[i-2][j-1] == (2*-1*s)){return true;}
        if (board[i-2][j+1] == (2*-1*s)){return true;}
        if (board[i-1][j-2] == (2*-1*s)){return true;}
        if (board[i-1][j+2] == (2*-1*s)){return true;}
        if (board[i+1][j-2] == (2*-1*s)){return true;}
        if (board[i+1][j+2] == (2*-1*s)){return true;}
        if (board[i+2][j-1] == (2*-1*s)){return true;}
        if (board[i+2][j+1] == (2*-1*s)){return true;}

        //check for a pawn

        //if white
        if (s == 1){
            if (board[i-1][j+1] == (-1)){return true;}
            if (board[i-1][j-1] == (-1)){return true;}
        }
        if (s == -1){
            if (board[i+1][j+1] == (1)){return true;}
            if (board[i+1][j-1] == (1)){return true;}
        }

        return in_check;

    },

    //checkLegalMove(board, active_i, active_j, target_i, target_j){
    //    
    //}

    

}