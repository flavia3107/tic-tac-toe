let gameStarted = false;

function resetGame() {
    activePlayer = 0;
    currentRaund = 1;
    gameOverElement.children[1].textContent = 'You won!';
    gameOverElement.style.display = 'none';
    gameIsOver = false;
    arrowLeft.style.visibility = 'visible';
    arrowRight.style.visibility = 'hidden';
    backdrop.style.display = 'none';
    gameStarted = false;

    let gameBoardIndex = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            gameData[i][j] = 0;
            const gameBoardItem = gameBoard.children[gameBoardIndex];
            gameBoardItem.textContent = '';
            gameBoardItem.classList.remove('disabled');
            gameBoardIndex++;
        }
    }
}

function startNewGame() {
    if (players.some(player => !player.name)) {
        alert('Please set player names for both players!');
        return;
    }

    if (players[0].name === players[1].name) {
        alert('Please set different player names for both players!');
        return;
    }

    resetGame();
    startGame.style.visibility = 'hidden';
    gameStarted = true;
}

function switchPlayer() {
    activePlayer = activePlayer === 0 ? 1 : 0;

    if (activePlayer === 0) {
        arrowLeft.style.visibility = 'visible';
        arrowRight.style.visibility = 'hidden';
    } else {
        arrowRight.style.visibility = 'visible';
        arrowLeft.style.visibility = 'hidden';
    }

}

function selectGameField(event) {
    if (gameStarted) {
        if (event.target.tagName !== 'LI' || gameIsOver) {
            return;
        }

        const selectedField = event.target;
        const rowIndex = selectedField.dataset.row - 1;
        const columnIndex = selectedField.dataset.col - 1;

        if (gameData[rowIndex][columnIndex] > 0) {
            return;
        }

        selectedField.textContent = players[activePlayer].symbol;
        selectedField.classList.add('disabled');
        gameData[rowIndex][columnIndex] = activePlayer + 1;

        const winner = checkForGameOver();
        if (winner !== 0) {
            endGame(winner);
        }

        currentRaund++;
        switchPlayer();
    }
}

function checkForGameOver() {
    // check rows
    for (let i = 0; i < 3; i++) {
        if (gameData[i][0] > 0 && gameData[i][0] === gameData[i][1] && gameData[i][0] === gameData[i][2]) {
            return gameData[i][0];
        }
    }

    // check columns
    for (let j = 0; j < 3; j++) {
        if (gameData[0][j] > 0 && gameData[0][j] === gameData[1][j] && gameData[0][j] === gameData[2][j]) {
            return gameData[0][j];
        }
    }

    // check main diagonal
    if (gameData[0][0] > 0 && gameData[0][0] === gameData[1][1] && gameData[1][1] === gameData[2][2]) {
        return gameData[0][0];
    }

    // check secondary diagonal
    if (gameData[2][0] > 0 && gameData[2][0] === gameData[1][1] && gameData[0][2] === gameData[1][1]) {
        return gameData[2][0];
    }

    if (currentRaund === 9) {
        return -1;
    }
    return 0;
}

function endGame(winnerId) {
    gameOverElement.style.display = 'block';
    if (winnerId > 0) {
        gameOverElement.firstElementChild.textContent = players[winnerId - 1].name;
    } else {
        gameOverElement.children[1].textContent = 'It\'s a draw!';
        gameOverElement.firstElementChild.textContent = '';
    }

    backdrop.style.display = 'block';
    gameIsOver = true;
    startGame.style.visibility = 'visible';

}

function closeModalMethod() {
    backdrop.style.display = 'none';
    gameOverElement.style.display = 'none';
}