import { useEffect, useRef, useState } from "react"
import { View, Text, Image, StyleSheet, Keyboard } from "react-native"
import WokerLoginCard from "@/components/bottom-card"
import { formBackground, workerLoginButton } from "@/config/colors"
import { ActivityIndicator, Button, TouchableRipple } from "react-native-paper"
import { useAuth } from "@/contexts/auth"
import PhoneInput from "react-native-phone-number-input"
import { router } from "expo-router"
import { OtpInput } from "react-native-otp-entry"

const LoginScreen = () => {
  const { sendOtp, verifyOtp, loading } = useAuth()
  const [keyboardVisible, setKeyboardVisible] = useState(false)
  const phoneInputRef = useRef<PhoneInput>(null)
  const [phoneNumber, setPhoneNumber] = useState<string>("")
  const [formattedValue, setFormattedValue] = useState<string>("")
  const [otpSent, setOtpSent] = useState(false)
  const [retries, setRetries] = useState(0)
  const [resendCountdown, setResendCountdown] = useState(0)

  const handlePhoneChange = (number: string) => {
    setPhoneNumber(number)
  }

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

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (otpSent && resendCountdown > 0) {
      timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [resendCountdown])

  const handleLogin = async () => {
    try {
      await sendOtp(formattedValue)
      console.log("OTP sent")
      setResendCountdown(5)
      setOtpSent(true)
      // router.push("/(app)")
    } catch (error) {
      console.error(error)
    }
  }

  const handleOtpFilled = (otp: string) => {
    console.log(otp)
    verifyOtp(otp)
    router.replace("/(app)")
  }

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Image
          source={require("@/assets/images/disha_logo.png")}
          style={styles.logo}
        />
      </View>
      <WokerLoginCard
        message="Welcome to DishaX"
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
          {!otpSent ? (
            <>
              <View style={{ width: "100%", display: "flex", rowGap: 5 }}>
                <PhoneInput
                  ref={phoneInputRef}
                  defaultCode="IN"
                  layout="first"
                  value={phoneNumber}
                  onChangeText={handlePhoneChange}
                  onChangeFormattedText={setFormattedValue}
                  withDarkTheme
                  withShadow
                  autoFocus
                  textInputStyle={{
                    height: 40,
                    borderRadius: 8,
                    paddingHorizontal: 8,
                  }}
                  containerStyle={{
                    width: "100%",
                    height: 60,
                    marginBottom: 10,
                    borderRadius: 8,
                  }}
                  textContainerStyle={{
                    borderRadius: 8,
                  }}
                />
              </View>
              <Button
                mode="contained"
                disabled={loading}
                style={{
                  width: "100%",
                  marginTop: 10,
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
            </>
          ) : (
            <>
              <View style={{ width: "100%", display: "flex", rowGap: 5 }}>
                <OtpInput
                  numberOfDigits={6}
                  onTextChange={(text) => console.log(text)}
                  theme={{
                    pinCodeTextStyle: {
                      color: "#fff",
                    },
                  }}
                  blurOnFilled
                  focusColor={workerLoginButton}
                  hideStick
                  onFilled={handleOtpFilled}
                />
              </View>
              {/* <Button
                mode="contained"
                disabled={resendCountdown > 0 || loading}
                style={{
                  width: "100%",
                  marginTop: 10,
                  backgroundColor:
                    resendCountdown > 0 || loading
                      ? formBackground
                      : workerLoginButton,
                  height: 50,
                  borderRadius: 8,
                  justifyContent: "center",
                }}
                onPress={async () => {
                  await sendOtp(formattedValue)
                  setResendCountdown(5)
                }}
              >
                <Text
                  style={{
                    color:
                      resendCountdown > 0 ? workerLoginButton : formBackground,
                    fontSize: 16,
                  }}
                >
                  {loading ? (
                    <ActivityIndicator color={workerLoginButton} size="small" />
                  ) : resendCountdown > 0 ? (
                    `Resend otp in ${resendCountdown} s`
                  ) : (
                    "Resend OTP"
                  )}
                </Text>
              </Button> */}
              <TouchableRipple
                onPress={() => {
                  setOtpSent(false)
                }}
              >
                <Text style={{ color: "#fff", fontSize: 16 }}>Go back</Text>
              </TouchableRipple>
            </>
          )}
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
