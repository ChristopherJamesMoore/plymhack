import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDrrQA1Os-U5O7VzPdq4yHJgH0c5cQys8o",
    authDomain: "sparks-b8dec.firebaseapp.com",
    projectId: "sparks-b8dec",
    storageBucket: "sparks-b8dec.firebasestorage.app",
    messagingSenderId: "639794475522",
    appId: "1:639794475522:web:89b407926b7e63b23c2d1b",
    measurementId: "G-K08Q4GWR1G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle form submission
document.getElementById("login-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    // Authenticate the user
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful!");

    // Redirect to the songs page
    window.location.href = "view-songs.html";
  } catch (error) {
    console.error("Login error:", error.message);
    alert("Login failed. Please check your email and password.");
  }
});
