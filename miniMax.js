var board = new Array(9);
var player = 0;
computerMove();

function computerMove() {
  let bestScore = -1000000;
  let bestMove = 0;
  for (let i = 0; i < 9; i++) {    
      if (board[i] == undefined) {
        board[i] = 0;
        let score = miniMax(board, 0, false);
        board[i] = undefined;        
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
  }
  board[bestMove] = 0;
  updateBoard()
}


function scores(num) {
  if(num == 0) {
    return 10
  }
  else if(num == 1) {
    return -10
  }
  else if(num == 5) {
    return 0
  }
}


function miniMax(board, depth, isMaximizing) {
  let result = checkGameOver(board);
  if (result != 3) {    
    return scores(result);    
  }
  if (isMaximizing) {
    let bestScore = -1000000;
    for(var i = 0; i < 9; i++) {
      if(board[i] == undefined) {
        board[i] = 0
        let score = miniMax(board, depth + 1, false);
        board[i] = undefined;
        if(score > bestScore){
          bestScore = score
        }
      }
    }
    return bestScore;
  }
  else {
    let bestScore = 1000000;
    for(var i = 0; i < 9; i++) {
      if(board[i] == undefined) {
        board[i] = 1
        let score = miniMax(board, depth + 1, true);
        board[i] = undefined;
        if(score < bestScore) {
          bestScore = score
        }
      }
    }
    return bestScore;
  }
}

function updateBoard() {
  var elements = document.getElementsByClassName("cell");
  for (var i = 0; i < 9; i++) {
    let innerElement = document.createElement("p");
    if (board[i] == 0) {
      innerElement.innerHTML = "X";
    } else if (board[i] == 1) {
      innerElement.innerHTML = "O";
    } else {
      innerElement.innerHTML = "-";
    }
    elements[i].innerHTML = "";
    elements[i].append(innerElement);
  }
  gameResult = checkGameOver(board)
  if (gameResult == 3) {
    if (player == 0) {
      player = 1;
    } else {
      player = 0;
      computerMove();
    }
  } else {
    resultElement = document.createElement('h1')
    if(gameResult == 0) {
      resultElement.innerHTML = "Computer Wins!"
    }
    else if(gameResult == 1) {
      resultElement.innerHTML = "You Win!"
    }
    else {
      resultElement.innerHTML = "Tie!"
    }
    document.getElementById('gameContainer').appendChild(resultElement)
  }
}

function playerClick(index) {
  if (checkGameOver(board) != 3) {
    return;
  }
  if (board[index] != undefined) {
    return;
  }
  board[index] = 1;
  updateBoard();
}

function checkGameOver(gameBoard) {
  if (
    gameBoard[0] == gameBoard[1] &&
    gameBoard[1] == gameBoard[2] &&
    gameBoard[2] != undefined
  ) {
    return gameBoard[0];
  } else if (
    gameBoard[3] == gameBoard[4] &&
    gameBoard[4] == gameBoard[5] &&
    gameBoard[5] != undefined
  ) {
    return gameBoard[3];
  } else if (
    gameBoard[6] == gameBoard[7] &&
    gameBoard[7] == gameBoard[8] &&
    gameBoard[8] != undefined
  ) {
    return gameBoard[6];
  } else if (
    gameBoard[0] == gameBoard[3] &&
    gameBoard[3] == gameBoard[6] &&
    gameBoard[6] != undefined
  ) {
    return gameBoard[0];
  } else if (
    gameBoard[1] == gameBoard[4] &&
    gameBoard[4] == gameBoard[7] &&
    gameBoard[7] != undefined
  ) {
    return gameBoard[1];
  } else if (
    gameBoard[2] == gameBoard[5] &&
    gameBoard[5] == gameBoard[8] &&
    gameBoard[8] != undefined
  ) {
    return gameBoard[2];
  } else if (
    gameBoard[0] == gameBoard[4] &&
    gameBoard[4] == gameBoard[8] &&
    gameBoard[8] != undefined
  ) {
    return gameBoard[0];
  } else if (
    gameBoard[2] == gameBoard[4] &&
    gameBoard[4] == gameBoard[6] &&
    gameBoard[6] != undefined
  ) {
    return gameBoard[2];
  } else {
    for (var i = 0; i < 9; i++) {
      if (gameBoard[i] == undefined) {
        return 3;
      }
    }
  }
  return 5;
}
