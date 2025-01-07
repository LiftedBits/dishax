import FontAwesome from "@expo/vector-icons/FontAwesome"
import { Image, Text, View } from "react-native"
import { Avatar } from "react-native-paper"

const Banner = () => {
  return (
    <View
      style={{
        width: "100%",
        height: 100,
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("@/assets/images/disha_logo.png")}
        style={{
          height: 60,
          objectFit: "scale-down",
        }}
      />
      <View
        style={{
          position: "absolute",
          right: 20,
          alignItems: "center",
        }}
      >
        <Avatar.Image
          source={{
            uri: "https://static.vecteezy.com/system/resources/thumbnails/005/544/708/small_2x/profile-icon-design-free-vector.jpg",
          }}
          size={40}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            justifyContent: "space-around",
            alignItems: "flex-end",
          }}
        >
          <FontAwesome name="location-arrow" size={24} color="black" />
          <Text>Pune</Text>
        </View>
      </View>
    </View>
  )
}

export default Banner
