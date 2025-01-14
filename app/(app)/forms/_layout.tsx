import Banner from "@/components/banner"
import { useUserSession } from "@/contexts/client-session"
import { Redirect, Stack } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Layout() {
  const { token, remainingTime } = useUserSession()
  // if (!token || remainingTime === 0) {
  //   return <Redirect href="/(app)/permssions" />
  // }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack screenOptions={{ header: () => <Banner /> }} />
    </SafeAreaView>
  )
}
