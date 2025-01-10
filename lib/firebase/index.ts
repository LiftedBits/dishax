import { initializeApp } from "firebase/app"
import {
  initializeAuth,
  // @ts-ignore
  getReactNativePersistence,
} from "firebase/auth"
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage"
import { getFunctions } from "@react-native-firebase/functions"

const firebaseConfig = {
  apiKey: "AIzaSyBYYSPuiVWFc1otr5N3fu2fnoYEOK9LjRw",
  authDomain: "upayaa-disha.firebaseapp.com",
  projectId: "upayaa-disha",
  storageBucket: "upayaa-disha.firebasestorage.app",
  messagingSenderId: "754265131731",
  appId: "1:754265131731:web:7d3b529f3462ea4891a226",
  measurementId: "G-747XZVEZ87",
}

const app = initializeApp(firebaseConfig)
export const functions = getFunctions(app, "asia-south1")
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
})
