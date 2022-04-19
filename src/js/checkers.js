export default{
    generateBoard(){
        let board = []
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

}

//these variables are used with the updateCounter function
let counter = 0;
let alternate = false;