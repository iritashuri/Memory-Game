const USERS = "users"

function addUserToStorage(user) {
    let listUsers = [];

    if (localStorage.getItem(USERS) !== null) {
        listUsers = stringToArray(localStorage.getItem(USERS));
    }
    if (user in listUsers)
        listUsers.push(user);

    localStorage.setItem(USERS, arrayToString(listUsers));
}

function getAllUsersFromStorage() {
    if (localStorage.getItem(USERS) !== null) {
        return stringToArray(localStorage.getItem(USERS));
    } else
        return [];
}

class Users {
    constructor() {
        this.users = getAllUsersFromStorage();
        console.log(this.users);
    }

    addUser(userName) {
        let user = {
            name: userName,
            scores: 0,
            numOfWins: 0
        }
        this.users.push(user);
        addUserToStorage(user);
    }

    getAll() {
        return this.users;
    }

    addScoreToUser(userName) {
        let curent = null;
        this.users.forEach(user => {
            if (user.name === userName)
                curent = user;
        });

        curent.scores = curent.scores + 1;
    }

    getScorByUser(userName) {
        let curent = null;
        this.users.forEach(user => {
            if (user.name === userName)
                curent = user;
        });
        return curent.scores;
    }

    addWinToUser(userName) {
        let curent = null
        this.users.forEach(user => {
            if (user.name === userName)
                curent = user;
        })
        curent.numOfWins = curent.numOfWins + 1;
    }
}