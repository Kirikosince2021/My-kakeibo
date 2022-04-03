// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_kFTmYDIV9NBa7IpSuQ8gvbQqcpAF-LA",
  authDomain: "my-kakeibo-ec490.firebaseapp.com",
  projectId: "my-kakeibo-ec490",
  storageBucket: "my-kakeibo-ec490.appspot.com",
  messagingSenderId: "270653931250",
  appId: "1:270653931250:web:01c34171b9fca581eada6b",
  measurementId: "G-X1DNMMG41L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();

export { app, analytics, db }