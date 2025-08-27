// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhB3hku7f1Aj1Shb-16qUAvQOC0i6TPDc",
  authDomain: "finance-app-36797.firebaseapp.com",
  projectId: "finance-app-36797",
  storageBucket: "finance-app-36797.firebasestorage.app",
  messagingSenderId: "526423505145",
  appId: "1:526423505145:web:948ffad43d095e1402ca28",
  measurementId: "G-SR38KD7FEL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };