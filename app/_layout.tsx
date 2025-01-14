import { AuthProvider } from "@/contexts/auth"
import { UserSessionProvider } from "@/contexts/client-session"
import { Slot } from "expo-router"
import { SafeAreaView } from "react-native"

export default function RootLayout() {
  return (
    <AuthProvider>
      <UserSessionProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Slot />
        </SafeAreaView>
      </UserSessionProvider>
    </AuthProvider>
  )
}
