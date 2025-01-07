import {
  useGlobalSearchParams,
  useLocalSearchParams,
  useRouter,
} from "expo-router"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

export default function FormsPage() {
  const { phone } = useLocalSearchParams() // Retrieve phone number
  const glob = useGlobalSearchParams()
  const loc = useLocalSearchParams()
  console.log("loc", loc)
  console.log("glob", glob)
  const router = useRouter()

  const navigateToForm = (formId: string) => {
    router.push(`/forms/${formId}`)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Phone Number: {phone}</Text>
      <TouchableOpacity
        onPress={() => {
          navigateToForm("form1")
          console.log("going to form1")
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Go to Form 1</Text>
      </TouchableOpacity>
      <TouchableOpacity
        // onPress={() => navigateToForm("form2")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Go to Form 2</Text>
      </TouchableOpacity>
      <Text>{phone}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
})
