import { 
  initializeApp 
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";

import { 
  getAuth, 
  onAuthStateChanged, 
  signOut 
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

import { 
  getFirestore, 
  collection, 
  query, 
  where, 
  getDocs, 
  doc, 
  addDoc, 
  deleteDoc, 
  updateDoc, 
  increment 
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrrQA1Os-U5O7VzPdq4yHJgH0c5cQys8o",
  authDomain: "sparks-b8dec.firebaseapp.com",
  projectId: "sparks-b8dec",
  storageBucket: "sparks-b8dec.appspot.com",
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
const addSongForm = document.getElementById("add-song-form");

// Check if user is logged in
onAuthStateChanged(auth, async (user) => {
  if (user) {
    // Display logged-in user's email
    authStatus.innerHTML = `<p>Welcome, ${user.email}</p>`;
    logoutButton.style.display = "block";

    // Fetch songs related to the logged-in user
    const userID = user.uid;
    await fetchUserSongs(userID);

    // Add event listener for adding songs
    addSongForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const songName = document.getElementById("song-name").value;
      const songAudio = document.getElementById("song-audio").value;
      const songCover = document.getElementById("song-cover").value;
      await addSong(userID, songName, songAudio, songCover);
      addSongForm.reset(); // Clear form fields
    });
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
    const q = query(songsRef, where("UID", "==", userID));
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
            <img src="${song.cover}" alt="${song.name}" />
            <h3>${song.name}</h3>
            <p>Audio: <a href="${song.audio}" target="_blank">Listen</a></p>
            <p>Likes: ${song.likes?.length || 0}</p>
            <button onclick="likeSong('${doc.id}')">Like</button>
            <button class="remove-button" onclick="removeSong('${doc.id}')">Remove</button>
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

// Add a new song
async function addSong(userID, name, audio, cover) {
  try {
    const songsRef = collection(db, "songs");
    await addDoc(songsRef, {
      UID: userID,
      name: name,
      audio: audio,
      cover: cover,
      likes: []
    });
    alert("Song added successfully!");
    await fetchUserSongs(userID); // Refresh the song list
  } catch (error) {
    console.error("Error adding song:", error);
    alert("Failed to add the song. Please try again.");
  }
}

// Like a song
window.likeSong = async (songID) => {
  try {
    const songRef = doc(db, "songs", songID);
    await updateDoc(songRef, {
      likes: increment(1) // Increment the likes by 1
    });
    alert("You liked the song!");
    window.location.reload(); // Reload to show updated likes
  } catch (error) {
    console.error("Error liking the song:", error);
    alert("Failed to like the song. Please try again.");
  }
};

// Remove a song
window.removeSong = async (songID) => {
  try {
    const songRef = doc(db, "songs", songID);
    await deleteDoc(songRef); // Deletes the document from Firestore
    alert("Song removed successfully!");
    window.location.reload(); // Reload to update the list
  } catch (error) {
    console.error("Error removing song:", error);
    alert("Failed to remove the song. Please try again.");
  }
};
