
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA1SAxOo-n62_hNTfmRCutY-p8P_OBEaUM",
  authDomain: "pruebas-con-firebase-bbea9.firebaseapp.com",
  projectId: "pruebas-con-firebase-bbea9",
  storageBucket: "pruebas-con-firebase-bbea9.appspot.com",
  messagingSenderId: "684514140852",
  appId: "1:684514140852:web:1ec88501a878ee5036ade1"
};


export const initFirebase = initializeApp(firebaseConfig);