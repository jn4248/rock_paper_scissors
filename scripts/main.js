
// Request user to inut one of three play choices "ROCK", "PAPER", or
// "SCISSORS".  Format the choice to all capital letters before returning.
function playerPlay() {
  let acceptableChoice = ["R", "P", "S", null];
  let playerHand;
  // prompt player, while screening out unacceptable answers
  do {
    playerHand =  window.prompt("Please make your selection by typing either 'R' for Rock,' 'P' for 'Paper,' or 'S' for 'Scissors'.\n(Pressing 'Cancel' will end the match.)");
    if (playerHand != null) {
      playerHand = playerHand.slice(0,1).toUpperCase();
    }
  } while (!acceptableChoice.includes(playerHand));
  if (playerHand == "R"){
    return "ROCK";
  } else if (playerHand == "P") {
    return "PAPER";
  } else if (playerHand == "S") {
    return "SCISSORS";
  } else {
    return playerHand;  // null case (user cancelled prompt)
  }
}

// Randomly return one of three play choices (formatted in capital letters)
function computerPlay() {
  let randomToHundred = Math.floor((Math.random() * 100) + 1); // 1 through 100, inclusive
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
function playRound(playerSelection, computerSelection) {
  let playerComputerHand = playerSelection + " " + computerSelection;//`${playerSelection} ${computerSelection}`;
  let winCase = ["PAPER ROCK", "ROCK SCISSORS", "SCISSORS PAPER"];
  let loseCase = ["ROCK PAPER", "SCISSORS ROCK", "PAPER SCISSORS"];
  let tieCase = ["ROCK ROCK", "PAPER PAPER", "SCISSORS SCISSORS"];
  let result = [];
  if (winCase.includes(playerComputerHand)){
    result = ["player", `You Win! ${playerSelection} beats ${computerSelection}.`];
  } else if (loseCase.includes(playerComputerHand)){
    result = ["computer", `You Lose! ${playerSelection} is beaten by ${computerSelection}.`];
  } else if (tieCase.includes(playerComputerHand)){
    result = ["tie", `You Tied! ${playerSelection} is the same as ${computerSelection}.\nReplay this round:`];
  } else {
    result = ["", ""]; // occurs if  user cancels prompte in playerPlay()
  }
  return result;
}

// returns 2 item array: [true/false, "player"/"computer"/"none]
// position 0 indicates if a winner exists, position 1 is who won.
// Different consideration if number of rounds is even or odd.
function reportWinnerStatus(numRounds, playerScore, computerScore) {
  winner = [false, "none"];
  let totalRoundsPlayed = playerScore + computerScore;
  let minRoundsToQualify = Math.floor(numRounds/2) + 1;
  if (playerScore >= minRoundsToQualify && playerScore > computerScore){
    winner= [true, "player"];
  } else if (computerScore >= minRoundsToQualify && computerScore > playerScore){
    winner= [true, "computer"];
  }
  return winner;
}

function scoreMessage(playerScore, computerScore) {
  return `Score: Player: ${playerScore} Computer: ${computerScore}`;
}

// returns true if player wants to play again.
function playAgain() {
  let acceptableAnswer = ["y", "Y", "n", "N", null];
  let continueOptions = ["y", "Y"];
  let playerAnswer;
  // prompt player, while screening out unacceptable answers
  do {
    playerAnswer =  window.prompt("Would you like to play another match? ('Y' or 'N').\n(Pressing 'Cancel' will end the game.)");
  } while (!acceptableAnswer.includes(playerAnswer));

  if (continueOptions.includes(playerAnswer)) {
    return true;
  } else {
    return false;
  }
}

// sectino divider for clarity in console output
function displayHorizontalRule() {
  console.log("_______________________________________");
}

// Run a match, with the number of rounds set by variable numRounds.
// Continues running additional matches unless user selects "N" at prompt.
function game(numRounds) {
  console.log("Let's play a game of 'Rock Paper Scissors'.");
  let keepPlaying = true;
  let tieRound = false;
  let playerScore = 0;
  let computerScore = 0;
  let playerChoice;    // rock,paper,scissors
  let computerChoice;  // rock,paper,scissors
  let result;  // round result (array) returned from playRound()
  let matchWinner;
  while (keepPlaying) {
    console.log(`Best out of ${numRounds} rounds wins the match!`);
    console.log("We start with...");
    console.log(scoreMessage(playerScore, computerScore));
    displayHorizontalRule();
    // Round of Play
    for (let i = 1; i < numRounds + 1; i++) {
      console.log(`Round ${i}:`);
      playerChoice = playerPlay();
      if (playerChoice == null) {
        console.log("Player has cancelled the match");
        console.log(scoreMessage(playerScore, computerScore));
        displayHorizontalRule();
        break;
      }
      do {
        computerChoice = computerPlay();
        result = playRound(playerChoice, computerChoice);
        console.log(result[1]);
        if (result[0] == "tie") {
          tieRound = true;
          playerChoice = playerPlay();
        } else {
          // recover from a first attempt in round resulting tie
          tieRound = false;
        }
        if (playerChoice == null) {
          // case where after a tie, user cancels prompt in same round
          break;
        }
      } while (tieRound);
      //round won: update and show score, and reset tie tracking variable
      if (result[0] == "player") {
        playerScore += 1;
      } else if (result[0] == "computer") {
        computerScore += 1;
      }
      console.log(scoreMessage(playerScore, computerScore));
      displayHorizontalRule();
      noTie = true;
      // declare winner if one party has majority of rounds won.
      matchWinner = reportWinnerStatus(numRounds, playerScore, computerScore);
      if (matchWinner[0] == true) {
        break;
      }
    }
    // end of match...show outcome
    if (playerChoice == null) {
      console.log("Match over...Nobody wins! Player cancelled the match.");
    } else {
      console.log(`Match Over...${matchWinner[1]} Wins!`);
    }
    displayHorizontalRule();
    // Prompt player to play again or not.
    let playAnotherMatch = playAgain();
    if (playAnotherMatch == true) {
      console.log("Great! I'll prepare a new match...");
      playerScore = 0;
      computerScore = 0;
      matchWinner = [false, "none"];
    } else {
      keepPlaying = false;
      console.log("Thank you for playing. Goodbye");
      console.log("Please refresh this page, if you wish to play again.");
      console.log("Or click the 'game-start' button, if working...");
    }
  }
}

// listener for "start game button".
// Default is set to run 5 rounds per match.
var btn = document.querySelector('#game-start');
btn.addEventListener('click', () => {
  game(5);
});
