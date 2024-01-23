let winner = null;
let tie = false;
let player1 = null;
let player2 = null;



const gameBoard = (() => {
    let board = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];

    const printBoard = () => {
        console.log(board[0] + " | " + board[1] + " | " + board[2]);
        console.log(board[3] + " | " + board[4] + " | " + board[5]);
        console.log(board[6] + " | " + board[7] + " | " + board[8]);

    }

    const positionAvailable = (position) => {
        if (board[position] == "-") {
            return true;
        } else {
            return false;
        }
    }

    const setMark = (position, mark) => {
        board[position] = mark;

        // on canvas
        const cell = document.getElementById(position);
        cell.innerHTML = mark;
    }

    const clearBoard = () => {
        board = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
    }

    const checkWinner = () => {
        const winConditions = [
            [0, 1, 2],  // top row
            [3, 4, 5],  // middle row
            [6, 7, 8],  // bottom row
            [0, 3, 6],  // left column
            [1, 4, 7],  // middle column
            [2, 5, 8],  // right column
            [0, 4, 8],  // left diagonal
            [2, 4, 6]   // right diagonal
        ];

        for (let i = 0; i < winConditions.length; i++) {
            const [a, b, c] = winConditions[i];
            // console.log(a + " " + b + " " + c);
            if (board[a] != "-" && board[a] == board[b] && board[a] == board[c]) {
                console.log(player1);
                winner = (board[a] == player1.mark) ? player1 : player2;

                return true;
            }
        }
        return false;
    }

    const isGameOver = () => {
        // Check for winner
        if (checkWinner()) {
            // console.log("We have a winner");
            return true;
        }

        // Check for empty positions
        for (let i = 0; i < board.length; i++) {
            if (board[i] == "-") {
                // gameOver = false;
                return false;
            }
        }

        // It is a tie
        tie = true;
        return true;
    }

    return { clearBoard, positionAvailable, setMark, isGameOver, printBoard };

})();



const createPlayer = (num) => {
    const name = document.querySelector(`#p${num}-name`).value;
    const mark = (num == 1) ? "X" : "O";
    return { name, mark };
}

// const gameL = () => {
//     // player1 = createPlayer(1);
//     // player2 = createPlayer(2);

//     // // console.log("Welcome to Tic Tac Toe\n\n");
//     // // console.log(player1.name + " is " + player1.mark);
//     // // console.log(player2.name + " is " + player2.mark + "\n\n");


//     // let currentPlayer = player1;

//     // const changePlayer = () => {
//     //     if (currentPlayer == player1) {
//     //         currentPlayer = player2;
//     //     } else {
//     //         currentPlayer = player1;
//     //     }
//     // }

//     // const getCurrentPlayer = () => { return currentPlayer; }

//     // const turn = () => {
//     //     let position;
//     //     do {
//     //         console.log("Enter position: ");
//     //         position = prompt()-1;
//     //     } while (!gameBoard.positionAvailable(position));

//     //     // position = Math.floor(Math.random() * 9);

//     //     gameBoard.setMark(position, currentPlayer.mark);
//     //     changePlayer();
//     // }

//     // while (!gameBoard.isGameOver()) {
//     //     gameBoard.printBoard();
//     //     console.log(currentPlayer.name + "'s turn\n");
//     //     turn();
//     //     console.log("\n\n");
//     // }

//     // gameBoard.printBoard();
//     // console.log("Game Over");

//     // if (tie) {
//     //     console.log("It's a tie!");
//     // } else {
//     //     console.log(winner.name + " wins!");
//     // }

//     return { changePlayer, currentPlayer };
// };



const createGame = () => {

    gameBoard.clearBoard();
    winner = null;
    tie = false;


    // const game = gameL();
    player1 = createPlayer(1);
    player2 = createPlayer(2);

    let currentPlayer = player1;

    const changePlayer = () => {
        if (currentPlayer == player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
    }

    const canvas = document.createElement('div');
    canvas.setAttribute('class', 'canvas');
    // canvas.style.width = 600;
    // canvas.style.height = 600;
    // canvas.style.backgroundColor = 'white';
    document.body.appendChild(canvas);

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.setAttribute('class', 'cell');
        cell.setAttribute('id', i);
        canvas.appendChild(cell);

        cell.addEventListener('click', () => {
            if (gameBoard.positionAvailable(i)) {
                console.log('WORKS');
                gameBoard.setMark(i, currentPlayer.mark);
                changePlayer();
                console.log(currentPlayer.mark);
                if (gameBoard.isGameOver()) {
                    const gameOver = document.createElement('div');
                    gameOver.setAttribute('class', 'game-over');
                    gameOver.innerHTML = "GAME OVER!";
                    gameOver.innerHTML += (tie) ? "<br>It's a tie!" : "<br>" + winner.name + " wins!";
                    document.body.appendChild(gameOver);
                }
            }
        });
    }
}

function play() {
    if (document.querySelector('.canvas')) {
        document.querySelector('.canvas').remove();
    }
    if (document.querySelector('.game-over')) {
        document.querySelector('.game-over').remove();
    }

    createGame();
}