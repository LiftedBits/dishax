import { createContext, useContext, useEffect, useState } from "react"

interface UserSessionContextProps {
  token: string | null
  remainingTime: number
  startSession: (token: string) => void
  endSession: () => void
}

const UserSessionContext = createContext<UserSessionContextProps | undefined>(
  undefined
)

export const UserSessionProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const TOKEN_VALIDITY_DURATION = 60 * 60
  const [token, setToken] = useState<string | null>("abc")
  const [remainingTime, setRemainingTime] = useState<number>(
    TOKEN_VALIDITY_DURATION
  )
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    console.log("use effect triggered")
    if (token) {
      const interval = setInterval(() => {
        if (remainingTime > 0) setRemainingTime((time) => time - 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [token])

  const startSession = (_token: string) => {
    setToken(_token)
    setRemainingTime(TOKEN_VALIDITY_DURATION)
    if (timer) {
      clearTimeout(timer)
    }
    const newTimer = setTimeout(() => {
      endSession()
    }, TOKEN_VALIDITY_DURATION * 1000)
    setTimer(newTimer)
  }

  const endSession = () => {
    setToken(null)
    setRemainingTime(0)
    if (timer) {
      clearTimeout(timer)
    }
  }

  useEffect(() => {})
  return (
    <UserSessionContext.Provider
      value={{ token, remainingTime, startSession, endSession }}
    >
      {children}
    </UserSessionContext.Provider>
  )
}

export const useUserSession = () => {
  const context = useContext(UserSessionContext)
  if (!context) {
    throw new Error("Not inside a valid user session")
  }
  return context
}
