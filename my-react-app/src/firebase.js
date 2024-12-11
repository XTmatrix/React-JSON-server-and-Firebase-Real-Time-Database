// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHzv3jZ8pGgKDAuwlJpMP_Sn8ACa9lj8I",
  authDomain: "crud-firebase-89043.firebaseapp.com",
  databaseURL:
    "https://crud-firebase-89043-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "crud-firebase-89043",
  storageBucket: "crud-firebase-89043.firebasestorage.app",
  messagingSenderId: "547356079170",
  appId: "1:547356079170:web:14b8c226cffb71423e29db",
  measurementId: "G-CG7REQ9N3E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
