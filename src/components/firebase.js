// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsmJ_z7n0rdoZA1WCEN7qSCM25yMgVBfc",
  authDomain: "todolist-98121.firebaseapp.com",
  projectId: "todolist-98121",
  storageBucket: "todolist-98121.appspot.com",
  messagingSenderId: "136251422320",
  appId: "1:136251422320:web:7844fa2a8ea9710ac6a6b5",
  measurementId: "G-N6NN1DDGD9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// firebase.initializeApp(firebase.config);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
