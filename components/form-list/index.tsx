import Ionicons from "@expo/vector-icons/Ionicons"
import { View } from "react-native"
import { MenuButton } from "../button"
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler"
import AntDesign from "@expo/vector-icons/AntDesign"
import { useRef } from "react"
import { router } from "expo-router"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"

interface FormListProps {
  list: {
    [key: string]: {
      name: string
      complete: boolean
    }
  }
}

const FormList = ({ list }: FormListProps) => {
  const ref = useRef<ScrollView>(null)
  const scrollToTop = () => {
    ref.current?.scrollTo({ y: 0, animated: true })
  }

  const scrollToBottom = () => {
    ref.current?.scrollToEnd({ animated: true })
  }
  const formIds = Object.keys(list)
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
          {formIds.map((formId) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                width: "100%",
              }}
              key={formId}
            >
              <MenuButton
                buttonText={list[formId].name}
                onPress={() => {
                  router.push(`/(app)/forms/${formId}`)
                }}
                width={250}
              />
              {list[formId].complete ? (
                <Ionicons
                  name="checkmark-done-circle"
                  size={32}
                  color="green"
                />
              ) : (
                <MaterialIcons name="pending" size={32} color="orange" />
              )}
            </View>
          ))}
        </ScrollView>
      </GestureHandlerRootView>
    </View>
  )
}

export default FormList
