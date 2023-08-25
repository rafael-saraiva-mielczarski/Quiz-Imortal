// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDL6vmqMO62yLYOK4EMa8krQiQk0X6CnK4",
  authDomain: "quiz-imortal.firebaseapp.com",
  databaseURL: "https://quiz-imortal-default-rtdb.firebaseio.com/",
  projectId: "quiz-imortal",
  storageBucket: "quiz-imortal.appspot.com",
  messagingSenderId: "995626277113",
  appId: "1:995626277113:web:dc7435782d2650d4542a28",
  measurementId: "G-KKGVE6EXZR",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
