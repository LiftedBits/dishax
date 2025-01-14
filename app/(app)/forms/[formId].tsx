import { CheckboxInput, NumberInput, RadioButtonInput } from "@/components/form"
import { formBackground, formHeading } from "@/config/colors"
import { forms } from "@/config/forms"
import { useLocalSearchParams } from "expo-router"
import { useState } from "react"
import { View, Text, ScrollView } from "react-native"

export default function FormDetailsPage() {
  const formId = useLocalSearchParams()["formId"] as string
  const form = forms[formId]
  const [data, setData] = useState(
    Object.fromEntries(form.fields.map((field) => [field.name, ""]))
  )
  const handleChange = (name: string, value: any) => {
    setData((prevData) => ({ ...prevData, [name]: value }))
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: formBackground,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: formHeading,
          paddingHorizontal: 16,
          paddingVertical: 8,
        }}
      >
        {form.name}{" "}
      </Text>
      <ScrollView
        style={{ paddingHorizontal: 16 }}
        contentContainerStyle={{ rowGap: 16, paddingVertical: 16 }}
      >
        {form.fields.map((field) => {
          return (
            <View style={{}} key={field.name}>
              {field.type === "number" ? (
                <NumberInput
                  value={String(data[field.name])}
                  setValue={(value) => {
                    handleChange(field.name, value)
                  }}
                  label={field.label}
                />
              ) : field.type === "checkbox" ? (
                <CheckboxInput
                  status={data[field.name] ? "checked" : "unchecked"}
                  toggleStatus={() => {
                    handleChange(field.name, !data[field.name])
                  }}
                  text={field.label}
                />
              ) : (
                <RadioButtonInput
                  label={field.label}
                  data={field.options}
                  setValue={(value) => {
                    handleChange(field.name, value)
                  }}
                />
              )}
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}
