// Firebase configuration
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  enableNetwork,
  disableNetwork,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
 apiKey: "AIzaSyCpL6rmI2HqlNbpoDwI2JG5OTo_RhljfoE",
  authDomain: "medicare-74337.firebaseapp.com",
  projectId: "medicare-74337",
  storageBucket: "medicare-74337.firebasestorage.app",
  messagingSenderId: "892203201399",
  appId: "1:892203201399:web:d21113a232283e79022772",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Enable offline persistence
try {
  // Enable offline persistence for better user experience
  enableNetwork(db);
} catch (error) {
  console.warn("Firestore offline persistence failed:", error);
}

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

// Facebook Auth Provider
export const facebookProvider = new FacebookAuthProvider();

export default app;
