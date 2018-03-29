
// global variables
let playerScore = 0;
let computerScore = 0;
let roundsPerMatch = 3; // set default until user selects from menu
let currentRound = 1;
let matchOver = true;

// button elements
const roundSelectMenu = document.getElementById('selectRounds');
const playerScoreBoard = document.getElementById('playerScoreBoard');
const computerScoreBoard = document.getElementById('computerScoreBoard');
const matchLog = document.getElementById('matchLog');

/**
  *   EVENT LISTNERS
  *
  */

// listener for "Start Match Button".
const startButton = document.getElementById('buttonStart');
startButton.addEventListener('click', function() {
  if (matchOver) {
    setTimeout(setNewMatch(), 500);
  } else {
    let restart = confirm("End current match to begin another?");
    if (restart == true) {
      displayHorizontalRule();
      printToMatchLog("Player has restarted a new match.");
      setTimeout(function() {setNewMatch()}, 1000);
    }
  }
});

// listener for "Cancel Button".
const cancelButton = document.getElementById('buttonCancel');
cancelButton.addEventListener('click', function() {
  if (!matchOver) {
    let cancel = confirm("Are you sure you want to end the match?");
    if (cancel == true) {
      matchOver = true;
      printToMatchLog("Player has cancelled the match.");
      matchEndMessage();
    }
  } else {
    alert("No game currently being played");
  }
});

// listener for "Rock Button".
const rockButton = document.getElementById('buttonRock');
rockButton.addEventListener('click', playRound.bind(null, "ROCK"));

// listener for "Paper Button".
const paperButton = document.getElementById('buttonPaper');
paperButton.addEventListener('click', playRound.bind(null, "PAPER"));

// listener for "Scissors Button".
const scissorsButton = document.getElementById('buttonScissors');
scissorsButton.addEventListener('click', playRound.bind(null, "SCISSORS"));

// listener for "Instructions Button"
const instructionsButton = document.getElementById('buttonInstructions');
instructionsButton.addEventListener('click', toggleInstructions);


/**
  *   FUNCTIONS FOR MESSAGES AND INFO TO THE USER
  *
  */

/*  (my own note on printToMatchLog():
  Using the defaults, you can pass...
  1. Content only: defautl tag and classes apply.  )
  2. Content and Tag: default calles applies.
  3. Content, Tag, and Class.
  note: passing only tag, or only tag and class, will mess things up)
*/
// add html element to the end of the matchlog
// default is a 'p' element, with no classes
// classNames must be an array: eg. ['bold', 'container']
function printToMatchLog(content, tag = 'p', classNames = []) {
  let elem = document.createElement(tag);
  elem.textContent = content;
  if (classNames.length > 0) {
    elem.classList.add(...classNames);
  }
  matchLog.appendChild(elem);
  // force scroll bar to bottom to show latest update
  matchLog.scrollTop = matchLog.scrollHeight;
}

// section divider for clarity in console output
function displayHorizontalRule() {
  horizontalLine = document.createElement('hr');
  matchLog.appendChild(horizontalLine);
}

// returns string with first character capitalized,
// and all other characters lower-case.
function capitalizeFirstCharacter(string) {
  let firstChar = string[0].toUpperCase();
  let remainder = string.slice(1).toLowerCase();
  return firstChar + remainder;
}

// display the instructions panel (toggles in and out via sliding)
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
    // set timer length to wait for transitions set in class "container-instructions" (should be slightly longer than longes transition)
    window.setTimeout(function(){container.classList.add('hide');}, 2550);
  }
}

function matchEndMessage() {
  displayHorizontalRule();
  printToMatchLog("Thanks for playing!");
  printToMatchLog("Click the 'start' button to play again.");
  printToMatchLog("(If desired, adjust the number of rounds before clicking 'start')");
}


/**
  *   SET, RESET, AND UPDATE UTILITY FUNCTIONS
  *
  */

// set the number of rounds per match, from the html select menu
function setRoundsPerMatch() {
  roundsPerMatch = roundSelectMenu.value;
}

function resetScores() {
  playerScore = 0;
  computerScore = 0;
}

function resetCurrentRound() {
  currentRound = 1;
}

// remove all child elements from the matchlog
function clearMatchLog() {
  while (matchLog.hasChildNodes()) {
    matchLog.removeChild(matchLog.lastChild);
  }
}

// Set and Reset variables and html for a new match
function setNewMatch() {
  resetCurrentRound();
  setRoundsPerMatch();
  resetScores();
  updateScoreBoard();
  clearMatchLog();
  printToMatchLog("Let's play a game of 'Rock Paper Scissors'.");
  printToMatchLog(`Best out of ${roundsPerMatch} rounds wins the match!`);
  displayHorizontalRule();
  printToMatchLog(`Round ${currentRound}:`, 'h4', ['log-title']);
  printToMatchLog("Player's turn. Please select your hand:");
  matchOver = false;
}

// update the html scoreboard with the current score
function updateScoreBoard() {
  playerScoreBoard.textContent = playerScore;
  computerScoreBoard.textContent = computerScore;
}

// update scores if the round result is a winner (player or computer)
// Will function as long as "result" is a string (eg: "TIE", "OTHER"...)
function updateScore(result) {
  if (result == "PLAYER") {
    playerScore++;
  } else if (result == "COMPUTER") {
    computerScore++;
  }
  updateScoreBoard();
}


/**
  *   LOGIC FUNCTIONS TO CONTROL THE GAME
  *
  */

// Randomly return one of three play choices for the computer.
function selectComputerHand() {
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
// Returns PLAYER, COMPUTER, TIE, or OTHER (as a default debug case).
function checkRoundResult(playerHand, computerHand) {
  let combinedHands = `${playerHand} ${computerHand}`;
  let winCase = ["PAPER ROCK", "ROCK SCISSORS", "SCISSORS PAPER"];
  let loseCase = ["ROCK PAPER", "SCISSORS ROCK", "PAPER SCISSORS"];
  let tieCase = ["ROCK ROCK", "PAPER PAPER", "SCISSORS SCISSORS"];
  if (winCase.includes(combinedHands)){
    return "PLAYER";
  } else if (loseCase.includes(combinedHands)){
    return "COMPUTER";
  } else if (tieCase.includes(combinedHands)){
    return "TIE";
  } else {
    // default case to catch error in submitting hands
    return "OTHER";
  }
}

// return string message explaing result of the current round.
function getRoundResultMessage(result, playerHand, computerHand) {
  playerHand = capitalizeFirstCharacter(playerHand);
  computerHand = capitalizeFirstCharacter(computerHand);
  switch (result) {
    case "PLAYER":
      return `YOU WIN!  ${playerHand} beats ${computerHand}.`;
      break;
    case "COMPUTER":
      return `YOU LOSE!  ${playerHand} loses to ${computerHand}.`;
      break;
    case "TIE":
      return `WE TIED!  ${playerHand} is the same as ${computerHand}.`;
      break;
    default:
      // Default case for debugging
      return "Default Case. Hands were submitted in incorrect format.";
  }
}


// returns "PLAYER" or "COMPUTER" if a winner, otherwise returns "NONE"
function checkMatchWinnerStatus() {
  let majorityToWin = Math.floor(roundsPerMatch / 2) + 1;
  if (playerScore >= majorityToWin){
    return "PLAYER";
  } else if (computerScore >= majorityToWin){
    return "COMPUTER";
  } else {
    return "NONE"
  }
}

// Main Game Controler:
// Runs one round of a match (resulting in either a tie or win),
// and checks for a match winner
function playRound(hand) {
  // Only run if there is a match currently running
  if (!matchOver) {
    let playerChoice = hand;
    let computerChoice = selectComputerHand();
    let result = checkRoundResult(playerChoice, computerChoice);
    printToMatchLog(getRoundResultMessage(result, playerChoice, computerChoice), 'p', ['log-round-result']);
    updateScore(result);
    let matchWinner = checkMatchWinnerStatus();  // PLAYER, COMPUTER, or NONE
    if (matchWinner != "NONE") {
      // Match has a winner
      displayHorizontalRule();
      printToMatchLog(`Match Over...${matchWinner} Wins!`, 'h4', ['log-title']);
      matchEndMessage();
      matchOver = true;
    } else {
      // NO match winner:  if not a tie, update and announce new round
      if (result == "PLAYER" || result == "COMPUTER") {
        currentRound++;
        displayHorizontalRule();
        printToMatchLog(`Round ${currentRound}:`, 'h4', ['log-title']);
      }
      printToMatchLog("Player's turn:");
    }
  }
}
