import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARWUjDaNxfw0frUoDhAfNOij4pYB2mbXk",
  authDomain: "ecomm-d35dd.firebaseapp.com",
  projectId: "ecomm-d35dd",
  storageBucket: "ecomm-d35dd.firebasestorage.app",
  messagingSenderId: "322056189036",
  appId: "1:322056189036:web:4bb435e0393f7db69b1449",
  measurementId: "G-4369Q3SMY6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
