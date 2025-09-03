import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
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

// Native: persist with AsyncStorage
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);
