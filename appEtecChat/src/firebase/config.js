import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyCEk7vASMY-CEizL6brtk0D-97gW_PBJgQ",
  authDomain: "pw0333.firebaseapp.com",
  projectId: "pw0333",
  storageBucket: "pw0333.firebasestorage.app",
  messagingSenderId: "1088920480818",
  appId: "1:1088920480818:web:b756949859b07f0d95e02b",
  measurementId: "G-CG5LNZVJWE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export const db = getFirestore(app);
