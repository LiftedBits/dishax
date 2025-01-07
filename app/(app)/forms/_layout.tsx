import Banner from "@/components/banner"
import { Stack } from "expo-router"

export default function Layout() {
  return <Stack screenOptions={{ header: () => <Banner /> }} />
}
