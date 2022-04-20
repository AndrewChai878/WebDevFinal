
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
            //console.log("check!");
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

    
    //This function takes in the game board and the i and j coord of a piece
    //Return an array of tuples which contain potential targets for that piece
    //This array will need to be pruned by seeing if the move will lead to check
    getPotentialMoves(board, i, j){
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
        //console.log(i,j)
        //console.log(board[i][j])
    
        let offset = 2;
        i = i+offset;
        j = j+offset;
        let potential_moves = [];
        let source = board[i][j];

        //console.log(i,j)
        //console.log(board[i][j])

        
        //if the source square is empty return an empty array
        if (source == 0){
            return potential_moves;
        }   
        //if the piece in the square is a king return the squares that are empty
        //or are enemy
        //king needs to look 1 square in all directions
        if (Math.abs(source) == 6){
            if (enemyOrEmpty(source, board[i+1][j+1])){potential_moves.push([i+1,j+1])}
            if (enemyOrEmpty(source, board[i+1][j])){potential_moves.push([i+1,j])}
            if (enemyOrEmpty(source, board[i+1][j-1])){potential_moves.push([i+1,j-1])}
            if (enemyOrEmpty(source, board[i][j-1])){potential_moves.push([i,j-1])}
            if (enemyOrEmpty(source, board[i][j+1])){potential_moves.push([i,j+1])}
            if (enemyOrEmpty(source, board[i-1][j+1])){potential_moves.push([i-1,j+1])}
            if (enemyOrEmpty(source, board[i-1][j])){potential_moves.push([i-1,j])}
            if (enemyOrEmpty(source, board[i-1][j-1])){potential_moves.push([i-1,j-1])}
        
            //return because piece can only be of one type
            return potential_moves;
        }

        //queen needs to look all the way in all directions
        //until she hits a friendly piece, enemy piece or end of board
        if (Math.abs(source) == 5){
            //look up
            for (let k = i-1; k > 0; k--){
                if (enemyOrEmpty(source, board[k][j])){potential_moves.push([k,j]);}
                else {break;}
                if (enemyPiece(source, board[k][j])){break;}
            }
            //look down
            for (let k = i+1; k < 12; k++){
                if (enemyOrEmpty(source, board[k][j])){potential_moves.push([k,j]);}
                else {break;}
                if (enemyPiece(source, board[k][j])){break;}
            }
            //look left
            for (let k = j-1; k > 0; k--){
                if (enemyOrEmpty(source, board[i][k])){potential_moves.push([i,k]);}
                else {break;}
                if (enemyPiece(source, board[i][k])){break;}
            }
            //look right
            for (let k = j+1; k < 12; k++){
                if (enemyOrEmpty(source, board[i][k])){potential_moves.push([i,k]);}
                else {break;}
                if (enemyPiece(source, board[i][k])){break;}
            }
            //look diagonal up to the left
            for(let k = 1; k < 8; k++){
                if (enemyOrEmpty(source, board[i-k][j-k])){potential_moves.push([i-k,j-k]);}
                else {break;}
                if (enemyPiece(source, board[i-k][j-k])){break;}
            }
            //look diagonal up to the right
            for(let k = 1; k < 8; k++){
                if (enemyOrEmpty(source, board[i-k][j+k])){potential_moves.push([i-k,j+k]);}
                else {break;}
                if (enemyPiece(source, board[i-k][j+k])){break;}
            }
            //look diagonal down to the left
            for(let k = 1; k < 8; k++){
                if (enemyOrEmpty(source, board[i+k][j-k])){potential_moves.push([i+k,j-k]);}
                else {break;}
                if (enemyPiece(source, board[i+k][j-k])){break;}
            }
            //look diagonal down to the right
            for(let k = 1; k < 8; k++){
                if (enemyOrEmpty(source, board[i+k][j+k])){potential_moves.push([i+k,j+k]);}
                else {break;}
                if (enemyPiece(source, board[i+k][j+k])){break;}
            }

            return potential_moves;

        }

        //if rook look left, right, up, down
        if (Math.abs(source) == 4) {
            //look up
            for (let k = i-1; k > 0; k--){
                if (enemyOrEmpty(source, board[k][j])){potential_moves.push([k,j]);}
                else {break;}
                if (enemyPiece(source, board[k][j])){break;}
            }
            //look down
            for (let k = i+1; k < 12; k++){
                if (enemyOrEmpty(source, board[k][j])){potential_moves.push([k,j]);}
                else {break;}
                if (enemyPiece(source, board[k][j])){break;}
            }
            //look left
            for (let k = j-1; k > 0; k--){
                if (enemyOrEmpty(source, board[i][k])){potential_moves.push([i,k]);}
                else {break;}
                if (enemyPiece(source, board[i][k])){break;}
            }
            //look right
            for (let k = j+1; k < 12; k++){
                if (enemyOrEmpty(source, board[i][k])){potential_moves.push([i,k]);}
                else {break;}
                if (enemyPiece(source, board[i][k])){break;}
            }

            return potential_moves;
        }

        //if bishop look on diagonals
        if (Math.abs(source) == 3){
            //look diagonal up to the left
            for(let k = 1; k < 8; k++){
                if (enemyOrEmpty(source, board[i-k][j-k])){potential_moves.push([i-k,j-k]);}
                else {break;}
                if (enemyPiece(source, board[i-k][j-k])){break;}
            }
            //look diagonal up to the right
            for(let k = 1; k < 8; k++){
                if (enemyOrEmpty(source, board[i-k][j+k])){potential_moves.push([i-k,j+k]);}
                else {break;}
                if (enemyPiece(source, board[i-k][j+k])){break;}
            }
            //look diagonal down to the left
            for(let k = 1; k < 8; k++){
                if (enemyOrEmpty(source, board[i+k][j-k])){potential_moves.push([i+k,j-k]);}
                else {break;}
                if (enemyPiece(source, board[i+k][j-k])){break;}
            }
            //look diagonal down to the right
            for(let k = 1; k < 8; k++){
                if (enemyOrEmpty(source, board[i+k][j+k])){potential_moves.push([i+k,j+k]);}
                else {break;}
                if (enemyPiece(source, board[i+k][j+k])){break;}
            }

            return potential_moves;
        }

        //if knight check in knight shaped pattern
        if (Math.abs(source) == 2){
            /*
            need to check 8 squares in an L shape around the knight
                j-1     j+1
                i-2     i-2
            j-2             j+2
            i-1             i-1
                    knight
                    knight
            j-2             j+2
            i+1             i+1
                j-1     j+1
                i+2     i+2
            
            */
    
            if (enemyOrEmpty(source,board[i-2][j-1])){potential_moves.push([i-2,j-1]);}
            if (enemyOrEmpty(source,board[i-2][j+1])){potential_moves.push([i-2,j+1]);}
            if (enemyOrEmpty(source,board[i-1][j-2])){potential_moves.push([i-1,j-2]);}
            if (enemyOrEmpty(source,board[i-1][j+2])){potential_moves.push([i-1,j+2]);}
            if (enemyOrEmpty(source,board[i+1][j-2])){potential_moves.push([i+1,j-2]);}
            if (enemyOrEmpty(source,board[i+1][j+2])){potential_moves.push([i+1,j+2]);}
            if (enemyOrEmpty(source,board[i+2][j-1])){potential_moves.push([i+2,j-1]);}
            if (enemyOrEmpty(source,board[i+2][j+1])){potential_moves.push([i+2,j+1]);}

            return potential_moves;
        }

        //pawns slightly tricker, need to capture diagonally "forward" (only if enemy is there)
        //need to only be able to move 1 forward
        //need to be able to move 2 squares forward if they havent moved
        //white pawn
        if (source == 1){
            //if square in front is empty
            if (board[i-1][j] == 0){
                potential_moves.push([i-1,j]);
            }
            //if pawn is on initial square
            if (i == 8 && board[i-2][j] == 0){
                potential_moves.push([i-2,j]);
            }
            //if pawn can capture diagonal left
            if ((Math.sign(source) != Math.sign(board[i-1][j-1])) && (board[i-1][j-1] != 99) &&(board[i-1][j-1] != 0)){
                potential_moves.push([i-1,j-1]);
            }
            //if pawn can capture diagonal right
            if ((Math.sign(source) != Math.sign(board[i-1][j+1])) && board[i-1][j+1] != 99 && (board[i-1][j+1] != 0)){
                potential_moves.push([i-1,j+1]);
            }
            return potential_moves;
        }
        //black pawn
        if (source == -1){
            //if square in front is empty
            if (board[i+1][j] == 0){
                potential_moves.push([i+1,j]);
            }
            //if pawn is on initial square
            if (i == 3 && board[i+2][j] == 0){
                potential_moves.push([i+2,j]);
            }
            //if pawn can capture diagonal left
            if ((Math.sign(source) != Math.sign(board[i+1][j-1])) && (board[i+1][j-1] != 99) && (board[i+1][j-1] != 0)){
                potential_moves.push([i+1,j-1]);
            }
            //if pawn can capture diagonal right
            if ((Math.sign(source) != Math.sign(board[i+1][j+1])) && (board[i+1][j+1] != 99) && (board[i+1][j+1] != 0)){
                potential_moves.push([i+1,j+1]);
            }
            return potential_moves;
        }

        return potential_moves;
        
    },
    //once we have candidate moves we need to prune the ones which would leave us in check
    //take in the board, indices of piece to move and array of potential moves
    //return a list of legal moves from the potential moves
    pruneIllegalMoves(board, i, j, potential_moves){
        let offset = 2;
        i = i+offset;
        j = j+offset;
        let temp_board = [];
        for (let k = 0; k < board.length; k++){
            temp_board[k] = board[k].slice();
        }
        //console.log(temp_board);
        let piece = temp_board[i][j];
        let side = Math.sign(piece)*1;
        let legal_moves = [];
        //for every potential move make the move on the temp board
        //see if the side that is moving is in check
        //if there is no check then the move is legal
        for (let k = 0; k < potential_moves.length; k++){
            let move = potential_moves[k];
            temp_board[move[0]][move[1]] = piece;
            temp_board[i][j] = 0;
            if (!this.kingInCheck(temp_board, side)){
                legal_moves.push(move);
            }
            for (let k = 0; k < board.length; k++){
                temp_board[k] = board[k].slice();
            }
            piece = temp_board[i][j];
        }
        
        //make sure taking the king is not in the list of legal moves
        for (let k = 0; k < board.length; k++){
            temp_board[k] = board[k].slice();
        }
        let k = legal_moves.length;
        while (k--){
            if (k < 0){
                break;
            }
            if (Math.abs(temp_board[legal_moves[k][0]][legal_moves[k][1]]) == 6){
                legal_moves.splice(k,1);
            }
        }
        
        return legal_moves;
    },

    //get all legal moves in a postition for a side
    //takes in current board and side to check for
    //returns an array of all legal moves in the position
    getAllLegalMoves(board, side){
        let temp_board = [];
        for (let k = 0; k < board.length; k++){
            temp_board[k] = board[k].slice();
        }
        let legal_moves = [];
        
        //look through every piece on the board
        for (let i = 0; i < 12; i ++){
            for (let j = 0; j < 12; j++){
                //if it is a piece of the correct side
                if (Math.sign(temp_board[i][j]) == Math.sign(side) && temp_board[i][j] != 0 && temp_board[i][j] != 99){
                    //get every potential move
                    let potential_moves = this.getPotentialMoves(temp_board, i-2, j-2);
                    //prune illegal moves
                    potential_moves = this.pruneIllegalMoves(temp_board, i-2 , j-2, potential_moves);
                    //append any legal moves to the legal moves array
                    for (let k = 0; k < potential_moves.length; k++){
                        legal_moves.push(potential_moves.slice()[k]);
                    }
                }
            }
        }

        return legal_moves;
    },

    //check if game is over
    //take in board and side that's turn it is
    //returns "false" if game is not over "checkmate" or "stalemate"
    isGameOver(board, side){
        let temp_board = [];
        for (let k = 0; k < board.length; k++){
            temp_board[k] = board[k].slice();
        }
        let legal_moves = this.getAllLegalMoves(temp_board, side);
        if (legal_moves.length == 0 && this.kingInCheck(board, side)){
            return "Checkmate";
        }
        else if (legal_moves.length == 0 && !this.kingInCheck(board, side)){
            return "Stalemate";
        }
        else{
            return "False";
        }
    },

    //check to see if castling is legal
    //take in the board, king which is to move, king flags, rook flags
    //return legal castling options
    getLegalCastling(board, side, king_flags, rook_flags){
        let legal_king_destinations = [];
        let temp_board = [];
        let would_be_check = false;
        for (let k = 0; k < board.length; k++){
            temp_board[k] = board[k].slice();
        }
        
        if (side == 1){
            //if the king has moved return empty moves
            if (king_flags[0] != false){
                return legal_king_destinations;
            }
            //if queen's rook hasnt moved
            //reset the temp board
            for (let k = 0; k < board.length; k++){
                temp_board[k] = board[k].slice();
            }
            if (rook_flags[2] == false){
                //check to see the squares needed are empty
                if ((temp_board[9][3] == 0) && (temp_board[9][4] == 0) && (temp_board[9][5] == 0)){
                    //check to see if the king is in check or would move in to check
                    would_be_check = false;
                    if (this.kingInCheck(temp_board, side)){
                        would_be_check = true;
                    }
                    temp_board[9][5] = 6;
                    temp_board[9][6] = 0;
                    if (this.kingInCheck(temp_board, side)){
                        would_be_check = true;
                    }
                    temp_board[9][4] = 6;
                    temp_board[9][5] = 0;
                    if (this.kingInCheck(temp_board, side)){
                        would_be_check = true;
                    }
                    temp_board[9][3] = 6;
                    temp_board[9][4] = 0;
                    if (this.kingInCheck(temp_board, side)){
                        would_be_check = true;
                    }
                    //if no check then push the coords of queen side castling
                    if (!would_be_check){
                        legal_king_destinations.push([9,4]);
                    }
                }
            }
            //if king's rook hasnt moved
            //reset the temp board
            for (let k = 0; k < board.length; k++){
                temp_board[k] = board[k].slice();
            }
            if (rook_flags[3] == false){
                //check to see the squares needed are empty
                if ((temp_board[9][7] == 0) && (temp_board[9][8] == 0)){
                    //check to see if the king is in check or would move in to check
                    would_be_check = false;
                    if (this.kingInCheck(temp_board, side)){
                        would_be_check = true;
                    }
                    temp_board[9][7] = 6;
                    temp_board[9][6] = 0;
                    if (this.kingInCheck(temp_board, side)){
                        would_be_check = true;
                    }
                    temp_board[9][8] = 6;
                    temp_board[9][7] = 0;
                    if (this.kingInCheck(temp_board, side)){
                        would_be_check = true;
                    }
                    //if no check then push the coords of queen side castling
                    if (!would_be_check){
                        legal_king_destinations.push([9,8]);
                    }
                }
            }
            return legal_king_destinations;
        }
        if (side == -1){
            //if the king has moved return empty moves
            if (king_flags[1] != false){
                return legal_king_destinations;
            }
            //if queen's rook hasnt moved
            //reset the temp board
            for (let k = 0; k < board.length; k++){
                temp_board[k] = board[k].slice();
            }
            if (rook_flags[0] == false){
                //check to see the squares needed are empty
                if ((temp_board[2][3] == 0) && (temp_board[2][4] == 0) && (temp_board[2][5] == 0)){
                    //check to see if the king is in check or would move in to check
                    would_be_check = false;
                    if (this.kingInCheck(temp_board, side)){
                        would_be_check = true;
                    }
                    temp_board[2][5] = -6;
                    temp_board[2][6] = 0;
                    if (this.kingInCheck(temp_board, side)){
                        would_be_check = true;
                    }
                    temp_board[2][4] = -6;
                    temp_board[2][5] = 0;
                    if (this.kingInCheck(temp_board, side)){
                        would_be_check = true;
                    }
                    temp_board[2][3] = -6;
                    temp_board[2][4] = 0;
                    if (this.kingInCheck(temp_board, side)){
                        would_be_check = true;
                    }
                    //if no check then push the coords of queen side castling
                    if (!would_be_check){
                        legal_king_destinations.push([2,4]);
                    }
                }
            }
            //if king's rook hasnt moved
            //reset the temp board
            for (let k = 0; k < board.length; k++){
                temp_board[k] = board[k].slice();
            }
            if (rook_flags[1] == false){
                //check to see the squares needed are empty
                if ((temp_board[2][7] == 0) && (temp_board[2][8] == 0)){
                    //check to see if the king is in check or would move in to check
                    would_be_check = false;
                    if (this.kingInCheck(temp_board, side)){
                        would_be_check = true;
                    }
                    temp_board[2][7] = -6;
                    temp_board[2][6] = 0;
                    if (this.kingInCheck(temp_board, side)){
                        would_be_check = true;
                    }
                    temp_board[2][8] = -6;
                    temp_board[2][7] = 0;
                    if (this.kingInCheck(temp_board, side)){
                        would_be_check = true;
                    }
                    //if no check then push the coords of queen side castling
                    if (!would_be_check){
                        legal_king_destinations.push([2,8]);
                    }
                }
            }
            return legal_king_destinations;
        }


    }

}

    //takes the value of a target
    //returns true if the target is an enemy or empty square
    //helpful for finding possible moves
    function enemyOrEmpty(source_piece, target_square){
        //if target not the same side
        //or target is empty
        //or target is 99 (out of bound)
        if (target_square == 99){
            return false;
        }
        if (target_square == 0){
            return true;
        }
        if (Math.sign(source_piece) != Math.sign(target_square)){
            return true;
        }

        return false;
        
    }
    //identify enemy Piece
    function enemyPiece(source_piece, target_square){
        if (target_square == 99){
            return false;
        }
        if ((Math.sign(source_piece) != Math.sign(target_square)) && (target_square != 0)){
            return true;
        }
        return false;
    }