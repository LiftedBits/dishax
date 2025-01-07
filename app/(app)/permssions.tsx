import React, { useCallback, useRef, useState } from "react"
import { View, Text, ScrollView } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"
import SignatureBox from "./signature"
import Banner from "@/components/banner"
import AntDesign from "@expo/vector-icons/AntDesign"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import Ionicons from "@expo/vector-icons/Ionicons"
import { workerLoginButton, workerLoginCard } from "@/config/colors"
import { Checkbox } from "react-native-paper"
import { MenuButton, PrimaryButton } from "@/components/button"
import PhoneInput from "react-native-phone-number-input"
import { Keyboard } from "react-native"
import { OtpInput } from "react-native-otp-entry"
import { useRouter } from "expo-router"

const Permissions = ({}) => {
  const router = useRouter()
  type Operation = "phone_verification" | "consent"
  const [status, setStatus] = useState<"checked" | "unchecked">("checked")
  const [consentProgress, setConsentProgress] = useState<
    "none" | "checked" | "signed"
  >("none")
  const phoneInputRef = useRef<PhoneInput>(null)
  const [phoneNumber, setPhoneNumber] = useState<string>("")
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState<string>("")
  const [phoneVerficationProgress, setPhoneVerificationProgress] = useState<
    "none" | "otp-sent" | "verified"
  >("none")
  const [otpSent, setOtpSent] = useState(false)
  const [retries, setRetries] = useState(0)
  const [resendCountdown, setResendCountdown] = useState(0)
  const handlePhoneChange = (number: string) => {
    setPhoneNumber(number)
  }

  const phoneVerficationRef = useRef<BottomSheet>(null)
  const consentSheetRef = useRef<BottomSheet>(null)
  const refs = {
    phone_verification: phoneVerficationRef,
    consent: consentSheetRef,
  }
  const open = useCallback((operation: Operation) => {
    refs[operation].current?.expand()
  }, [])
  const handleClose = useCallback((operation: Operation) => {
    refs[operation].current?.close()
    Keyboard.dismiss()
  }, [])

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}
    >
      <Banner />
      <View
        style={{
          alignItems: "center",
          rowGap: 20,
          marginTop: 20,
          paddingLeft: 20,
        }}
      >
        <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
          <MenuButton
            onPress={() => {
              handleClose("consent")
              open("phone_verification")
            }}
            buttonText="Verify phone number"
            width={250}
          />
          {phoneVerficationProgress === "verified" ? (
            <Ionicons name="checkmark-done-circle" size={24} color="#3acc6c" />
          ) : (
            <MaterialIcons name="pending-actions" size={24} color="black" />
          )}
        </View>
        <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
          <MenuButton
            onPress={() => {
              handleClose("phone_verification")
              open("consent")
            }}
            buttonText="Take Consent"
            width={250}
          />
          {consentProgress === "signed" ? (
            <Ionicons name="checkmark-done-circle" size={24} color="#3acc6c" />
          ) : (
            <MaterialIcons name="pending-actions" size={24} color="black" />
          )}
        </View>
        <PrimaryButton
          buttonText="Proceed"
          onPress={() => {
            router.push({
              pathname: "/forms",
              params: { phone: formattedPhoneNumber },
            })
          }}
        //   disabled={
        //     phoneVerficationProgress !== "verified" ||
        //     consentProgress !== "signed"
        //   }
        />
      </View>
      <BottomSheet
        ref={consentSheetRef}
        index={-1}
        snapPoints={["80%"]}
        enablePanDownToClose={false}
        enableContentPanningGesture={false}
        handleComponent={() => null}
        style={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          overflow: "hidden",
        }}
      >
        <BottomSheetView
          style={{
            flex: 1,
            padding: 40,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: workerLoginCard,
          }}
        >
          <View
            style={{
              width: "100%",
              marginBottom: 20,
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
              Consent form
            </Text>
            <AntDesign
              name="close"
              size={28}
              color="#fff"
              onPress={() => handleClose("consent")}
              style={{ position: "absolute", right: 0, top: 4 }}
            />
          </View>
          <View
            style={{
              borderWidth: 3,
              borderColor: "#fff",
              width: 60,
              height: 0,
              marginBottom: 20,
            }}
          />
          {consentProgress === "none" ? (
            <>
              <ScrollView
                style={{
                  backgroundColor: "white",
                  height: 350,
                  overflow: "scroll",
                  borderRadius: 20,
                  padding: 20,
                }}
                contentContainerStyle={{
                  paddingBottom: 40,
                }}
              >
                <Text style={{ color: "#707070", fontSize: 12 }}>
                  This is to request your permission to collect data for
                  screening, triaging, risk assessment and Al based symptom
                  assessment purposes. The aim is to make healthcare naviagtion
                  easier through digital pathways for mental and physical health
                  problems. The organisation collecting data are HIPAA compliant
                  and are updating the provisions in the Digital personal data
                  protection bill 2022. The method that will be used to meet
                  this purpose are completing socio demographic forms, clinical
                  risk scales and Al based tools Your personal identifiers will
                  remain anonymous and confidential. Your participation might
                  help understand population health, perform analytics and
                  health navigation better. You can withdraw from the screening
                  at any point of time and your data will be anonymised. In the
                  event you choose to withdraw from the screening in between all
                  information you provide will be destroyed and omitted.This
                  would not disturb healthcare you are seeking or providing
                  currently or in future with the healthcare organization.
                </Text>
                <Text style={{ color: "#707070", marginTop: 10, fontSize: 12 }}>
                  There will be no direct benefits to you. There are no monetary
                  benefits for participating in the screening. There will be no
                  cost to you for participating in this screening but there
                  could be charges for using the Al tool and related services.
                  This is to confirm that you are above 18 years of age. The
                  alternative is not to participate in this screening. Any
                  studies published will go through a ethics committee. I
                  understand that if I inform the health care digital navigator
                  that myself or someone else is at risk of harm they may have
                  to report this to the relevant authorities - they will discuss
                  this with me first but may be required to report with or
                  without my permission. You might get a further direction to
                  access the health care providers through telemedicine route
                  and /or physical connect which would be your responsibility to
                  access after screening information or risk is indicated. You
                  might get reminder for parameters in case they are above range
                  in case after your permission to get a follow up through a
                  customer relationship management system. I am fully aware that
                  my participation is voluntary and that I can withdraw from the
                  study at any time, without giving any reason.
                </Text>
              </ScrollView>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <Checkbox
                  status={status}
                  onPress={() => {
                    setStatus(status === "checked" ? "unchecked" : "checked")
                  }}
                  color="#fff"
                />
                <Text style={{ color: "#fff" }}>
                  By accepting you are agreeing to all terms and conditions
                </Text>
              </View>
              <PrimaryButton
                loading={false}
                disabled={status !== "checked"}
                onPress={() => {
                  setConsentProgress("checked")
                }}
                buttonText="Get signature"
                sx={{ width: "100%" }}
              />
            </>
          ) : (
            <SignatureBox
              onSave={() => {
                setConsentProgress("signed")
                console.log("signed in")
              }}
            />
          )}
        </BottomSheetView>
      </BottomSheet>
      <BottomSheet
        ref={phoneVerficationRef}
        index={-1}
        snapPoints={["40%"]}
        enablePanDownToClose={false}
        enableContentPanningGesture={false}
        handleComponent={() => null}
        style={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          overflow: "hidden",
        }}
      >
        <BottomSheetView
          style={{
            flex: 1,
            padding: 40,
            alignItems: "center",
            justifyContent: "space-evenly",
            backgroundColor: workerLoginCard,
          }}
        >
          <View
            style={{
              width: "100%",
              marginBottom: 20,
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
              Phone verification
            </Text>
            <AntDesign
              name="close"
              size={28}
              color="#fff"
              onPress={() => handleClose("phone_verification")}
              style={{ position: "absolute", right: 10, top: 4 }}
            />
          </View>
          <View
            style={{
              borderWidth: 3,
              borderColor: "#fff",
              width: 60,
              height: 0,
              marginBottom: 20,
            }}
          />
          {phoneVerficationProgress === "none" ? (
            <>
              <PhoneInput
                ref={phoneInputRef}
                defaultCode="IN"
                layout="first"
                value={phoneNumber}
                onChangeText={handlePhoneChange}
                onChangeFormattedText={setFormattedPhoneNumber}
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
              <PrimaryButton
                buttonText="SEND OTP"
                onPress={() => {
                  setPhoneVerificationProgress("otp-sent")
                }}
                sx={{ width: "100%" }}
              />
            </>
          ) : (
            <>
              <OtpInput
                numberOfDigits={6}
                onTextChange={(text) => console.log(text)}
                theme={{
                  pinCodeTextStyle: {
                    color: "#fff",
                  },
                  pinCodeContainerStyle: {
                    borderWidth: 0,
                    borderBottomWidth: 1,
                    borderRadius: 0,
                  },
                }}
                placeholder="******"
                blurOnFilled
                focusColor={workerLoginButton}
                hideStick
                onFilled={() => {
                  console.log("otp filled")
                }}
              />
              <View
                style={{
                  width: "100%",
                  marginTop: 16,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#fff",
                  }}
                  disabled={resendCountdown > 0}
                  onPress={() => {
                    console.log("Resending OTP")
                  }}
                >
                  Resend OTP
                  {resendCountdown > 0 ? `in ${resendCountdown} s` : ""}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#fff",
                  }}
                  onPress={() => {
                    setPhoneVerificationProgress("none")
                  }}
                >
                  Go back
                </Text>
              </View>
              <PrimaryButton
                buttonText="VERIFY"
                onPress={() => {
                  setPhoneVerificationProgress("verified")
                }}
                sx={{ width: "100%" }}
              />
            </>
          )}
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  )
}

export default Permissions
