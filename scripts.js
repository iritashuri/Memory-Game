/*With the initial memory card game I was helped with the next page - 
https://github.com/code-sketch/memory-game/*/

//Save cards posion to local storage in order to restore it in case of a refresh
const CARDS_POSIOTION = "cardsPos";
//Save to local storage if its a new game or not
const IS_NEW_GAME = "isNewGame";
//Save turns to local storage
const TURN = "turn";

//cards of 16 cards game
const cards = document.querySelectorAll('.memory-card');
//cards of 9 cards game
const cardsSmall = document.querySelectorAll('.memory-card-small');

let users = new Users();
let hasFlippedCard = false;
let lockBord = false;
let firstCard, secondCard;
//Initiate the turns
let turn = getTurnsFromStorage();
let endGame = false;
let numOfTotalScores = getNumOfToatlScoresFromStorage();
let newGame = true;

//Sound of flliping cards
let bleep = new Audio();
//sound of winning
let champ = new Audio();
//sound of matching
let matched = new Audio();
bleep.src = './sounds/cardSlide5.wav';
champ.src = './sounds/champ.mp3';
matched.src = './sounds/match.mp3';


//Get the current scores status
function getNumOfToatlScoresFromStorage() {
    let currents = getCurrentUsersFromStorage();
    //first player scores
    let scores1 = 0;
    //second Player Scors
    let scores2 = 0;
    return scores1 + scores2;
}

function getTurnsFromStorage() {
    let curentTurn = stringToArray(localStorage.getItem(TURN));
    if (curentTurn) {
        return curentTurn;
    } else
        return 2;
}

function setTurnInStorage(turn_num) {
    localStorage.setItem(TURN, arrayToString(turn_num));
}

//Set the positions of the cards in the local storage in order to use the same posions, in case of a refresh
function setCardsPosInsTorage(pos) {
    localStorage.setItem(CARDS_POSIOTION, arrayToString(pos));
}

function setIsNewGameToStorage(bool) {
    localStorage.setItem(IS_NEW_GAME, arrayToString(bool));
}

function checkTurns() {
    if (!endGame) {
        turn = getTurnsFromStorage();
        if (turn == 1) {
            turn = 2;
            document.getElementById('player2').style.color = '#d00';
            document.getElementById('player1').style.color = '#000';
        } else {
            turn = 1;
            document.getElementById('player1').style.color = '#d00';
            document.getElementById('player2').style.color = '#000';
        }
        setTurnInStorage(turn);
    } else {
        console.log("Game ended!")
    }
}

function flipCard() {
    if (lockBord) return;
    if (this === firstCard) return;

    bleep.play();
    this.classList.add('flip');

    if (!hasFlippedCard) {
        //first clicked
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    secondCard = this;
    //Ceck if the is a match
    checkForMatch();
    setTimeout(() => {
        checkTurns();
    }, 1500);
}



function checkForMatch() {
    //Game started
    newGame = false;
    setIsNewGameToStorage(newGame);
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    if (isMatch) {
        matched.play();
        numOfTotalScores++;
        users.updateMap(firstCard.id, secondCard.id);
        disableCards();
        if (turn == 1) {
            users.addScoreToUser(users.curentUsers[0].name);
            document.getElementById("scores1").innerHTML = users.curentUsers[0].scores;
        } else {
            users.addScoreToUser(users.curentUsers[1].name);
            document.getElementById("scores2").innerHTML = users.curentUsers[1].scores;
        }
    } else {
        unflipCards();
    }
    if (numOfTotalScores > 0) {
        checkIfGameEnded();
    }
}

function checkIfGameEnded() {
    let currentGameKind = localStorage.getItem(GAME_KIND);
    let memoryMap = stringToArray(localStorage.getItem(MY_MAP));
    let count = 0;
    switch (currentGameKind) {
        case "16":
            for (let i = 0; i < 15; i++) {
                if (memoryMap[i] == 1)
                    count++;
            }
            //If all map values is 1 it means all cards have a match
            if (count == 15) {
                console.log("15")
                document.getElementById('restart-game').innerHTML = "New Game"
                //add wins to correct player
                findWinner();
            }
            break;

        case "9":
            //If all map (except from 1 value) values is 1 it means all cards have a match
            for (let i = 0; i < 8; i++) {
                if (memoryMap[i] == 1)
                    count++;
            }
            if (count == 8) {
                console.log("8")
                //add wins to correct player
                findWinner();
            }
            break;
    }


}

function findWinner() {
    let curentUsers = stringToArray(localStorage.getItem(CURRENT_USERS));
    let winner = null;
    if (curentUsers[0].scores < curentUsers[1].scores) {
        //Add win to player2
        users.addWinToUser(curentUsers[1].name);
        winner = curentUsers[1].name;
    } else if (curentUsers[0].scores > curentUsers[1].scores) {
        //Add win to player1
        users.addWinToUser(curentUsers[0].name);
        winner = curentUsers[0].name;
    }
    if (winner) {
        //If there is a winner show his name
        champ.play();
        document.getElementById("textwin").innerHTML = "The winner is " + winner;
    } else {
        //If there is not winner the its a tie
        document.getElementById("textwin").innerHTML = "Tie";
    }
    //Able popup with winners name/Tie message
    winnerOn();

}

//Unable flipping cards
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

//Bring cards back to backgroud
function unflipCards() {
    lockBord = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);

}

function resetBoard() {
    [hasFlippedCard, lockBord] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//Initial values
function startGame(e) {
    //First player
    let firstNmae = document.getElementById('fname').value;
    //Second Player
    let secondName = document.getElementById('sname').value;
    if (firstNmae != "" && secondName != "") {
        newGame = true;
        e.preventDefault();
        users.addUser(firstNmae);
        users.addUser(secondName);
        users.addCurrentUsers(firstNmae, secondName);
        users.restoreMap();
        setIsNewGameToStorage(newGame);
        //console.log(localStorage.getItem(users.addCurrentUsers))
        let CurrentgameKind = localStorage.getItem(GAME_KIND);
        if (CurrentgameKind == 16)
            window.location.replace(window.location.origin + "/index.html");
        else
            window.location.replace(window.location.origin + "/index2.html");
    } else {
        alert("Must enter players name!");
    }
}

function restartGame(e) {
    newGame = true;
    e.preventDefault();
    let currents = stringToArray(localStorage.getItem(CURRENT_USERS));
    let firstNmae = currents[0].name;
    let secondName = currents[1].name;
    users.addUser(firstNmae);
    users.addUser(secondName);
    users.addCurrentUsers(firstNmae, secondName);
    users.restoreMap();
    setIsNewGameToStorage(newGame);
    //console.log(localStorage.getItem(users.addCurrentUsers))
    let CurrentganeKind = localStorage.getItem(GAME_KIND);
    if (CurrentganeKind == 16)
        window.location.replace("./index.html");
    else
        window.location.replace("./index2.html");
}

function shuffle() {
    let isNewGameStorage = stringToArray(localStorage.getItem(IS_NEW_GAME));
    let currentGameKind = stringToArray(localStorage.getItem(GAME_KIND));
    //If its a new game shuffle the cards location with random positions
    if (isNewGameStorage) {
        //Array of positions to save to locale storage
        let pos = [];
        switch (currentGameKind) {
            case 16:
                cards.forEach(card => {
                    let randomPos = Math.floor(Math.random() * 16);
                    card.style.order = randomPos;
                    pos.push(randomPos);
                });
                break;
            case 9:
                cardsSmall.forEach(card => {
                    let randomPos = Math.floor(Math.random() * 9);
                    card.style.order = randomPos;
                    pos.push(randomPos);
                });
                break;
        }
        //Save posions to local storage
        localStorage.setItem(CARDS_POSIOTION, arrayToString(pos))
    } else {
        //Restore posions
        let positions = stringToArray(localStorage.getItem(CARDS_POSIOTION));
        //Restore memory map in order to know who had match
        let memoryMap = stringToArray(localStorage.getItem(MY_MAP));
        let count = 0;
        //Check what game kind is it (16 or 9 cards)
        switch (currentGameKind) {
            case 16:
                cards.forEach(card => {
                    //Restor position
                    card.style.order = positions[count];
                    //If this card had match show his frot and unable the posible to flip it
                    if (memoryMap[count] == 1) {
                        document.getElementById(count).classList.add('flip');
                        document.getElementById(count).removeEventListener('click', flipCard);
                    }
                    count++;
                });
            case 9:
                cardsSmall.forEach(card => {
                    //Restor position
                    card.style.order = positions[count];
                    //If this card had match show his frot and unable the posible to flip it
                    if (memoryMap[count] == 1) {
                        let temp = JSON.stringify(count + 100);
                        document.getElementById(temp).classList.add('flip');
                        document.getElementById(temp).removeEventListener('click', flipCard);
                    }
                    count++;
                });
        }
    }
}

//popup with winner/tie message
function winnerOn() {
    document.getElementById("winner").style.display = "block";

}

//remove winner/tie message popup
function winnerOff() {
    document.getElementById("winner").style.display = "none";
}

//Go back to main page
function backToMain() {
    window.location.replace("./enterPlayer.html");
}

function setGameKing(numOfCards) {
    localStorage.setItem(GAME_KIND, arrayToString(numOfCards))
}

function showNumOfWinAll() {
    window.location.replace("./playersWins.html");
}

//Set flip card function to all of the cards
cards.forEach(card => card.addEventListener('click', flipCard))
cardsSmall.forEach(card => card.addEventListener('click', flipCard))