import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyAQ2bebCAebC8FYMhKta-TggWiKfm8PdUg",
  authDomain: "proyecto-mieconomia.firebaseapp.com",
  projectId: "proyecto-mieconomia",
  storageBucket: "proyecto-mieconomia.appspot.com",
  messagingSenderId: "412622775791",
  appId: "1:412622775791:web:4ea4c7f680343473d7821a",
  measurementId: "G-046S9ZYNP9"
};


export const initFirebase = initializeApp(firebaseConfig);
export const db = getFirestore(initFirebase)
