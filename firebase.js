// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMXnO-AH0C6peKGaHjviiHBTHkiRUWalw",
  authDomain: "pantry-ef415.firebaseapp.com",
  projectId: "pantry-ef415",
  storageBucket: "pantry-ef415.appspot.com",
  messagingSenderId: "309371598985",
  appId: "1:309371598985:web:1ccb5649677e980c13ee58",
  measurementId: "G-CS1QNY0SBZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);

export { firestore }