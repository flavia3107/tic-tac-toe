let editedPlayer = 0;
let activePlayer = 0;
let currentRaund = 1;
let gameIsOver = false;

const gameData = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

const players = [
    {
        name: '',
        symbol: 'X'
    },
    {
        name: '',
        symbol: 'O'
    }
];

const playerConfigOverlayElement = document.getElementById('config-overlay');
const backdrop = document.getElementById('backdrop');
const errorOutputElement = document.getElementById('config-errors');
const mainContainer = document.getElementById('main-container');

const editPlayer1BtnElement = document.getElementById('edit-player-1-btn');
const editPlayer2BtnElement = document.getElementById('edit-player-2-btn');
const configCancelBtn = document.getElementById('config-cancel-btn');

const formElement = document.querySelector('form');
const startGame = document.getElementById('start-game');
const activeGameContainer = document.getElementById('active-game');
const gameBoard = document.getElementById('game-board');
const gameOverElement = document.getElementById('game-over');
const closeModal = document.getElementById('close-modal');

const userProfile1 = document.getElementById('user-1');
const userProfile2 = document.getElementById('user-2');
const arrowLeft = document.getElementById('arrow-left');
const arrowRight = document.getElementById('arrow-right');

editPlayer1BtnElement.addEventListener('click', openPlayerConfig);
editPlayer2BtnElement.addEventListener('click', openPlayerConfig);
configCancelBtn.addEventListener('click', closePlayerConfig);
backdrop.addEventListener('click', closePlayerConfig);

formElement.addEventListener('submit', savePlayerConfig);
startGame.addEventListener('click', startNewGame);
gameBoard.addEventListener('click', selectGameField);
closeModal.addEventListener('click', closeModalMethod);