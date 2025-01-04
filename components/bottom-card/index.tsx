import React from "react"
import { View, Text, StyleSheet, Image } from "react-native"
import {
  workerLoginCard,
  workerLoginDialog,
  workerLoginDialogBox,
} from "@/config/colors"
import { ReactNode } from "react"

interface BottomCardProps {
  children: ReactNode
  isAvatarVisible: boolean
  message?: string
}

const WorkerLoginCard = ({
  children,
  isAvatarVisible,
  message,
}: BottomCardProps) => {
  return (
    <View style={styles.bottomDiv}>
      <Image
        source={require("@/assets/avatar/happy.png")}
        style={[
          {
            position: "absolute",
            width: 180,
            height: 180,
            objectFit: "contain",
            right: 0,
            top: -150,
            transform: [{ rotate: "-10deg" }],
            display: isAvatarVisible ? "flex" : "none",
          },
        ]}
      />
      <View
        style={[
          styles.messageBubble,
          {
            width: 150,
            top: -120,
            right: 180,
            padding: 15,
            display: isAvatarVisible ? "flex" : "none",
          },
        ]}
      >
        <Text style={styles.messageText}>{message}</Text>
      </View>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  bottomDiv: {
    backgroundColor: workerLoginCard,
    width: "100%",
    padding: 20,
    paddingTop: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    position: "relative",
    justifyContent: "center",
  },
  messageBubble: {
    backgroundColor: workerLoginDialogBox,
    padding: 10,
    borderRadius: 15,
    borderBottomRightRadius: 0,
    position: "absolute",
  },
  messageText: {
    color: workerLoginDialog,
    fontSize: 16,
  },
})

export default WorkerLoginCard
