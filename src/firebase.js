// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfOseFYuW3TlpLxz4kUp6aGnTX7HHRR3M",
  authDomain: "mood-matcher-888be.firebaseapp.com",
  projectId: "mood-matcher-888be",
  storageBucket: "mood-matcher-888be.firebasestorage.app",
  messagingSenderId: "118242405804",
  appId: "1:118242405804:web:7b453acc091c9321809e09",
  measurementId: "G-CV5JB8Q8WC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };