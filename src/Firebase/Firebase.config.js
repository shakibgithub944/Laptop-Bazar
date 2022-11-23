// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDJK0obP8jpU50FM-wWR6MzuDi3ytACf-8",
    authDomain: "laptop-bazar-a7f17.firebaseapp.com",
    projectId: "laptop-bazar-a7f17",
    storageBucket: "laptop-bazar-a7f17.appspot.com",
    messagingSenderId: "381691763439",
    appId: "1:381691763439:web:c6c3cd715bc663ecda191a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;