// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuMhZWrf-Br5MMVVurJRwDxd9mMvhi_rk",
  authDomain: "curso-react-ebfae.firebaseapp.com",
  projectId: "curso-react-ebfae",
  storageBucket: "curso-react-ebfae.appspot.com",
  messagingSenderId: "117725561795",
  appId: "1:117725561795:web:9d7dda9779d1b3d3e87376",
  measurementId: "G-RX12HHW6PD"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);

export const FirebaseDb = getFirestore(FirebaseApp);