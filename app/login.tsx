import { useEffect, useState } from "react"
import { View, Text, Image, StyleSheet, Keyboard } from "react-native"
import WokerLoginCard from "@/components/bottom-card"
import { formBackground, workerLoginButton } from "@/config/colors"
import {
  ActivityIndicator,
  Button,
  TextInput,
  TouchableRipple,
} from "react-native-paper"
import { useAuth } from "@/contexts/auth"
import { router } from "expo-router"

const LoginScreen = () => {
  const { login, loading, state, message, forgotPassword } = useAuth()
  const [keyboardVisible, setKeyboardVisible] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordVisible, setPasswordVisible] = useState(false)

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true)
      }
    )

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false)
      }
    )

    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  const handleLogin = async () => {
    Keyboard.dismiss()
    const success = await login(email, password)
    if (success) {
      router.push("/(app)")
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Image
          source={require("@/assets/images/disha_logo.png")}
          style={styles.logo}
        />
      </View>
      <WokerLoginCard message={message} isAvatarVisible={!keyboardVisible}>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            rowGap: 10,
            paddingHorizontal: 16,
            paddingBottom: 24,
          }}
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
            <Text style={{ color: "#fff", fontSize: 16 }}>Email</Text>
            <TextInput
              placeholder="worker@disha.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              style={{
                width: "100%",
                height: 50,
                marginTop: 5,
                borderRadius: 8,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
              }}
            />
            <Text style={{ color: "#fff", fontSize: 16, marginTop: 12 }}>
              Password
            </Text>
            <TextInput
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={setPassword}
              placeholder="* * * * * *"
              mode="flat"
              style={{
                width: "100%",
                height: 50,
                marginTop: 5,
                borderRadius: 8,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
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
          <Button
            mode="contained"
            disabled={loading}
            style={{
              width: "100%",
              marginTop: 24,
              backgroundColor: loading ? formBackground : workerLoginButton,
              height: 50,
              borderRadius: 8,
              justifyContent: "center",
            }}
            onPress={handleLogin}
          >
            {loading ? (
              <ActivityIndicator color={workerLoginButton} size="small" />
            ) : (
              <Text style={{ color: "#fff", fontSize: 16 }}>LOGIN</Text>
            )}
          </Button>
          <TouchableRipple
            style={styles.forgotPassword}
            onPress={() => {
              router.push("/forgot_password")
            }}
          >
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
