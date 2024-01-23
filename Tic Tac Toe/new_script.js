const Gameboard = (() => {
    let board = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];

    const createBoard = () => {
        const canvas = document.createElement('div');
        canvas.setAttribute('class', 'canvas');
        document.body.appendChild(canvas);

        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.setAttribute('class', 'cell');
            cell.setAttribute('id', i);
            canvas.appendChild(cell);

            cell.addEventListener('click', () => {
                Game.handleClick(i);
            });
        }
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

    const disableBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    }

    const resetBoard = () => {
        board = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
    }

    const getBoard = () => {
        return board;
    }
    return { getBoard, createBoard, disableBoard, resetBoard, positionAvailable, setMark };

})();


const createPlayer = (num) => {
    const name = document.querySelector(`#p${num}-name`).value;
    const mark = (num == 1) ? "X" : "O";
    return { name, mark };
}


const Game = (() => {
    let player1 = null;
    let player2 = null;
    let currentPlayer;
    let winner;
    let tie;

    const changePlayer = () => {
        currentPlayer = (currentPlayer == player1) ? player2 : player1;
    }

    const clearOldGame = () => {
        if (document.querySelector('.canvas')) {
            document.querySelector('.canvas').remove();
        }
        if (document.querySelector('.game-over')) {
            document.querySelector('.game-over').remove();
        }

        Gameboard.resetBoard();
        winner = null;
        tie = false;
    }

    const startGame = () => {
        player1 = createPlayer(1);
        player2 = createPlayer(2);
        currentPlayer = player1;

        Gameboard.createBoard();


    }

    const handleClick = (i) => {
        // const position = e.target.id;
        const position = i;
        console.log(position);
        if (Gameboard.positionAvailable(position)) {
            // console.log(currentPlayer.mark);
            Gameboard.setMark(position, currentPlayer.mark);
            changePlayer();
            if (isGameOver()) {
                showGameOver();

                Gameboard.disableBoard();
            }
        }
    }

    const showGameOver = () => {
        const gameOver = document.createElement('div');
        gameOver.setAttribute('class', 'game-over');
        gameOver.innerHTML = "GAME OVER!";
        gameOver.innerHTML += (tie) ? "<br>It's a tie!" : "<br>" + winner.name + " wins!";
        document.body.appendChild(gameOver);
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
            if (Gameboard.getBoard()[a] != "-" && Gameboard.getBoard()[a] == Gameboard.getBoard()[b] && Gameboard.getBoard()[a] == Gameboard.getBoard()[c]) {
                winner = (Gameboard.getBoard()[a] == player1.mark) ? player1 : player2;

                return true;
            }
        }
        return false;
    }

    const isGameOver = () => {
        // Check for winner
        if (checkWinner()) {
            console.log("We have a winner");
            return true;
        }

        // Check for empty positions
        for (let i = 0; i < Gameboard.getBoard().length; i++) {
            if (Gameboard.getBoard()[i] == "-") {
                // gameOver = false;
                return false;
            }
        }

        // It is a tie
        tie = true;
        return true;
    }

    return { clearOldGame, handleClick, startGame };
})();


const play = () => {
    Game.clearOldGame();
    Game.startGame();

}
