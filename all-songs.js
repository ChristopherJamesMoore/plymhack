import { 
    initializeApp 
  } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
  
  import { 
    getFirestore, 
    collection, 
    getDocs 
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
  const db = getFirestore(app);
  
  // DOM Element
  const songsList = document.getElementById("songs-list");
  
  // Fetch and display all songs
  async function fetchAllSongs() {
    try {
      const songsRef = collection(db, "songs");
      const querySnapshot = await getDocs(songsRef);
  
      if (querySnapshot.empty) {
        songsList.innerHTML = `<p>No songs found in the database.</p>`;
      } else {
        // Display all songs
        let html = "";
        querySnapshot.forEach((doc) => {
          const song = doc.data();
          html += `
            <div class="song">
              <img src="${song.cover}" alt="${song.name}" />
              <h3>${song.name}</h3>
              <p>Audio: <a href="${song.audio}" target="_blank">Listen</a></p>
              <p>Uploaded by: ${song.UID || "Unknown"}</p>
              <p>Likes: ${song.likes?.length || 0}</p>
            </div>
          `;
        });
        songsList.innerHTML = html;
      }
    } catch (error) {
      console.error("Error fetching all songs:", error);
      songsList.innerHTML = `<p>Failed to load songs. Please try again later.</p>`;
    }
  }
  
  // Call the function to fetch all songs
  fetchAllSongs();
  