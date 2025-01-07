import HomePageCard from "@/components/home-page-card"
import { useAuth } from "@/contexts/auth"
import { ScrollView, Text } from "react-native"
import { router } from "expo-router"
import { SafeAreaView } from "react-native"
import Banner from "@/components/banner"
import { formBackground, workerLoginCard } from "@/config/colors"

const HomePage = () => {
  const { user, logout } = useAuth()
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: formBackground,
      }}
    >
      <Banner />
      <ScrollView
        style={{
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <Text
          style={{
            marginTop: 24,
            fontWeight: 400,
            fontSize: 24,
            color: workerLoginCard,
          }}
        >
          Hello! {user?.displayName}Suresh Kumar
        </Text>
        <Text
          style={{
            color: workerLoginCard,
            fontSize: 18,
            fontWeight: 600,
            padding: 10,
            marginTop: 10,
            marginBottom: 16,
          }}
        >
          Welcome to the home page. Please use the below options to collect
          data!
        </Text>
        <HomePageCard
          title="Create a new client profile"
          onPress={() => {
            router.push("/(app)/permssions")
          }}
        />
        <HomePageCard
          title="Use the AI symptom checker"
          onPress={() => {
            // router.push("/register")
          }}
        />
        <HomePageCard
          title="Update existing client profile"
          onPress={() => {
            // router.push("/register")
          }}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomePage
