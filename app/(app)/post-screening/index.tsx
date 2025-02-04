import { MenuButton, PrimaryButton } from "@/components/button"
import { formBackground, workerLoginCard } from "@/config/colors"
import { router } from "expo-router"
import { View, Text, Image } from "react-native"

const PostScreeningPage = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: formBackground,
        justifyContent: "flex-end",
        alignItems: "center",
        padding: 50,
        rowGap: 50,
      }}
    >
      <Image
        source={require("@/assets/images/tick.png")}
        style={{ height: 100, width: 100, objectFit: "contain" }}
      />
      <Text style={{ color: workerLoginCard, fontSize: 24 }}>
        Screening finished
      </Text>
      <Image
        source={require("@/assets/avatar/excited.png")}
        style={{ height: 250, width: 250, objectFit: "contain" }}
      />
      {/* <Text
        onPress={() => {
          router.back()
        }}
        style={{ color: "green", fontSize: 16 }}
      >
        Screen another patient
      </Text> */}
      <PrimaryButton
        buttonText="Screen another patient"
        onPress={() => {
          router.back()
        }}
      />
    </View>
  )
}

export default PostScreeningPage
