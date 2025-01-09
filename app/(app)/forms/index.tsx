import FormList from "@/components/form-list"
import { workerLoginCard } from "@/config/colors"
import {
  useGlobalSearchParams,
  useLocalSearchParams,
  useRouter,
} from "expo-router"
import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function FormsPage() {
  const { phone } = useLocalSearchParams()
  const glob = useGlobalSearchParams()
  const loc = useLocalSearchParams()
  console.log("loc", loc)
  console.log("glob", glob)
  const router = useRouter()

  const navigateToForm = (formId: string) => {
    router.push(`/forms/${formId}`)
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: workerLoginCard,
        paddingHorizontal: 8,
        paddingTop: 24,
      }}
    >
      <View style={{ paddingHorizontal: 16 }}>
        <Text style={{ color: "#fff", fontSize: 24 }}>Hello! Suresh Kumar</Text>
        <Text
          style={{
            color: "#fff",
            fontSize: 16,
            marginTop: 16,
            fontWeight: "600",
          }}
        >
          Welcome to your client name page, please use the below forms to
          collect data!
        </Text>
      </View>

      <View style={{ flex: 1, marginTop: 48, marginBottom: 32 }}>
        <FormList />
      </View>
    </SafeAreaView>
  )
}
