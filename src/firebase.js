// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_3UF6Xwec_lyRpHJCxcLeVzMMjPDXVh0",
  authDomain: "todo-app-5bbf2.firebaseapp.com",
  projectId: "todo-app-5bbf2",
  storageBucket: "todo-app-5bbf2.appspot.com",
  messagingSenderId: "449405052960",
  appId: "1:449405052960:web:dc9dafe7c83001ae08b445"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);