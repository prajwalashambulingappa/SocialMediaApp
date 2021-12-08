import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA2ue4TMZE0TjMVKEy1i-TH_eafMfjTBgk",
    authDomain: "socialmedia-app-552c1.firebaseapp.com",
    projectId: "socialmedia-app-552c1",
    storageBucket: "socialmedia-app-552c1.appspot.com",
    messagingSenderId: "782466638447",
    appId: "1:782466638447:web:ac96c4cf2f1fc5f6af239a",
};

firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();

export default storage;
