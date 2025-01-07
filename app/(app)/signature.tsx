import { PrimaryButton } from "@/components/button"
import React, { useRef } from "react"
import { View, Button, Alert, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Signature, { SignatureViewRef } from "react-native-signature-canvas"

interface SignatureBoxProps {
  onSave: () => void
}

const SignatureBox = ({ onSave }: SignatureBoxProps) => {
  const ref = useRef<SignatureViewRef | null>(null)

  const handleSignature = (signature: string) => {
    Alert.alert("Signature Captured!", "Check the console for Base64 data.")
    console.log(signature)
  }

  const handleClear = () => {
    ref.current?.clearSignature()
  }

  const handleConfirm = () => {
    ref.current?.readSignature()
    console.log("signature captured")
  }

  return (
    <>
      <Signature
        ref={ref}
        // onOK={onSave}
        onEmpty={() =>
          Alert.alert("Empty Signature!", "Please draw something.")
        }
        descriptionText="Sign above"
        clearText="Clear"
        confirmText="Save"
        style={{ backgroundColor: "blue" }}
        webStyle={webStyle}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          gap: 20,
        }}
      >
        <PrimaryButton
          buttonText="Clear"
          onPress={handleClear}
          sx={{ flex: 1 }}
        />
        <PrimaryButton buttonText="Save" onPress={onSave} sx={{ flex: 1 }} />
      </View>
    </>
  )
}

const webStyle = `
  .m-signature-pad {
    position: absolute;
    font-size: 10px;
    width: 700px;
    height: 400px;
    top: 50%;
    left: 50%;
    margin-left: -350px;
    margin-top: -200px;
    border: 1px solid #e8e8e8;
    background-color: #fff;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 40px rgba(0, 0, 0, 0.08) inset;
  }

  .m-signature-pad:before, .m-signature-pad:after {
    position: absolute;
    z-index: -1;
    content: "";
    width: 40%;
    height: 10px;
    left: 20px;
    bottom: 10px;
    background: transparent;
    transform: skew(-3deg) rotate(-3deg);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.4);
  }

  .m-signature-pad:after {
    left: auto;
    right: 20px;
    transform: skew(3deg) rotate(3deg);
  }

  .m-signature-pad--body {
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    border: 1px solid #f4f4f4;
  }

  .m-signature-pad--body canvas {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.02) inset;
  }

  .m-signature-pad--footer {
  display: none;
    position: absolute;
    left: 20px;
    right: 20px;
    bottom: 20px;
    height: 40px;
  }

  .m-signature-pad--footer .description {
    color: #C3C3C3;
    text-align: center;
    font-size: 1.2em;
    margin-top: 1.8em;
  }

  .m-signature-pad--footer .button {
    position: absolute;
    bottom: 0;
    background-color: #3F99F7;
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #FFF;
    border: none;
    outline: none;
  }

  .m-signature-pad--footer .button.clear {
    left: 0;
  }

  .m-signature-pad--footer .button.save {
    right: 0;
  }

  @media screen and (max-width: 1024px) {
    .m-signature-pad {
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: auto;
      height: auto;
      min-width: 250px;
      min-height: 140px;
      margin: 0;
    }
  }

  @media screen and (min-device-width: 768px) and (max-device-width: 1024px) {
    .m-signature-pad {
      margin: 10%;
    }
  }

  @media screen and (max-height: 320px) {
    .m-signature-pad--body {
      left: 0;
      right: 0;
      top: 0;
      bottom: 32px;
    }
    .m-signature-pad--footer {
      left: 20px;
      right: 20px;
      bottom: 4px;
      height: 28px;
    }
    .m-signature-pad--footer .description {
      font-size: 1em;
      margin-top: 1em;
    }
  }
`

export default SignatureBox
