// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrhg3eq444y74ntrP-utWDMH4xHng27Jg",
  authDomain: "database-reserva-club-tenis.firebaseapp.com",
  projectId: "database-reserva-club-tenis",
  storageBucket: "database-reserva-club-tenis.firebasestorage.app",
  messagingSenderId: "244165152541",
  appId: "1:244165152541:web:63284be83c3846319a5bf4",
  measurementId: "G-X64ETY8M4E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
