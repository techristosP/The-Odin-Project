
function getComputerChoice() {
    const randomNumber = Math.floor(Math.random() * 3);
    const choices = ['rock', 'paper', 'scissors'];  
    if (randomNumber === 0) {
      return choices[0];
    }
    else if (randomNumber === 1) {
      return choices[1];
    }
    else {
      return choices[2];
    }
}

function getPlayerChoice() {
    let playerChoice;
    do {
      playerChoice = prompt('Choose rock, paper or scissors').toLowerCase();
    }
    while (playerChoice !== 'rock' && playerChoice !== 'paper' && playerChoice !== 'scissors');
    return playerChoice;
} 

let roundWinner; //tie = -1, player = 1, computer = 0
function playRound(playerSelection, computerSelection) {   
  if (playerSelection == computerSelection) {
      roundWinner = -1;
      // alert("It's a draw! Play again!")
      return "It's a draw!";
  }
    else if ((playerSelection == 'rock' && computerSelection == 'scissors') || (playerSelection == 'paper' && computerSelection == 'rock') || (playerSelection == 'scissors' && computerSelection == 'paper')) {
      roundWinner = 1; 
      // alert("It's a win! Play again!")
      return 'You Win! ' + playerSelection.charAt(0).toUpperCase() + playerSelection.substring(1) + ' beats ' + computerSelection.charAt(0).toUpperCase() + computerSelection.substring(1);
    }
    else {
      roundWinner = 0;
      // alert("It's a loss! Play again!")
      return 'You Lose! ' + computerSelection.charAt(0).toUpperCase() + computerSelection.substring(1) + ' beats ' + playerSelection.charAt(0).toUpperCase() + playerSelection.substring(1);
    }
  }


// const playerSelection = 'rock';
// const computerSelection = getComputerChoice();
// console.log(playRound(playerSelection, computerSelection));

function game() {
    let playerScore = 0;
    let computerScore = 0;
    let round = 0;
    
    while (round < 5) {
        const playerSelection = getPlayerChoice();
        const computerSelection = getComputerChoice();
        const result = playRound(playerSelection, computerSelection);

        if (roundWinner == 1) {
            playerScore++;
        }else if (roundWinner == 0) {
            computerScore++;
        }
        console.log(result);
        round++;

    }
    console.log("\n");
    console.log(playerScore > computerScore ? "GAME OVER! You win the game!" : (playerScore < computerScore ? "You lose the game!" : "It's a draw!"));
    console.log("Final score: " + playerScore + " - " + computerScore);
}

game();