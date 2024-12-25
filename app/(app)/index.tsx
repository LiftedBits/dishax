import HomePageCard from "@/components/home-page-card"
import { useAuth } from "@/contexts/auth"
import { Text, TouchableOpacity, View } from "react-native"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"

const HomePage = () => {
  const { user, logout } = useAuth()
  return (
    <View
      style={{
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: "#550000",
      }}
    >
      <View
        style={{
          width: "100%",
          height: 80,
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 36, fontWeight: "600" }}>
          DishaX
        </Text>
        <MaterialIcons
          name="logout"
          color="#fff"
          size={25}
          style={{
            position: "absolute",
            right: 20,
          }}
          onPress={logout}
        />
      </View>
      <Text
        style={{
          color: "#fff",
          fontSize: 18,
          padding: 10,
          marginTop: 10,
          marginBottom: 20,
        }}
      >
        Welcome to the home page. Please use the below options to collect data!
      </Text>
      <HomePageCard title="Create a new client profile" />
      <HomePageCard title="Use the AI symptom checker" />
      <HomePageCard title="Update existing client profile" />
    </View>
  )
}

export default HomePage
