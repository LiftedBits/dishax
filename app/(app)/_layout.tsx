import { useAuth } from "@/contexts/auth"
import { Redirect, Stack } from "expo-router"
import { SafeAreaView, Text } from "react-native"

const AppLayout = () => {
  const { user, loading } = useAuth()
  if (loading) {
    return <Text>Loading...</Text>
  }
  if (!user) {
    return <Redirect href="/login" />
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  )
}

export default AppLayout
