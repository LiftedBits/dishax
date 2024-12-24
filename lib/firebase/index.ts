import { initializeApp } from "firebase/app"
// import { getAuth } from "firebase/auth"
import {
  initializeAuth,
  // @ts-ignore
  getReactNativePersistence,
} from "firebase/auth"
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage"

const firebaseConfig = {
  apiKey: "AIzaSyBYYSPuiVWFc1otr5N3fu2fnoYEOK9LjRw",
  authDomain: "upayaa-disha.firebaseapp.com",
  projectId: "upayaa-disha",
  storageBucket: "upayaa-disha.firebasestorage.app",
  messagingSenderId: "754265131731",
  appId: "1:754265131731:web:7d3b529f3462ea4891a226",
  measurementId: "G-747XZVEZ87",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
})
