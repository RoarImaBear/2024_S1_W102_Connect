import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyChY0_7dhC0cnhO8RyrAOaywvkBKB3zO0U",
  authDomain: "aut-connect-8d15c.firebaseapp.com",
  projectId: "aut-connect-8d15c",
  storageBucket: "aut-connect-8d15c.appspot.com",
  messagingSenderId: "109209299656",
  appId: "1:109209299656:web:9c9216df13e106f838d3fd",
  measurementId: "G-49BXD92D8C",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
