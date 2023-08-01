class Board {

    constructor(){
        this.state = [" "," "," "," "," "," "," "," "," "];
    }
    
    checkMoveStillAvailable(){
        let takenSquareCount = 0;
        for (let i = 0; i < this.state.length; i++){
            if (this.state[i] !== " "){
                takenSquareCount++;
            }   
        }
        if (takenSquareCount === 9) {
            return false;
        }
        else {
            return true;
        }
    }

    checkSquareIsEmpty(square) {
        if (this.state[square] === "O" || this.state[square] === "X"){
            return false;
        }
        else {
            return true;
        }
    }

    update(square,symbol){
        this.state[square] = symbol;
    }

    render(){
        console.log("\n");
        console.log("  " + this.state[0] + "  ¦  " + this.state[1] + "  ¦  " + this.state[2] +"  ");
        console.log("-----------------");
        console.log("  " + this.state[3] + "  ¦  " + this.state[4] + "  ¦  " + this.state[5] +"  ");
        console.log("-----------------");
        console.log("  " + this.state[6] + "  ¦  " + this.state[7] + "  ¦  " + this.state[8] +"  ");
        console.log("\n");
    }



    checkForWin(){
        if(this.state[0] === "O" && this.state[1] === "O" && this.state[2] === "O"){
            return "noughtsWins";
        }
        if(this.state[3] === "O" && this.state[4] === "O" && this.state[5] === "O"){
            return "noughtsWins";
        }
        if(this.state[6] === "O" && this.state[7] === "O" && this.state[8] === "O"){
            return "noughtsWins";
        }
        if(this.state[0] === "O" && this.state[3] === "O" && this.state[6] === "O"){
            return "noughtsWins";
        }
        if(this.state[1] === "O" && this.state[4] === "O" && this.state[7] === "O"){
            return "noughtsWins";
        }
        if(this.state[2] === "O" && this.state[5] === "O" && this.state[8] === "O"){
            return "noughtsWins";
        }
        if(this.state[0] === "O" && this.state[4] === "O" && this.state[8] === "O"){
            return "noughtsWins";
        }
        if(this.state[2] === "O" && this.state[4] === "O" && this.state[6] === "O"){
            return "noughtsWins";
        }
        
        if(this.state[0] === "X" && this.state[1] === "X" && this.state[2] === "X"){
            return "crossesWins";
        }
        if(this.state[3] === "X" && this.state[4] === "X" && this.state[5] === "X"){
            return "crossesWins";
        }
        if(this.state[6] === "X" && this.state[7] === "X" && this.state[8] === "X"){
            return "crossesWins";
        }
        if(this.state[0] === "X" && this.state[3] === "X" && this.state[6] === "X"){
            return "crossesWins";
        }
        if(this.state[1] === "X" && this.state[4] === "X" && this.state[7] === "X"){
            return "crossesWins";
        }
        if(this.state[2] === "X" && this.state[5] === "X" && this.state[8] === "X"){
            return "crossesWins";
        }
        if(this.state[0] === "X" && this.state[4] === "X" && this.state[8] === "X"){
            return "crossesWins";
        }
        if(this.state[2] === "X" && this.state[4] === "X" && this.state[6] === "X"){
            return "crossesWins";
        }
        return false;
    }
      
}



function newGame (){
   return new Board;
}


function initialiseGame(){

    //if \n used with prompt, the prompt appears twice, hence no \n below:
    let playerInput = prompt('Shall we play a game? y/n  ');

    
    if(playerInput.toLowerCase() === "y"){
        return true;
    }
    else if(playerInput.toLowerCase() === "n"){
        return false; 
    }
    else{
        console.log("Type y or n, please");
        return false;
    }

}

function renderInputNumbersDemo(){
    console.log("\nOn your move, you must enter a number corresponding to the square you wish to play:");
    console.log("\n");
    console.log("  1  ¦  2  ¦  3  ");
    console.log("-----------------");
    console.log("  4  ¦  5  ¦  6  ");
    console.log("-----------------");
    console.log("  7  ¦  8  ¦  9  ");
    console.log("\n");
    
}


function selectFirstMovePlayer(){
    
    let noughts;
    let crosses;

    const randonNum = Math.random();
    if (randonNum <= 0.4999) {
        noughts = true;
        crosses = false;
        console.log("\nNoughts will make the first move\n");
    }
    else {
        noughts = false;
        crosses = true;
        console.log("\nCrosses will make the first move\n");
    }

    return {"noughts":noughts,"crosses":crosses};

}

const prompt=require("prompt-sync")({sigint:true});

//async function main(){
function main(){
    
    let chooseToPlay = initialiseGame();
    
    let board;
    if (chooseToPlay === true) {
        board = newGame();
    }
    else if (chooseToPlay === false) {
        return 0;
    }


    renderInputNumbersDemo();

    const firstMovePlayerChoice = selectFirstMovePlayer();
    let noughts = firstMovePlayerChoice.noughts;
    let crosses = firstMovePlayerChoice.crosses;

    let currentPlayer;
    if (noughts === true) {
        currentPlayer = "Noughts";
    }
    else {
        currentPlayer = "Crosses";
    }
    
    
    board.render();

    let square = 0; //Variable that receives player input when making move 
        
        
    while (board.checkMoveStillAvailable() === true && board.checkForWin() === false){
        
        square = Number(prompt(`Enter square number (between 1 and 9) to make your move, ${currentPlayer}:  `));
        square -= 1;
        
            
        if (board.checkSquareIsEmpty(square) === true) {
           noughts === true? board.update(square,"O") : board.update(square,"X")
        }
        else {
            continue;
        }


        board.render();

        //Change player, for next move
        const temp = noughts;
        noughts = crosses;
        crosses = temp;
        if (noughts === true) {
            currentPlayer = "Noughts";
        }
        else {
            currentPlayer = "Crosses";
        }

    }


    if (board.checkForWin() === "noughtsWins") {
        console.log("Noughts wins\n")
    }
    else if (board.checkForWin() === "crossesWins") {
        console.log("Crosses wins\n")
    }
    else {
        console.log("It is a draw\n")
    }

}

main();
 








