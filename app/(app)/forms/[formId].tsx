import { useGlobalSearchParams, useLocalSearchParams } from "expo-router"
import { View, Text, StyleSheet } from "react-native"

export default function FormDetailsPage() {
  // const { phone } = useLocalSearchParams()
  // console.log(phone)
  console.log(useLocalSearchParams())
  console.log(useGlobalSearchParams())
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Form Details for: </Text>
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
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
})
