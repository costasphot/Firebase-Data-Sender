import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js';
import { getDatabase, ref, push, set } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js';

const firebaseConfig = {
  authDomain: "weather-app-d14d8.firebaseapp.com",
  databaseURL: "https://weather-app-d14d8-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "weather-app-d14d8",
  storageBucket: "weather-app-d14d8.appspot.com",
  // Add apiKey, messagingSenderId, and appId if available
};

// Initialize Firebase
try {
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  window.sendDataToFirebase = function(event) {
    event.preventDefault(); // Prevent default form submission

    // Retrieve data from form inputs
    const name = document.querySelector('input[name="name"]').value;
    const age = document.querySelector('input[name="age"]').value;
    const email = document.querySelector('input[name="email"]').value;
    
    const data = {
      name: name,
      age: age,
      email: email
    };

    const newDataRef = ref(db, 'users/' + push(ref(db, 'users')).key);
    set(newDataRef, data)
      .then(() => {
        console.log("Data sent successfully!");
      })
      .catch((error) => {
        console.error("Error sending data: ", error);
      });
  }
} catch(error) {
  console.error("Error initializing Firebase: ", error);
}
