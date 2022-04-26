export default{
    generateBoard(){
        // flush board
        board = []
        for(let i = 0; i < 6; i++){
            board.push([0,0,0,0,0,0,0])
        }
        return board
    }

}

// array representing the board
let board = []