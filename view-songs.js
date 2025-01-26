import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

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
const db = getFirestore(app);

// DOM Elements
const authStatus = document.getElementById("auth-status");
const logoutButton = document.getElementById("logout-button");
const songsList = document.getElementById("songs-list");

// Check if user is logged in
onAuthStateChanged(auth, async (user) => {
  if (user) {
    // Display logged-in user's email
    authStatus.innerHTML = `<p>Welcome, ${user.email}</p>`;
    logoutButton.style.display = "block";

    // Fetch songs related to the logged-in user
    const userID = user.uid;
    await fetchUserSongs(userID);
  } else {
    // Redirect to login if not logged in
    authStatus.innerHTML = `<a href="login.html">Login</a>`;
    logoutButton.style.display = "none";
    songsList.innerHTML = `<p>Please log in to view your songs.</p>`;
  }
});

// Logout functionality
logoutButton.addEventListener("click", async () => {
  try {
    await signOut(auth);
    alert("Logged out successfully.");
    window.location.href = "login.html"; // Redirect to login
  } catch (error) {
    console.error("Logout failed:", error);
    alert("An error occurred during logout.");
  }
});

// Fetch songs from Firestore for the logged-in user
async function fetchUserSongs(userID) {
  try {
    const songsRef = collection(db, "songs");
    const q = query(songsRef, where("userID", "==", userID));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      songsList.innerHTML = `<p>No songs found for your account.</p>`;
    } else {
      // Display songs
      let html = "";
      querySnapshot.forEach((doc) => {
        const song = doc.data();
        html += `
          <div class="song">
            <h3>${song.title}</h3>
            <p>Artist: ${song.artist}</p>
            <p>Likes: ${song.likes || 0}</p>
            <button onclick="likeSong('${doc.id}')">Like</button>
          </div>
        `;
      });
      songsList.innerHTML = html;
    }
  } catch (error) {
    console.error("Error fetching songs:", error);
    songsList.innerHTML = `<p>Failed to load songs. Please try again later.</p>`;
  }
}

// Like a song (you'll need to add this to your Firestore rules)
window.likeSong = async (songID) => {
  try {
    const songRef = doc(db, "songs", songID);
    await updateDoc(songRef, {
      likes: increment(1), // Increment the likes by 1
    });
    alert("You liked the song!");
    window.location.reload(); // Reload to show updated likes
  } catch (error) {
    console.error("Error liking the song:", error);
    alert("Failed to like the song. Please try again.");
  }
};
