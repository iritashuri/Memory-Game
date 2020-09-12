//Add all users and their number of wins to a table
var promise = new Promise(function (resolve, reject) {
    let alls = users.getAll();
    //console.log(currents);
    if (alls) {
        alls.forEach(user => {
            if (user.name != null) {
                let tr = document.getElementById('namesRow');
                let th = document.createElement("th");
                th.innerHTML = user.name;
                tr.appendChild(th);
                tr = document.getElementById('winsRow');
                let th2 = document.createElement("th");
                th2.innerHTML = user.numOfWins;
                tr.appendChild(th2);
            }
        });
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