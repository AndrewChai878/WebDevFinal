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
    },

    // finds if the coin the user passed (1 or 2) has a winning combination somewhere in the board
    findWin(coin, row, col){
        // check horizontal
        if(this.checkWinHorizontal(coin,row)){
            return true
        }
        // check vertical
        if(this.checkWinVertical(coin,col)){
            return true
        }
        // check diagonal
        if(this.checkWinDiag(coin,row,col)){
            return true
        }
        return false; 
    },

    checkWinHorizontal(coin,row){
        //count is how many times in a row coin appears
        let max = 0
        let current = 0
        for(let j = 0; j < 7; j++){
            if(board[row][j] == coin){
                current+=1
                max = Math.max(max,current)
            }else{
                current = 0
            }
        }
        return max > 3 ? true : false
        
    },

    checkWinVertical(coin,col){
        //count is how many times in a row coin appears
        let max = 0
        let current = 0
        for(let i = 0; i < 6; i++){
            if(board[i][col] == coin){
                current+=1
                max = Math.max(max,current)
            }else{
                current = 0
            }
        }
        return max > 3 ? true : false
    },

    checkWinDiag(coin,row,col){
        let count = 1
        // upper left diagonal
        for(let i = 1; i<4;i++){
            if(this.checkInBounds(row-i,col-i) && board[row-i][col-i] == coin){
                count += 1
            }else{
                break
            }    
        }

        // lower right diagonal
        for(let i = 1; i<4;i++){
            if(this.checkInBounds(row+i,col+i) && board[row+i][col+i] == coin){
                count += 1
            }else{
                break
            }    
        }

        if(count > 3){return true}

        count = 1
        // upper right diagonal
        for(let i = 1; i<4;i++){
            if(this.checkInBounds(row-i,col+i) && board[row-i][col+i] == coin){
                count += 1
            }else{
                break
            }    
        }

        // lower left diagonal
        for(let i = 1; i<4;i++){
            if(this.checkInBounds(row+i,col-i) && board[row+i][col-i] == coin){
                count += 1
            }else{
                break
            }    
        }

        return count > 3 ? true : false

    },

    checkInBounds(row,col){
        if (row < 0 || row > 5){
            return false
        }else if(col < 0 || col > 6){
            return false
        }
        return true
    }

}

// array representing the board
let board = []