// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API,
    authDomain: "oe-chat-app.firebaseapp.com",
    projectId: "oe-chat-app",
    storageBucket: "oe-chat-app.appspot.com",
    messagingSenderId: "793276203033",
    appId: "1:793276203033:web:8cea4616dfb67c7b7c6a88",
    measurementId: "G-ZJNE3ZG0EY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
