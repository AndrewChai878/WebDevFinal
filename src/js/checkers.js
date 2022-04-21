export default{
    generateBoard(){
        // flush counters
        numReds = 12
        numBlacks = 12

        // flush board
        board = []
        for(let i = 0; i < 8; i++){
            board.push([0,0,0,0,0,0,0,0])
        }

        /**
         * 1 = red pawn
         * 2 = red king
         * 3 = black pawn
         * 4 = black king
         */

        //set red pieces
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 8; j++){
                if(i%2==0){
                    if(j%2 != 0){ board[i][j] = 1}
                }else{
                    if(j%2 == 0){ board[i][j] = 1}
                }
            }
        }

        // set black pieces
        for(let i = 5; i < 8; i++){
            for(let j = 0; j < 8; j++){
                if(i%2==0){
                    if(j%2 != 0){ board[i][j] = 3}
                }else{
                    if(j%2 == 0){ board[i][j] = 3}
                }
            }
        }
        
        return board
    },

    // this function is used for assigning the colors to each square
    updateCounter(){
        if(counter % 8 == 0){
            alternate = !alternate;
            counter = 0;
        }
        let c = counter + alternate;
        counter += 1
        return c;
    },

    // get the list of available moves for the selected piece i.e., [30,32,...,ij]
    getMoves(position, piece, followUp){
        let i = parseInt(position[0])
        let j = parseInt(position[1])
        let moves = ''

        switch(piece){
            case 1:
                moves = this.moveRed(i,j,followUp)
                break;
            case 2:
                moves = this.moveKing(i,j,piece,followUp)
                break;
            case 3:
                moves = this.moveBlack(i,j,followUp)
                break;
            case 4:
                moves = this.moveKing(i,j,piece,followUp)
                break
        }

        return this.parseMoves(moves)
    },

    getFollowUpMoves(position, piece){
        return this.getMoves(position,piece,true)
    },

    // red pieces can only move downwards
    moveRed(i,j,followUp){
        let s = ''
    
        // check left diagonal
        if(this.checkLegal(i+1,j-1)){
            // if the square has a black piece
            if(board[i+1][j-1] == 3 || board[i+1][j-1] == 4){
                if(this.checkLegal(i+2,j-2) && board[i+2][j-2] == 0){
                    s+= (''+(i+2)+(j-2))
                }
            // if the square is empty
            }else if(board[i+1][j-1] == 0 && !followUp){
                s += (''+(i+1)+(j-1))
            }
        }

        // check right diagonal
        if(this.checkLegal(i+1,j+1)){
            // if the square has a black piece
            if(board[i+1][j+1] == 3 || board[i+1][j+1] == 4){
                if(this.checkLegal(i+2,j+2) && board[i+2][j+2] == 0){
                    s+= (''+(i+2)+(j+2))
                }
            // if the square is empty
            }else if(board[i+1][j+1] == 0 && !followUp){
                s += (''+(i+1)+(j+1))
            }
        }
        return s
    },

    // black pieces can only move upwards
    moveBlack(i,j,followUp){
        let s = ''
    
        // check left diagonal
        if(this.checkLegal(i-1,j-1)){
            // if the square has a red piece
            if(board[i-1][j-1] == 1 || board[i-1][j-1] == 2){
                if(this.checkLegal(i-2,j-2) && board[i-2][j-2] == 0){
                    s+= (''+(i-2)+(j-2))
                }
            // if the square is empty
            }else if(board[i-1][j-1] == 0 && !followUp){
                s += (''+(i-1)+(j-1))
            }
        }

        // check right diagonal
        if(this.checkLegal(i-1,j+1)){
            // if the square has a red piece
            if(board[i-1][j+1] == 1 || board[i-1][j+1] == 2){
                if(this.checkLegal(i-2,j+2) && board[i-2][j+2] == 0){
                    s+= (''+(i-2)+(j+2))
                }
            // if the square is empty
            }else if(board[i-1][j+1] == 0 && !followUp){
                s += (''+(i-1)+(j+1))
            }
        }
        return s
    },

    moveKing(i,j,piece,followUp){
        let s = ''
        let enemy = 3
        let enemyKing = 4
        if(piece == 4){
            enemy = 1
            enemyKing = 2
        }

        // check left diagonal down
        if(this.checkLegal(i+1,j-1)){
            // if the square has an enemy piece
            if(board[i+1][j-1] == enemy || board[i+1][j-1] == enemyKing){
                if(this.checkLegal(i+2,j-2) && board[i+2][j-2] == 0){
                    s+= (''+(i+2)+(j-2))
                }
            // if the square is empty
            }else if(board[i+1][j-1] == 0 && !followUp){
                s += (''+(i+1)+(j-1))
            }
        }

        // check left diagonal up
        if(this.checkLegal(i-1,j-1)){
            // if the square has an enemy piece
            if(board[i-1][j-1] == enemy || board[i-1][j-1] == enemyKing){
                if(this.checkLegal(i-2,j-2) && board[i-2][j-2] == 0){
                    s+= (''+(i-2)+(j-2))
                }
            // if the square is empty
            }else if(board[i-1][j-1] == 0 && !followUp){
                s += (''+(i-1)+(j-1))
            }
        }
        
        // check right diagonal down
        if(this.checkLegal(i+1,j+1)){
            // if the square has a friendly piece
            if(board[i+1][j+1] == enemy || board[i+1][j+1] == enemyKing){
                if(this.checkLegal(i+2,j+2) && board[i+2][j+2] == 0){
                    s+= (''+(i+2)+(j+2))
                }
            // if the square is empty
            }else if(board[i+1][j+1] == 0 && !followUp){
                s += (''+(i+1)+(j+1))
            }
        }

        // check right diagonal up
        if(this.checkLegal(i-1,j+1)){
            // if the square has a friendly piece
            if(board[i-1][j+1] == enemy || board[i-1][j+1] == enemyKing){
                if(this.checkLegal(i-2,j+2) && board[i-2][j+2] == 0){
                    s+= (''+(i-2)+(j+2))
                }
            // if the square is empty
            }else if(board[i-1][j+1] == 0 && !followUp){
                s += (''+(i-1)+(j+1))
            }
        }

        return s
    },

    setCount(piece){
        if(piece == 1 || piece == 2){
            numBlacks-=1
        }else{
            numReds-=1
        }
    },

    checkWin(){
        if(numReds == 0){
            return 'black'
        }
        if(numBlacks == 0){
            return 'red'
        }
        return ''
    },

    // returns a boolean, true if the move is legal else false
    // a legal move is a move that is within the bounds of the board
    checkLegal(i,j){
        if((i > -1 && i < 8) && (j > -1 && j < 8)){
            return true
        }
        return false;
    },

    // helper function to split a string of moves into a list
    parseMoves(s){
        let moves = s.match(/.{2}/g)
        if(moves == null){
            return []
        }
        return moves
    },

}

// array representing the board
let board = []

// these variables are used with the updateCounter function
let counter = 0;
let alternate = false;

// variables for storing pieces
let numReds = 12;
let numBlacks = 12;