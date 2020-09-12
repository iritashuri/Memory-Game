//USERS - All users data (in the local storage)
const USERS = "users"
//CURRENT_USERS - current users data (in the local storage)
const CURRENT_USERS = "currentUsers"
//MY_MAP - mapping crads that found a match with 1ans save in local storage
const MY_MAP = "myMap"
//GAME_KIND - save in local storge 16 or 9 cards
const GAME_KIND = "gameKind";

//Add map with only 0 when entering to thrgame
function addMapToStorage() {
    let currentGameKind = localStorage.getItem(GAME_KIND);
    let tempMap;
    if (currentGameKind == 16)
        tempMap = {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 0,
            11: 0,
            12: 0,
            13: 0,
            14: 0,
            15: 0
        }
    else
        tempMap = {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0
        };

    localStorage.setItem(MY_MAP, arrayToString(tempMap));
}

//Get from storage the updated map in order to be able not changing the crds if the game already started
function getMapFromStorage() {
    let currentGameKind = localStorage.getItem(GAME_KIND);
    if (localStorage.getItem(MY_MAP) !== null) {
        return stringToArray(localStorage.getItem(MY_MAP));
    } else
    if (currentGameKind == 16)
        return {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 0,
            11: 0,
            12: 0,
            13: 0,
            14: 0,
            15: 0
        };
    else
        return {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0
        }

}

//Update the map in case of a match with the appropriate cards 
function updateMapInStorage(card1, card2) {
    let tempMap = stringToArray(localStorage.getItem(MY_MAP));
    JSON.parse(card1);
    JSON.parse(card2);
    tempMap[card1] = 1;
    tempMap[card2] = 1;
    localStorage.setItem(MY_MAP, arrayToString(tempMap));
}

//add user to local storage if  he is not existing.
function addUserToStorage(user) {
    let listUsers = [];
    let isExist = false;
    if (localStorage.getItem(USERS) !== null) {
        listUsers = stringToArray(localStorage.getItem(USERS));
    }

    //Check if user exisit
    listUsers.forEach(userItem => {
        if (userItem.name == user.name) {
            isExist = true;
        }
    })
    //Add it if not exist to the list of users
    if (!isExist)
        listUsers.push(user);
    //Update the list of users un storage 
    localStorage.setItem(USERS, arrayToString(listUsers));
}

//Add curent users to local storage - current users are the users who are currently playing
function addCurrentUsersToStorage(user1, user2) {
    let listUsers = [];
    listUsers.push(user1);
    listUsers.push(user2);
    localStorage.setItem(CURRENT_USERS, arrayToString(listUsers));
}

//Get the users who are currently playing
function getCurrentUsersFromStorage() {
    if (localStorage.getItem(CURRENT_USERS) !== null) {
        return stringToArray(localStorage.getItem(CURRENT_USERS));
    } else
        return [];

}

//Add 1 to usere scores aand update it in local storage 
function addScoreToUserInStorage(user) {
    let tempList = getCurrentUsersFromStorage();
    console.log(tempList);
    tempList.forEach(current => {
        if (user.name === current.name) {
            current.scores = current.scores + 1;
        }

    });
    localStorage.setItem(CURRENT_USERS, arrayToString(tempList));
}

//Get the number of scores for a specific user
function getScorByUserFromStorage(user) {
    localStorage.getItem(stringToArray(CURRENT_USERS)).forEach(current => {
        if (user === current) {
            return current.scores;
        }
    });
    localStorage.setItem(USERS, arrayToString(tempList));
}

//Add 1 win to user wins number
function addWinToUserInStorage(user) {
    let tempList = stringToArray(localStorage.getItem(USERS));
    tempList.forEach(current => {
        if (user.name === current.name) {
            current.numOfWins = current.numOfWins + 1;
        }
    });

    localStorage.setItem(USERS, arrayToString(tempList))
}

//Get the number of wins for a specific user
function getWinsyUserFromStorage(user) {
    localStorage.getItem(stringToArray(CURRENT_USERS)).forEach(current => {
        if (user === current) {
            return current.numOfWins;
        }
    });
}

//Get from storage all users
function getAllUsersFromStorage() {
    if (localStorage.getItem(USERS) !== null) {
        return stringToArray(localStorage.getItem(USERS));
    } else
        return [];
}


//Users class contain allusers and current users data, and the map.
class Users {
    constructor() {
        this.curentUsers = getCurrentUsersFromStorage();
        this.users = getAllUsersFromStorage();
        this.myMap = getMapFromStorage();
    }

    //Update map in case of a match and update it to store as well
    updateMap(card1, card2) {
        if (localStorage.getItem(GAME_KIND) == 16) {
            this.myMap[card1] = 1;
            this.myMap[card2] = 1;
            updateMapInStorage(card1, card2);
        } else {
            this.myMap[card1 - 100] = 1;
            this.myMap[card2 - 100] = 1;
            updateMapInStorage(card1 - 100, card2 - 100);
        }

    }
    //Restore map in case of a new game
    restoreMap() {
        if (localStorage.getItem(GAME_KIND) == 19)
            this.myMap = {
                0: 0,
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                7: 0,
                8: 0,
                9: 0,
                10: 0,
                11: 0,
                12: 0,
                13: 0,
                14: 0,
                15: 0
            };
        else
            this.myMap = {
                0: 0,
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                7: 0,
                8: 0,
                9: 0
            }
        addMapToStorage();
    }

    addUser(userName) {
        let user = {
            name: userName,
            scores: 0,
            numOfWins: 0
        };
        this.users.push(user);
        addUserToStorage(user);
    }

    //Add current users, If they exisit in all users array in storage take it from there.
    addCurrentUsers(userName1, userName2) {
        let allusers = stringToArray(localStorage.getItem(USERS))
        let user1Exist = false;
        let user2Exist = false;
        let user1;
        let user2;
        allusers.forEach(userItem => {
            if (userItem.name == userName1) {
                user1 = userItem;
                user1Exist = true;
            }
            if (userItem.name == userName2) {
                user2 = userItem;
                user2Exist = true;
            }
        })
        if (!user1Exist) {
            user1 = {
                name: userName1,
                scores: 0,
                numOfWins: 0
            };
        }
        if (!user2Exist) {
            user2 = {
                name: userName2,
                scores: 0,
                numOfWins: 0
            };
        }
        this.curentUsers.push(user1);
        this.curentUsers.push(user2);
        addCurrentUsersToStorage(user1, user2);
    }

    //get all users
    getAll() {
        return this.users;
    }

    //Get current users 
    getCurrents() {
        return this.curentUsers;
    }
    addScoreToUser(userName) {
        let curent = null;
        this.curentUsers.forEach(user => {
            if (user.name === userName)
                curent = user;
        });
        addScoreToUserInStorage(curent);
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
        });
        addWinToUserInStorage(curent);
        curent.numOfWins = curent.numOfWins + 1;
    }
}