import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDrrQA1Os-U5O7VzPdq4yHJgH0c5cQys8o",
    authDomain: "sparks-b8dec.firebaseapp.com",
    projectId: "sparks-b8dec",
    storageBucket: "sparks-b8dec.firebasestorage.app",
    messagingSenderId: "639794475522",
    appId: "1:639794475522:web:89b407926b7e63b23c2d1b",
    measurementId: "G-K08Q4GWR1G"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
