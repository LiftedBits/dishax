import Ionicons from "@expo/vector-icons/Ionicons"
import { View, Text, Dimensions } from "react-native"
import { MenuButton } from "../button"
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler"
import AntDesign from "@expo/vector-icons/AntDesign"
import { useRef } from "react"

const FormList = () => {
  const ref = useRef<ScrollView>(null)
  const scrollToTop = () => {
    ref.current?.scrollTo({ y: 0, animated: true })
  }

  const scrollToBottom = () => {
    ref.current?.scrollToEnd({ animated: true })
  }
  const forms = [
    "form1",
    "form2",
    "form3",
    "form4",
    "form5",
    "form6",
    "form1",
    "form2",
    "form3",
    "form4",
    "form5",
    "form6",
    "form1",
    "form2",
    "form3",
    "form4",
    "form5",
    "form6",
  ]
  return (
    <View style={{ flexDirection: "row" }}>
      <View
        style={{
          flex: 0.2,
          height: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 16,
        }}
      >
        <AntDesign
          name="up"
          color="#fff"
          size={24}
          style={{ opacity: 0.7 }}
          onPress={scrollToTop}
        />
        <AntDesign
          name="down"
          color="#fff"
          size={24}
          style={{ opacity: 0.7 }}
          onPress={scrollToBottom}
        />
      </View>
      <GestureHandlerRootView style={{ flex: 0.8, height: "100%" }}>
        <ScrollView
          style={{ rowGap: 16 }}
          contentContainerStyle={{ paddingBottom: 16, rowGap: 16 }}
          ref={ref}
        >
          {forms.map((form, index) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                width: "100%",
              }}
              key={index}
            >
              <MenuButton buttonText={form} onPress={() => {}} width={250} />
              <Ionicons name="checkmark-done-circle" size={32} color="green" />
            </View>
          ))}
        </ScrollView>
      </GestureHandlerRootView>
    </View>
  )
}

export default FormList
