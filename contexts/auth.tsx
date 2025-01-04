import React, { createContext, useContext, useEffect, useState } from "react"
import {
  // User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"
// import { auth } from "../lib/firebase"
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"

interface AuthContextProps {
  user: FirebaseAuthTypes.User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  forgotPassword: (email: string) => Promise<void>
  sendOtp: (phoneNumber: string) => Promise<void>
  verifyOtp: (otp: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)
  const [loading, setLoading] = useState(true)
  const [confirmationResult, setConfirmationResult] = useState<any>(null)

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((authUser) => {
      setUser(authUser)
      setLoading(false) // Finished loading once we have the initial auth state
    })

    // Cleanup the subscription on unmount
    return unsubscribe
  }, [])

  // const login = async (email: string, password: string) => {
  //   setLoading(true)
  //   try {
  //     await signInWithEmailAndPassword(auth, email, password)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      await auth().signInWithEmailAndPassword(email, password)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const forgotPassword = async (email: string) => {
    setLoading(true)
    try {
      await auth().sendPasswordResetEmail(email)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const sendOtp = async (phoneNumber: string) => {
    console.log(`Sending OTP to ${phoneNumber}`)
    setLoading(true)
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber)
      console.log("OTP sent")
      setConfirmationResult(confirmation)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const verifyOtp = async (otp: string) => {
    setLoading(true)
    try {
      await confirmationResult.confirm(otp)
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    try {
      // await signOut(auth)
      await auth().signOut()
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        sendOtp,
        verifyOtp,
        logout,
        login,
        forgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
