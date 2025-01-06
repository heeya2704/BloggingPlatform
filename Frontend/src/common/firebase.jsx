// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD-qrL55bX9LqXEQXTgCoGNEQDdKxgdB6Y",
  authDomain: "blogging-platform-c86e0.firebaseapp.com",
  projectId: "blogging-platform-c86e0",
  storageBucket: "blogging-platform-c86e0.appspot.com",
  messagingSenderId: "749452200421",
  appId: "1:749452200421:web:beba6d43b9a7ea1a5bc70c",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

const authWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user; // Get user information
    return user;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    throw error; // Rethrow the error to handle it elsewhere
  }
};

export { authWithGoogle, auth };