const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
import {
    REACT_APP_FIREBASE_API_KEY,
    REACT_APP_FIREBASE_AUTH_DOMAIN,
    REACT_APP_FIREBASE_PROJECT_ID,
    REACT_APP_FIREBASE_STORAGE_BUCKET,
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    REACT_APP_FIREBASE_APP_ID,
} from "@env";

const app = firebase.initializeApp({
    apiKey: REACT_APP_FIREBASE_API_KEY,
    authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: `https://${REACT_APP_FIREBASE_PROJECT_ID}.firebaseio.com`,
    projectId: REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: REACT_APP_FIREBASE_APP_ID,
});

const auth = app.auth();
const firestore = app.firestore();

const database = {
    profiles: firestore.collection("profiles"),
    transactions: firestore.collection("transactions"),
    getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
};

module.exports = { auth, app, database };
