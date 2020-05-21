let users = new Users();
const cards = document.querySelectorAll('.memory-card');
/*
var promise = new Promise(function (resolve, reject) {
    const fuserName = document.getElementById('fname').value;
    const suserName = document.getElementById('sname').value;
    if (fuserName != null) {
        users.addUser(fuserName)
        users.addUser(suserName)
        resolve();
    } else {
        reject();
    }
});

promise. 
      then(function () { 
          console.log('Success, You are a GEEK'); 
      }). 
      catch(function () { 
          console.log('Some error has occured'); 
      }); 
*/
let hasFlippedCard = false;
let lockBord = false;
let firstCard, secondCard;
let bleep = new Audio();
bleep.src = './sounds/cardSlide5.wav';


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

        //console.log([hasFlippedCard, firstCard])
    }
    secondCard = this;
    checkFoeMatch();
    //do cards match?
}

function checkFoeMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBord = true
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard()
    }, 1500);

}

function resetBoard() {
    [hasFlippedCard, lockBord] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    })
})()

function startGame(e) {
    e.preventDefault();
    users.addUser(document.getElementById('fname').value);
    users.addUser(document.getElementById('sname').value);

    window.location.replace(window.location.origin + "/index.html");
}

cards.forEach(card => card.addEventListener('click', flipCard))