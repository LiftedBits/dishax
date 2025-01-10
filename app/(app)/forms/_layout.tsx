import Banner from "@/components/banner"
import { useUserSession } from "@/contexts/client-session"
import { Redirect, Stack } from "expo-router"

export default function Layout() {
  const { token, remainingTime } = useUserSession()
  if (!token || remainingTime === 0) {
    return <Redirect href="/(app)/permssions" />
  }
  return <Stack screenOptions={{ header: () => <Banner /> }} />
}
