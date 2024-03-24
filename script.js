const cells = document.querySelectorAll('[data-cell]');
const message = document.querySelector('[data-message]');
const restartButton = document.querySelector('[data-restart-button]');
const aiCheckbox = document.querySelector('[data-ai-checkbox]');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let aiEnabled = false;

aiCheckbox.addEventListener('change', () => {
    aiEnabled = aiCheckbox.checked;
    restartGame();
});

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (gameBoard[cellIndex] === '' && gameActive) {
        gameBoard[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWin()) {
            gameActive = false;
            displayMessage(`${currentPlayer} wins!`);
        } else if (checkDraw()) {
            gameActive = false;
            displayMessage('It\'s a draw!');
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

            if (aiEnabled && currentPlayer === 'O') {
                setTimeout(makeAIMove, 1000);
            }
        }
    }
}

function checkWin() {
    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6] 
    ];

    for (const combo of winCombos) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }
    return false;
}

function checkDraw() {
    return gameBoard.every(cell => cell !== '');
}

function displayMessage(msg) {
    message.textContent = msg;
}

function restartGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    message.textContent = '';
    cells.forEach(cell => {
        cell.textContent = '';
    });
}
function makeAIMove() {
    const emptyCells = [];
    gameBoard.forEach((cell, index) => {
        if (cell === '') {
            emptyCells.push(index);
        }
    });

    if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const randomCellIndex = emptyCells[randomIndex];
        gameBoard[randomCellIndex] = 'O';
        cells[randomCellIndex].textContent = 'O';

        if (checkWin()) {
            gameActive = false;
            displayMessage('AI wins!');
        } else if (checkDraw()) {
            gameActive = false;
            displayMessage('It\'s a draw!');
        } else {
            currentPlayer = 'X';
        }
    }
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);
