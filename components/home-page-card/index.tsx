import React from "react"
import { View, Text, StyleSheet, Image } from "react-native"

const CardWithGraphic = ({ title }: { title: string }) => {
  return (
    <View>
      <View style={styles.card}>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.graphic}>
          <View style={[styles.circle, styles.circle1]} />
          <View style={[styles.circle, styles.circle2]} />
        </View>
      </View>
      <Image
        source={require("@/assets/avatar/happy.png")}
        style={{
          position: "absolute",
          width: 100,
          height: 120,
          objectFit: "contain",
          right: -10,
          bottom: -10,
          transform: [{ rotate: "-5deg" }],
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    margin: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    height: 150,
  },
  graphic: {
    position: "relative",
    marginRight: 0,
    flex: 1,
  },
  circle: {
    position: "absolute",
    borderRadius: 200,
    backgroundColor: "#ff6b6b",
  },
  circle1: {
    width: 200,
    height: 200,
    right: -100,
    top: -90,
    zIndex: 2,
    backgroundColor: "#ff6b6b",
    opacity: 0.5,
  },
  circle2: {
    width: 200,
    height: 200,
    right: -75,
    bottom: -50,
    backgroundColor: "#ff6b6b",
    opacity: 0.5,
  },
  content: {
    flex: 1.75,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 1.05,
    fontWeight: "bold",
    color: "#333",
  },
})

export default CardWithGraphic
