const baseUrl = 'http://localhost:3030/jsonstore/games';

const formElement = document.getElementById('form');

//get load game button
const loadButtonElement = document.getElementById('load-games');
const gameList = document.getElementById('games-list');

//get add button and edit button
const addGameBtn = document.getElementById('add-game');
const editGameBtn = document.getElementById('edit-game');

//get input data 
const gameNameInputElement = document.getElementById('g-name');
const typeInputElement = document.getElementById('type');
const playersInputElement = document.getElementById('players');

function createElement(name, type, players, id){
    //create buttons
    const deletebutton = document.createElement('button');
    deletebutton.classList.add('delete-btn');
    deletebutton.textContent = 'Delete';

    const changeButton = document.createElement('button');
    changeButton.classList.add('change-btn');
    changeButton.textContent = 'Change';

    //create button container
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('buttons-container');
    buttonContainer.appendChild(changeButton);
    buttonContainer.appendChild(deletebutton);

    //create paragraphs for data 
    const pNameElement = document.createElement('p');
    pNameElement.textContent = name;

    const typeElement = document.createElement('p');
    typeElement.textContent = type;

    const playersElement = document.createElement('p');
    playersElement.textContent = players;

    //create div content for storing data
    const contentElement = document.createElement('div');
    contentElement.classList.add('content');
    contentElement.appendChild(pNameElement);
    contentElement.appendChild(playersElement);
    contentElement.appendChild(typeElement);

    //create board game div element 
    const boardGameElement = document.createElement('div');
    boardGameElement.classList.add('board-game');
    boardGameElement.appendChild(contentElement);
    boardGameElement.appendChild(buttonContainer);

    //add event listener to change button
    changeButton.addEventListener('click', ()=>{
        formElement.setAttribute('data-id', id);
        gameNameInputElement.value = name;
        typeInputElement.value = type;
        playersInputElement.value = players;
        boardGameElement.remove();
        addGameBtn.disabled = true;
        editGameBtn.disabled = false;
    })

    //add event listener to delete button
    deletebutton.addEventListener('click', ()=>{
        fetch(`${baseUrl}/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'aplication/json'
            }
        })
        .then(res => {
            if(!res.ok){
                return;
            }
            fetchItems()
        })
    })

    return boardGameElement;
}

function fetchItems(){
    gameList.innerHTML = '';
    fetch(baseUrl)
    .then(res => res.json())
    .then(data => {
        for (const game of Object.values(data)) {
            const element = createElement(game.name, game.type, game.players, game._id);
            gameList.appendChild(element);
        }
    });
}

loadButtonElement.addEventListener('click', fetchItems)


//add event listener to add game btn

addGameBtn.addEventListener('click', ()=>{
    fetch(baseUrl, {
        method: 'POST',
        headers: {
            'content-type': 'aplication/json'
        },
        body: JSON.stringify({
            name: gameNameInputElement.value,
            type: typeInputElement.value,
            players: playersInputElement.value
        })
    })
    .then(res => {
        if (!res.ok){
            return;
        }
        fetchItems();

        gameNameInputElement.value = '';
        typeInputElement.value = '';
        playersInputElement.value = '';
    })
})

editGameBtn.addEventListener('click', ()=>{
    const gameId = formElement.getAttribute('data-id');
    fetch(`${baseUrl}/${gameId}`, {
        method: 'PUT',
        headers: {
            'content-type': 'aplication/json'
        },
        body: JSON.stringify({
            name: gameNameInputElement.value,
            type: typeInputElement.value,
            players: playersInputElement.value,
            _id: gameId
        })
    })
    .then(res => {
        if(!res.ok){
            return;
        }

        fetchItems();
        editGameBtn.disabled = true;
        addGameBtn.disabled = false;

        gameNameInputElement.value = '';
        typeInputElement.value = '';
        playersInputElement.value = '';
    })
    
})