import { useAuth } from "@/contexts/auth"
import { Redirect, Stack } from "expo-router"
import { Text } from "react-native"

const AppLayout = () => {
  const { user, loading } = useAuth()
  if (loading) {
    return <Text>Loading...</Text>
  }
  if (!user) {
    return <Redirect href="/login" />
  }
  return <Stack screenOptions={{ headerShown: false }} />
}

export default AppLayout
