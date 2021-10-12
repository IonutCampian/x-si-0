const game = document.getElementById("game");
const restart = document.getElementById("restart");
var player = "X"
createBoard();

function playerChange() {
    if(player == "X")
    {
        player = "0";
    }
    else {
        player = "X"
    }
}

let gameStatus =[["", "", ""],
                ["", "", ""],
                ["", "", ""]];
function checkForWinner(line, collumn, player) {
    var counter = 0;
    for(var i = 0; i < 3; ++i){
        if(gameStatus[line][i] == player){
            ++counter;
        }
    }
    if(counter == 3) {
        return true;
    }
    counter = 0;
    for(var i = 0; i < 3; ++i) {
        if(gameStatus[i][collumn] == player) {
            ++counter;
        }
    }
    if(counter == 3) {
        return true;
    }
    counter = 0;
    if(line == collumn) {
        for(var i = 0; i < 3; ++i) {
            if(gameStatus[i][i] == player) {
                ++counter;
            }
        }
    }
    if(counter == 3) {
        return true;
    }
    counter = 0;
    if(line + collumn == 3-1) {
        for(var i = 0; i < 3; ++i) { 
            if(gameStatus[i][3-i+1] == player){
                ++counter;
            }
        }
    }
    if (counter == 3) {
        return true;
    }
    return false;
}

function restartTheGame() {
   document.reload;
}

function createBoard(){
    let line, col;
    for(var i = 0; i < 9; ++i) {
        let createDiv = document.createElement("div");
        line = Math.round((i+2)/3)-1;
        col = Math.round(i % 3);
        createDiv.setAttribute("l", line);
        createDiv.setAttribute("c", col);
        game.appendChild(createDiv);
    }
}
function checkForDraw() {
    var drawCheck = 0
    for(var i = 0; i < 3; ++i){
        for(var j = 0; j <3; ++j) {
            if(gameStatus[i][j] != ''){
                ++drawCheck;
            }
        }
    }
    if(drawCheck == 9) {
        return true;
    }
    return false;
}
var turn = 0;
game.addEventListener('click', (e) => {
    const pressed = e.target;
    var checkLine = parseInt(pressed.getAttribute('l'));
    var checkCol = parseInt(pressed.getAttribute('c'));
    if(pressed.innerHTML == ""){
        pressed.innerHTML = player;
        gameStatus[checkLine][checkCol] = player;
        if(player == "X") {
            document.getElementById('turn').innerText = "0's Turn!"
        } else {
            document.getElementById('turn').innerText = "X's Turn!"
        }
    }
    else {
        alert("nope!");
        playerChange();
    } 
    ++turn
    if(checkForWinner(checkLine, checkCol, player)){
        document.getElementById('winner').textContent = "PLAYER " +player +" has won!";
     }   
    playerChange();
    if(checkForDraw()) {
        document.getElementById('winner').textContent ="It's a tie!";
    }
})


