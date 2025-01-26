import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// Firebase Authentication Instance
const auth = getAuth();

// Placeholder for User Info
const userInfoContainer = document.createElement("div");
userInfoContainer.id = "user-info";
document.body.prepend(userInfoContainer); // Add at the top of the page

// Track Authentication State
onAuthStateChanged(auth, (user) => {
  if (user) {
    // If logged in, show user email and logout button
    userInfoContainer.innerHTML = `
      Logged in as: ${user.email} 
      <button id="logout-button">Logout</button>
    `;
    document.getElementById("logout-button").addEventListener("click", async () => {
      try {
        await signOut(auth);
        alert("Logged out successfully!");
      } catch (error) {
        console.error("Logout failed: ", error);
      }
    });
  } else {
    // If not logged in, show login link
    userInfoContainer.innerHTML = `
      <a href="index.html">Login</a>
    `;
  }
});