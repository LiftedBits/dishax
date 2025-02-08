import { AuthProvider } from "@/contexts/auth"
import { UserSessionProvider } from "@/contexts/client-session"
import { Slot } from "expo-router"
import { SafeAreaView } from "react-native"

export default function RootLayout() {
  console.log("Expo key: ", process.env.EXPO_PUBLIC_API_KEY)
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
