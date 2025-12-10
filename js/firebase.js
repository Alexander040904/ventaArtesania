
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  collection,
  getDocs,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBLwJyZo7Q8mnts51yK30xR7onw_THY7_E",
    authDomain: "webprogresiva.firebaseapp.com",
    projectId: "webprogresiva",
    storageBucket: "webprogresiva.firebasestorage.app",
    messagingSenderId: "309634752375",
    appId: "1:309634752375:web:04346ae1c0321cf3410b72"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  export { db, collection, getDocs, addDoc };