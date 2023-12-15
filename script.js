document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusText = document.getElementById('status');
    const newGameButton = document.getElementById('newGame');
    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = Array(9).fill('');

    function handleCellClick(e) {
        const clickedCell = e.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        updateCell(clickedCell, clickedCellIndex);
        checkGameOutcome();
    }

    function updateCell(cell, index) {
        gameState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer);
    }

    function checkGameOutcome() {
        const winningPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        let roundWon = false;
        for (let pattern of winningPatterns) {
            const [a, b, c] = pattern;
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            statusText.textContent = `Player ${currentPlayer} Wins!`;
            gameActive = false;
            return;
        }

        if (!gameState.includes('')) {
            statusText.textContent = 'Game Draw!';
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = `Next Player: ${currentPlayer}`;
    }

    function startNewGame() {
        gameState.fill('');
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('X', 'O');
        });
        currentPlayer = 'X';
        gameActive = true;
        statusText.textContent = `Next Player: ${currentPlayer}`;
    }

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    newGameButton.addEventListener('click', startNewGame);
});
