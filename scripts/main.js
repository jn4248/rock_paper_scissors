let playerScore = 0;
let computerScore = 0;

// Request user to inut one of three play choices "ROCK", "PAPTER", or
// "SCISSORS".  Format the choice to all capital letters before returning.
function playerPlay() {
  let acceptableChoice = ["ROCK", "PAPER", "SCISSORS", null];
  let playerHand;
  do {
    playerHand =  window.prompt("Please make your selection by typing either 'rock' 'paper' or 'scissors'.\n('cancel' will end the match)");
    if (playerHand != null) {
      playerHand = playerHand.toUpperCase();
    }
  } while (!acceptableChoice.includes(playerHand));
  return playerHand;
}

// Randomly return one of three play choices (formatted in capital letters)
function computerPlay() {
  let x = Math.random();
  if ((0 < x) && (x <= 0.333)) {
   return "ROCK";
  } else if ((0.333 < x) && (x <= 0.666)) {
    return "ROCK";
  } else {
   return "ROCK";
  }
}

// Determine the winner of a round, given the choice of each player, in
// the form of "ROCK", "PAPER", or "SCISSORS".  Choice must be preformatted
// in all capital letters.
function playRound(playerSelection, computerSelection) {
  let result;
  let playerComputerHand = `${playerSelection} ${computerSelection}`;
  winCase = ["PAPER ROCK", "ROCK SCISSORS", "SCISSORS PAPER"];
  loseCase = ["ROCK PAPER", "SCISSORS ROCK", "PAPER SCISSORS"];
  tieCase = ["ROCK ROCK", "PAPER PAPER", "SCISSORS SCISSORS"];
  if (winCase.includes(playerComputerHand)){
    result = `You Win! ${playerSelection} beats ${computerSelection}.`;
    incrementPlayerScore();
  } else if (loseCase.includes(playerComputerHand)){
    result = `You Lose! ${playerSelection} is beaten by ${computerSelection}.`
    incrementComputerScore();
  } else if (tieCase.includes(playerComputerHand)){
    result = `You Tied! ${playerSelection} is the same as  ${computerSelection}.\nReplay this round:`
  } else {
    // will only occur if selection restriction in playerPlay() fails, or user selects "cancel" in playerPlay()
  }
  return result;
}

function showScore() {
  return `Score: Player: ${playerScore} Computer: ${computerScore}`;
}

function incrementPlayerScore() {
  playerScore += 1;
}

function incrementComputerScore() {
  computerScore += 1;
}

function resetScores() {
  playerScore = 0;
  computerScore = 0;
}

function displayHorizontalRule() {
  console.log("_______________________________________");
}

// Run a match, with the number of rounds set by variable numRounds.
// Continues running additional matches unless user selects "N" at prompt.
function game(numRounds) {
  let keepPlaying = true;
  console.log("Let's play a game of 'Rock Paper Scissors'.");
  let noTie = true;
  let roundAttempts = 0;
  let playerChoice;   // rock,paper,scissors
  let computerChoice; // rock,paper,scissors
  let result;         // message returned form playRound()
  while (keepPlaying) {
    console.log(`Best out of ${numRounds} rounds wins the match!`);
    console.log("We start with...");
    console.log(showScore(playerScore, computerScore));
    displayHorizontalRule();
    for (let i = 0; i < numRounds; i++) {
      console.log("Round " + (i + 1));
      playerChoice = playerPlay();
      if (playerChoice != null) {
        while (noTie) {
          if (roundAttempts > 0) {
            playerChoice = playerPlay();
          }
          computerChoice = computerPlay();
          if (playerChoice == null) {
            break;    // case where player cancels round after a tie
          }
          result = playRound(playerChoice, computerChoice);
          if (result.slice(4,8) != "Tied") {
            // this round has a winner
            noTie = false;
          }
          console.log(result);
          roundAttempts += 1;
        }
      }
      if (playerChoice == null) {
        console.log("Player has cancelled the match");
        console.log(showScore());
        displayHorizontalRule();
        break;
      }
      console.log(showScore());
      displayHorizontalRule();
      noTie = true;
      roundAttempts = 0;
    }
    // end of match...show outcome
    if (playerChoice == null) {
      console.log("Match over...Nobody wins! Player cancelled the match.")
    } else if (playerScore > computerScore) {
      console.log("Match Over...Player Wins!");
    } else if (playerScore < computerScore) {
      console.log("Match Over...Computer Wins!");
    } else {
      console.log("Match Over...Nobody wins! The match is a Tie.");
    }
    displayHorizontalRule();
    // User chooses whether to play again or not.
    let acceptableAnswer = ["y", "Y", "n", "N", null];
    let playerAnswer = "";
    do {
      playerAnswer =  window.prompt("Would you like to play another match? ('Y' or 'N').\n('Cancel' will also end the game)");
    } while (!acceptableAnswer.includes(playerAnswer));
    if (playerAnswer == "n" || playerAnswer == "N" || playerAnswer == null) {
      keepPlaying = false;
      console.log("Thank you for playing. Goodbye");
      console.log("Please refresh this page, if you wish to play again.")
    } else {
      console.log("Great! I'll prepare a new match...");
      resetScores();
    }
  }
}

// run the game when page loads. Set to run 5 rounds per match.
game(5);
