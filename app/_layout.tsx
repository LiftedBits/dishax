import { AuthProvider } from "@/contexts/auth"
import { UserSessionProvider } from "@/contexts/client-session"
import { Slot } from "expo-router"

export default function RootLayout() {
  return (
    <AuthProvider>
      <UserSessionProvider>
        <Slot />
      </UserSessionProvider>
    </AuthProvider>
  )
}
