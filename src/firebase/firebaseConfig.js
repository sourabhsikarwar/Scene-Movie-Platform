// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDk6-_-dlfKywBpQ73VkswgLkGoXwARXoo",
  authDomain: "ott-platform-df969.firebaseapp.com",
  projectId: "ott-platform-df969",
  storageBucket: "ott-platform-df969.appspot.com",
  messagingSenderId: "331080759808",
  appId: "1:331080759808:web:022cdaf8671d41176736e5",
  measurementId: "G-TN6HM3MJF3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);
export const analytics = getAnalytics(app);