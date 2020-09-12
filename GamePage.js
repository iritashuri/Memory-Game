
//Get current players and there data
var promise = new Promise(function (resolve, reject) {
    let currents = users.getCurrents();
    if (currents != null) {
        let first = currents[0];
        let second = currents[1];
        console.log(first);
        console.log(second);
        document.getElementById("player1").innerHTML = first.name;
        document.getElementById("player2").innerHTML = second.name;
        document.getElementById("scores1").innerHTML = first.scores;
        document.getElementById("scores2").innerHTML = second.scores;
        document.getElementById("wins1").innerHTML = first.numOfWins;
        document.getElementById("wins2").innerHTML = second.numOfWins;
        numOfTotalScores = first.scores + second.scores;
        shuffle();
        checkTurns();
        resolve();
    } else {
        reject();
    }
});

promise.
then(function () {
    console.log('Success');
}).
catch(function () {
    console.log('Some error has occured');
});