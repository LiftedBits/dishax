import { useState } from "react"
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native"
// import DishaLogo from "../../assets/images/disha_logo.png"
import WokerLoginCard from "../../components/bottom-card"
import { formBackground, workerLoginButton } from "../../config/colors"
import { Button, TextInput, TouchableRipple } from "react-native-paper"
import { useAuth } from "../../contexts/auth"

const LoginScreen = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordVisible, setPasswordVisible] = useState(false)
  const { login } = useAuth()

  const handleLogin = async () => {
    try {
      await login(email, password)
      console.log("Logged in")
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Image
          source={require("../../assets/images/disha_logo.png")}
          style={styles.logo}
        />
      </View>
      <WokerLoginCard>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            rowGap: 10,
          }}
        //   contentContainerStyle={{
        //     alignItems: "center",
        //     justifyContent: "center",
        //   }}
        >
          <Text
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: "#fff",
              textAlign: "center",
            }}
          >
            Welcome to DishaX
          </Text>
          <View
            style={{
              borderWidth: 3,
              borderColor: "#fff",
              width: 60,
              height: 0,
            }}
          />
          <View style={{ width: "100%", display: "flex", rowGap: 5 }}>
            <View style={{ width: "100%" }}>
              <Text style={{ color: "#fff", fontSize: 16 }}>Email Id</Text>
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                style={{
                  width: "100%",
                  height: 50,
                  marginTop: 5,
                  borderRadius: 8,
                }}
              />
            </View>
            <View style={{ width: "100%" }}>
              <Text style={{ color: "#fff", fontSize: 16 }}>Password</Text>
              <TextInput
                secureTextEntry={!passwordVisible}
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                mode="outlined"
                style={{
                  width: "100%",
                  height: 50,
                  marginTop: 5,
                  borderRadius: 8,
                }}
                right={
                  <TextInput.Icon
                    icon="eye"
                    onPress={() => {
                      setPasswordVisible((visibility) => !visibility)
                    }}
                  />
                }
              />
            </View>
          </View>
          <Button
            mode="contained"
            style={{
              width: "100%",
              marginTop: 10,
              backgroundColor: workerLoginButton,
              height: 50,
              borderRadius: 8,
              justifyContent: "center",
            }}
            onPress={handleLogin}
          >
            <Text style={{ color: "#fff", fontSize: 16 }}>LOGIN</Text>
          </Button>
          <TouchableRipple onPress={() => {}}>
            <Text style={{ color: "#fff", fontSize: 16 }}>
              Forgot Password?
            </Text>
          </TouchableRipple>
        </View>
      </WokerLoginCard>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: formBackground,
  },
  banner: {
    width: "100%",
    height: 100,
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: "45%",
    objectFit: "scale-down",
  },
  backgroundMessage: {
    position: "absolute",
    top: 220,
    fontSize: 24,
    color: "#000",
    textAlign: "center",
  },
  bottomSheet: {
    backgroundColor: "#fff",
    padding: 16,
    height: 300,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  forgotPassword: {
    marginTop: 16,
    color: "#007bff",
    textAlign: "center",
  },
})

export default LoginScreen
