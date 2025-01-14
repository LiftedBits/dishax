import { Text, TextInput, View } from "react-native"
import { Checkbox, RadioButton } from "react-native-paper"
import { Dropdown } from "react-native-element-dropdown"
import { useState } from "react"
import AntDesign from "@expo/vector-icons/AntDesign"
import { Option } from "@/config/forms"
import { workerLoginCard } from "@/config/colors"

interface NumberInputProps {
  value: string
  setValue: (data: string) => void
  label: string
}

export const NumberInput = ({ value, setValue, label }: NumberInputProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 8,
      }}
    >
      <Text style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>
        {label}
      </Text>
      <TextInput
        keyboardType="number-pad"
        value={value}
        onChangeText={(value) => {
          setValue(value)
        }}
        style={{
          borderWidth: 1,
          width: 100,
          height: 36,
          borderRadius: 8,
          padding: 8,
          textAlign: "center",
        }}
      />
    </View>
  )
}

interface CheckboxInputProps {
  status: "checked" | "unchecked"
  toggleStatus: () => void
  text: string
}

export const CheckboxInput = ({
  status,
  toggleStatus,
  text,
}: CheckboxInputProps) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Checkbox
        status={status}
        onPress={toggleStatus}
        color={workerLoginCard}
      />
      <Text style={{ color: "black" }}>{text}</Text>
    </View>
  )
}

interface DropDownInputProps {
  data: Option[]
  value: string | null
  setValue: (value: string) => void
}

export const DropDownInput = ({
  data,
  value,
  setValue,
}: DropDownInputProps) => {
  const [isFocus, setIsFocus] = useState(false)
  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 16,
      }}
    >
      <Dropdown
        style={[
          {
            height: 50,
            borderColor: "gray",
            borderWidth: 0.5,
            borderRadius: 8,
            paddingHorizontal: 8,
          },
          isFocus && { borderColor: "blue" },
        ]}
        placeholderStyle={{
          fontSize: 16,
        }}
        selectedTextStyle={{
          fontSize: 16,
        }}
        iconStyle={{
          width: 20,
          height: 20,
        }}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select item" : "..."}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value)
          setIsFocus(false)
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={{
              marginRight: 5,
            }}
            color={isFocus ? "blue" : "black"}
            name="Safety"
            size={20}
          />
        )}
      />
    </View>
  )
}

interface RadioButtonInputProps {
  label: string
  data: Option[]
  setValue: (value: string) => void
}

export const RadioButtonInput = ({
  label,
  data,
  setValue,
}: RadioButtonInputProps) => {
  const [_value, _setValue] = useState(data[0].value)
  return (
    <View
      style={{
        backgroundColor: "#ffffff",
        elevation: 1,
        borderRadius: 16,
        padding: 16,
      }}
    >
      <Text style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>
        {label}
      </Text>
      <RadioButton.Group
        onValueChange={(value) => {
          setValue(value)
          _setValue(value)
        }}
        value={_value}
      >
        <View style={{ rowGap: 4 }}>
          {data.map((option) => {
            return (
              <View
                key={option.value}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <RadioButton value={option.value} color={workerLoginCard} />
                <Text
                  style={{
                    flexWrap: "wrap",
                    flexShrink: 1,
                  }}
                >
                  {option.label}
                </Text>
              </View>
            )
          })}
        </View>
      </RadioButton.Group>
    </View>
  )
}
