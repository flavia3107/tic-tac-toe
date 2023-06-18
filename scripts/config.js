function openPlayerConfig(event) {
    editedPlayer = +event.target.dataset.playerid;
    playerConfigOverlayElement.style.display = 'block';
    backdrop.style.display = 'block';
}

function closePlayerConfig() {
    playerConfigOverlayElement.style.display = 'none';
    backdrop.style.display = 'none';
    formElement.firstElementChild.classList.remove('error');
    errorOutputElement.textContent = '';
    formElement.firstElementChild.lastElementChild.value = '';
    gameOverElement.style.display = 'none';
}

function savePlayerConfig(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const enteredPlayerName = formData.get('username').trim();

    if (!enteredPlayerName) {
        event.target.firstElementChild.classList.add('error');
        errorOutputElement.textContent = "Please enter valid name";
        return;
    }

    const updatedPlayerDataElement = document.getElementById(`player-${editedPlayer}-data`);
    updatedPlayerDataElement.children[1].textContent = enteredPlayerName;

    players[editedPlayer-1].name = enteredPlayerName;
    
    closePlayerConfig();
}