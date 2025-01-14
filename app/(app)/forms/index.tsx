import { PrimaryButton } from "@/components/button"
import FormList from "@/components/form-list"
import { workerLoginCard } from "@/config/colors"
import { forms } from "@/config/forms"
import { useUserSession } from "@/contexts/client-session"
import { useFormData } from "@/contexts/form-data"
import { getTimeStr } from "@/lib/utils"
import { useFocusEffect } from "@react-navigation/native"
import { router, useLocalSearchParams } from "expo-router"
import { useCallback, useEffect, useState } from "react"
import { Alert, BackHandler, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function FormsPage() {
  const { phone } = useLocalSearchParams()
  const { remainingTime, startSession } = useUserSession()
  const { formData } = useFormData()

  const [areFormsComplete, setAreFormsComplete] = useState(false)

  const formList = Object.fromEntries(
    Object.keys(forms).map((formId) => [
      formId,
      {
        complete: Object.keys(formData).includes(formId),
        name: forms[formId].name,
      },
    ])
  )
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          "End session",
          "Going back will end the current client session, Are you sure?",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Yes", onPress: () => router.back() },
          ]
        )
        return true
      }

      BackHandler.addEventListener("hardwareBackPress", onBackPress)

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress)
    }, [])
  )
  useEffect(() => {
    const entries = Object.entries(formList)
    let isComplete: boolean = true
    entries.forEach((entry) => (isComplete = isComplete && entry[1].complete))
    setAreFormsComplete(isComplete)
  }, [formData])

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: workerLoginCard,
        paddingHorizontal: 8,
        paddingVertical: 24,
      }}
    >
      <View style={{ paddingHorizontal: 16 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 24 }}>
            Hello! Suresh Kumar
          </Text>
          <Text style={{ color: "#fff" }}>
            Session: {getTimeStr(remainingTime)}
          </Text>
        </View>
        <Text
          style={{
            color: "#fff",
            fontSize: 16,
            marginTop: 16,
            fontWeight: "600",
          }}
          onPress={() => {
            startSession("abc")
          }}
        >
          Welcome to your "client name" page, please use the below forms to
          collect data!
        </Text>
      </View>

      <View style={{ flex: 1, marginTop: 48, marginBottom: 16 }}>
        <FormList list={formList} />
      </View>
      <View style={{ alignItems: "center" }}>
        <Text
          style={{ color: "#fff", fontStyle: "italic", paddingHorizontal: 16 }}
        >
          All your data is secured, with clicking submit you are agree to all
          terms.
        </Text>
        <PrimaryButton
          buttonText="SUBMIT"
          onPress={() => {}}
          disabled={!areFormsComplete}
          sx={{ width: 200 }}
        />
      </View>
    </SafeAreaView>
  )
}
