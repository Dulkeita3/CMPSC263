import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD4DYt3E_T3lYBn63_r1WG1DqvME9B68E0",
  authDomain: "studysync-926f5.firebaseapp.com",
  projectId: "studysync-926f5",
  storageBucket: "studysync-926f5.firebasestorage.app",
  messagingSenderId: "546341564832",
  appId: "1:546341564832:web:35d9c6995c1c684d5f74c5",
  measurementId: "G-QMQ91GT81N",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
