import { initializeApp } from "firebase/app";
import { browserLocalPersistence, getAuth, setPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZMApUAb6Wwnopqn2TR2V1SdxL3v-BYdM",
  authDomain: "journaling-app-65a3c.firebaseapp.com",
  projectId: "journaling-app-65a3c",
  storageBucket: "journaling-app-65a3c.firebasestorage.app",
  messagingSenderId: "116408645962",
  appId: "1:116408645962:web:c3faa8007252dee33ee9b3",
  measurementId: "G-S6WX44C2EL"
};

const app = initializeApp(firebaseConfig);

// web preview: persist in browser storage
export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);

export const db = getFirestore(app);
