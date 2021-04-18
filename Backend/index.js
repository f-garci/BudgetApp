// const firebase = require("firebase");
// const config = require("./config.json");

// if (firebase.apps.length === 0) {
//     firebase.initializeApp(config);
// }

// const authStateChange = (callback) => {
//     return firebase.auth().onAuthStateChanged((user) => {
//         if (user) {
//             callback({ loggedIn: true });
//         } else {
//             callback({ loggedIn: false });
//         }
//     });
// };

// const login = (usr, pass) => {
//     firebase.auth().signInWithEmailAndPassword(usr, pass);
// };

// const logout = () => {
//     firebase.auth().signOut();
// };

// module.exports = { authStateChange, login, logout };
