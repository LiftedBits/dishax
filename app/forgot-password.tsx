import { useEffect, useState } from "react"
import { View, Text, Image, StyleSheet, Keyboard, Alert } from "react-native"
import WokerLoginCard from "@/components/bottom-card"
import { formBackground, workerLoginButton } from "@/config/colors"
import { Button, TextInput, TouchableRipple } from "react-native-paper"
import { useAuth } from "@/contexts/auth"

const ForgotPasswordScreen = () => {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [keyboardVisible, setKeyboardVisible] = useState(false)

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
  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email");
      return;
    }
    try {
      await forgotPassword(email);
      Alert.alert("Success", "If you are registered user a password reset link has been sent to your email.");
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message); // Use the centralized error message from forgotPassword
      } else {
        Alert.alert("Error", "An unexpected error occurred."); // Fallback for unexpected issues
      }
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Image
          source={require("@/assets/images/disha_logo.png")}
          style={styles.logo}
        />
      </View>
      <WokerLoginCard
        message="Forgot password?"
        isAvatarVisible={!keyboardVisible}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            rowGap: 10,
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
            Forgot Password?
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
            onPress={handleForgotPassword}
          >
            <Text style={{ color: "#fff", fontSize: 16 }}>RESET PASSWORD</Text>
          </Button>

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

export default ForgotPasswordScreen
