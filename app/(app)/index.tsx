import { useAuth } from "@/contexts/auth"
import { Text, TouchableOpacity, View } from "react-native"

const HomePage = () => {
  const { user, logout } = useAuth()
  return (
    <View style={{ flex: 1 }}>
      <Text>logged in as {user?.email}</Text>
      <TouchableOpacity
        onPress={() => {
          logout()
        }}
        style={{ backgroundColor: "#978", width: "50%", height: 50 }}
      >
        <Text>Log out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomePage
