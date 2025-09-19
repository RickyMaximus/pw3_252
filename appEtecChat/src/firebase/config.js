import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyCDDaWxCTFXn_mPOTC5aW60uG7d9D2aqhU",
  authDomain: "etecgustavopafume.firebaseapp.com",
  projectId: "etecgustavopafume",
  storageBucket: "etecgustavopafume.firebasestorage.app",
  messagingSenderId: "996613174816",
  appId: "1:996613174816:web:960559b13d9eef52d9ee45",
  measurementId: "G-PDWVKVJKK6"
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export const db = getFirestore(app);
