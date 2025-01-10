import {
  formBackground,
  menuButtonBackground,
  menuButtonText,
  workerLoginBackground,
  workerLoginButton,
  workerLoginDialog,
  workerLoginDialogBox,
} from "@/config/colors"
import { DimensionValue, StyleProp, ViewStyle } from "react-native"
import { ActivityIndicator, Button, Text } from "react-native-paper"
import { TouchableHighlight } from "react-native-gesture-handler"
import { useState } from "react"

interface PrimaryButtonProps {
  loading?: boolean
  disabled?: boolean
  buttonText: string
  onPress: () => void
  sx?: StyleProp<ViewStyle>
}

const PrimaryButton = ({
  loading,
  disabled,
  buttonText,
  onPress,
  sx,
}: PrimaryButtonProps) => {
  return (
    <Button
      mode="contained"
      disabled={disabled || loading}
      style={[
        {
          marginTop: 24,
          backgroundColor:
            loading || disabled ? workerLoginDialogBox : workerLoginButton,
          height: 50,
          borderRadius: 8,
          justifyContent: "center",
        },
        sx,
      ]}
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator color={workerLoginButton} size="small" />
      ) : (
        <Text
          style={{ color: disabled ? workerLoginButton : "#fff", fontSize: 16 }}
        >
          {buttonText}
        </Text>
      )}
    </Button>
  )
}

interface MenuButtonProps {
  loading?: boolean
  disabled?: boolean
  buttonText: string
  onPress: () => void
  flex?: number
  width?: DimensionValue
}

const MenuButton = ({
  loading,
  disabled,
  buttonText,
  onPress,
  flex,
  width,
}: MenuButtonProps) => {
  const [isPressed, setIsPressed] = useState(false)
  const pressedShadowStyle = {
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 15,
  }
  return (
    <TouchableHighlight
      underlayColor={menuButtonText}
      style={[
        {
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 8,
          paddingHorizontal: 20,
          backgroundColor: isPressed ? menuButtonText : menuButtonBackground,
          shadowColor: "#ffffff",
        },
        isPressed ? pressedShadowStyle : {},
        flex ? { flex: flex } : {},
        width ? { width: width } : {},
      ]}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={onPress}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: isPressed ? "#fff" : menuButtonText,
        }}
      >
        {buttonText}
      </Text>
    </TouchableHighlight>
  )
}

export { PrimaryButton, MenuButton }
