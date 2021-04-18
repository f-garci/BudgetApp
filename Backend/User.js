const firebase = require("firebase");
const config = require("./config.json");

// if (firebase.apps.length === 0) {
//     firebase.initializeApp(config);
// }

let error = false;

const addUser = (username, password) => {
    firebase
        .auth()
        .createUserWithEmailAndPassword(username, password)
        .then((result) => console.log(result))
        .catch(() => (error = true));

    return error;
};

module.exports = addUser;
