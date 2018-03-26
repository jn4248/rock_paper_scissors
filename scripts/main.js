

let playerHand = "NONE";   // rock,paper,scissors, none
let computerHand = "NONE";  // rock,paper,scissors, none
let playerScore = 0;
let computerScore = 0;
let gameOver = false;

// element where printToGameLog(message) will add in-game update messages
const gameLog = document.getElementById('gameLog');
const playerScoreBoard = document.getElementById('playerScoreBoard');
const computerScoreBoard = document.getElementById('computerScoreBoard');

// listener for "Start Game Button".
const startButton = document.getElementById('buttonStart');
startButton.addEventListener('click', function() {
  numberRounds = getNumberRounds();
  playGame(numberRounds);
});

// listener for "Cancel Button".
const cancelButton = document.getElementById('buttonCancel');
cancelButton.addEventListener('click', function() {
});

// listener for "Rock Button".
const rockButton = document.getElementById('buttonRock');
rockButton.addEventListener('click', function() {
  setPlayerHand("ROCK");
});

// listener for "Paper Button".
const paperButton = document.getElementById('buttonPaper');
paperButton.addEventListener('click', function() {
  setPlayerHand("PAPER");
});

// listener for "Scissors Button".
const scissorsButton = document.getElementById('buttonScissors');
scissorsButton.addEventListener('click', function() {
  setPlayerHand("SCISSORS");
});

// listener for "Instructions Button"
const instructionsButton = document.getElementById('buttonInstructions');
instructionsButton.addEventListener('click', toggleInstructions);


function setPlayerHand(hand) {
  playerHand = hand;
}

function resetPlayerHand() {
  playerhand = "NONE"
}

// Randomly return one of three play choices (formatted in capital letters)
function setComputerHand() {
  let randomToHundred = Math.floor((Math.random() * 100) + 1); // 1 through 100
  if (randomToHundred <= 33) {
   return "ROCK";
 } else if (randomToHundred <= 66) {
    return "PAPER";
  } else {
   return "SCISSORS";
  }
}

// Determine the winner of a round, given the choice of each player, in
// the form of  "ROCK", "PAPER", or "SCISSORS".
// The Choices must be preformatted in all capital letters.
// Returns array of 2 strings: the winner or "tie", and the
// message to display the outcome of the round.
function determineRoundWinner() {
  let combinedHands = `${playerHand} ${computerHand}`;
  let winCase = ["PAPER ROCK", "ROCK SCISSORS", "SCISSORS PAPER"];
  let loseCase = ["ROCK PAPER", "SCISSORS ROCK", "PAPER SCISSORS"];
  let tieCase = ["ROCK ROCK", "PAPER PAPER", "SCISSORS SCISSORS"];
  let result = [];
  if (winCase.includes(combinedHands)){
    result = ["player", `You Win! ${playerHand} beats ${computerHand}.`];
  } else if (loseCase.includes(combinedHands)){
    result = ["computer", `You Lose! ${playerHand} loses to ${computerHand}.`];
  } else if (tieCase.includes(combinedHands)){
    result = ["tie", `We Tied! ${playerHand} is the same as ${computerHand}.\nReplay this round:`];
  } else {
    // occurs if  user cancels prompte in playerPlay()
    result = ["cancel", "Player has cancelled the match."];
  }
  return result;
}

// returns 2 item array: [true/false, "player"/"computer"/"none]
// position 0 indicates if a winner exists, position 1 is who won.
// Different consideration if number of rounds is even or odd.
function reportWinnerStatus(numRounds) {
  winner = [false, "Nobody"];
  let majorityToWin = Math.floor(numRounds/2) + 1;
  if (playerScore >= majorityToWin){
    winner= [true, "Player"];
  } else if (computerScore >= majorityToWin){
    winner= [true, "Computer"];
  }
  return winner;
}

// section divider for clarity in console output
function displayHorizontalRule() {
  horizontalLine = document.createElement('hr');
  gameLog.appendChild(horizontalLine);
}

// remove all child elements of the gamelog
function clearGameLog() {
  while (gameLog.hasChildNodes()) {
      gameLog.removeChild(gameLog.lastChild);
  }
}


// update the html scoreboard with the current score
function updateScoreBoard() {
  playerScoreBoard.textContent = playerScore;
  computerScoreBoard.textContent = computerScore;
}

// update scores after a round is won
function updateScore(winner) {
  if (winner == "player") {
    playerScore++;
  } else if (winner == "computer") {
    computerScore++;
  }
  updateScoreBoard();
}

// runs one round, and returns the winner ("Player" or "Computer") or "Cancel"
function playRound() {
  printToGameLog("Players turn. Please select your hand:");
  let result = [];  // from determineRoundWinner()
  let count = 0;
  let isTie = true;
  resetPlayerHand();
  // repeat round if result is a tie
  while (isTie) {
    // wait for user to select a button: rock, paper, scissors, or cancel
    while(playerHand == "NONE") {
      setTimeout(remindPlayer(count), 200);
      count++
    }
    computerHand = setComputerPlay();
    result = determineRoundWinner();
    printToGameLog(result[1]);
    // exit if not a tie round
    if (result[0] != "tie") {
      isTie = false;
    }
    // leave the round if player clicks "cancel"
    // if (result[0] == "cancel") {
    //   displayHorizontalRule();
    //   break;
    // }
  }
  return result[0];
}

function remindPlayer(count) {
  // console.log("Player = " + playerHand);
  if (count % 25 == 0) {
    printToGameLog("Hey, I'm waiting for you! Please select a hand:");
    console.log("HEY, I'M WAITING FOR YOU!!!!!!");
  }
}

function playGame(numRounds) {
  let gameOver = false;
  let playerScore = 0;
  let computerScore = 0;
  let matchWinner = reportWinnerStatus(numRounds); // initiate to default
  // clear the game log of messages if a game has already been played
  clearGameLog();
  updateScoreBoard();
  // start game
  printToGameLog("Let's play a game of 'Rock Paper Scissors'.");
  printToGameLog(`Best out of ${numRounds} rounds wins the match!`);
  displayHorizontalRule();

  // Rounds of Play
  for (let i = 1; i < numRounds + 1; i++) {
    printToGameLog(`Round ${i}:`);
    roundWinner = playRound();

    // leave  match if player clicks "cancel"
    if (roundWinner == "cancel") {
      displayHorizontalRule();
      break;
    }
    //round won: updatescore
    updateScore();
    displayHorizontalRule();
    // declare winner if one party has majority of rounds won.
    matchWinner = reportWinnerStatus(numRounds);
    if (matchWinner[0] == true) {
      break;
    }
  }

  // end of match...show outcome
  printToGameLog(`Match Over...${matchWinner[1]} Wins!`);
  displayHorizontalRule();
  printToGameLog("Thanks for playing!");
  printToGameLog("Click the 'start' button to play again. (If desirec, adjust the number of rounds first)");
}


// add a message to the end of the gamelog
function printToGameLog(message) {
  let p = document.createElement('p');
  p.textContent = message;
  gameLog.appendChild(p);
  // force scroll bar to bottom to show latest update
  gameLog.scrollTop = gameLog.scrollHeight;
}

function getNumberRounds() {
  let roundSelectMenu = document.getElementById('selectRounds');
  let numberRounds = roundSelectMenu.value;
  console.log("Inside getNumberRounds()");
  console.log(".value = " + numberRounds);
  return numberRounds;
}




function toggleInstructions() {
  let container = document.querySelector('.container-instructions');
  let items = container.children;
  let hidden = container.classList.contains('hide');
  if (hidden) {
    // show instructions
    container.classList.remove('hide');
    // wrap class changes in setTimeout(), because they occur just after changing from a state of display:none (class 'hide')
    window.setTimeout(function(){
      container.classList.add('slide-down');
      for (let i=0; i < items.length; i++) {
        items[i].classList.add('opacity-full');
      }
    }, 10);
  } else {
    // remove/hide instructions
    for (let i=0; i < items.length; i++) {
      items[i].classList.remove('opacity-full');
    }
    container.classList.remove('slide-down');
    // set timer length to wait for transitions set in class "container-instructions"
    window.setTimeout(function(){container.classList.add('hide');}, 1050);
  }
}
