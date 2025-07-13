// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtXxjk34QcbWlqMPywym2pWd-KKzG9GDw",
  authDomain: "netflixgpt-badb5.firebaseapp.com",
  projectId: "netflixgpt-badb5",
  storageBucket: "netflixgpt-badb5.firebasestorage.app",
  messagingSenderId: "373536911403",
  appId: "1:373536911403:web:c99407b91bdbe2fbb4ba6e",
  measurementId: "G-EK6NSG8SXZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);