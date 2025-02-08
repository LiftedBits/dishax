import { PrimaryButton } from "@/components/button"
import {
  CheckboxInput,
  DropDownInput,
  NumberInput,
  RadioButtonInput,
  TextInputBlock,
} from "@/components/form"
import { formBackground, formHeading } from "@/config/colors"
import { forms } from "@/config/forms"
import { FormId } from "@/config/types"
import { RiskFormData, useFormData } from "@/contexts/form-data"
import {
  areAllValuesPresent,
  areObjectsEqual,
  initializeData,
  isInitialData,
  validateFormData,
} from "@/lib/utils"
import { router, useFocusEffect, useLocalSearchParams } from "expo-router"
import { useCallback, useEffect, useState } from "react"
import { BackHandler } from "react-native"
import { View, Text, ScrollView, Alert } from "react-native"

export default function FormDetailsPage() {
  const formId = useLocalSearchParams()["formId"] as FormId
  const form = forms[formId]
  const [data, setData] = useState<Record<string, any>>(
    initializeData(form.fields)
  )
  const handleChange = (name: string, value: any) => {
    setData((prevData) => ({ ...prevData, [name]: value }))
  }
  const { formData, addFormData, resetFormData } = useFormData()

  const handleClear = () => {
    Alert.alert(
      "Confirm reset",
      "This will reset the current form. Are you sure?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes",
          onPress: () => {
            resetFormData(formId)
            setData(initializeData(form.fields))
          },
        },
      ]
    )
  }

  const handleSave = () => {
    const keys = form.fields
      .filter((field) => field.required)
      .map((field) => field.name)
    if (!validateFormData(forms[formId], data)) {
      console.log("invalid data")
      Alert.alert(
        "Missing field(s)",
        "One of more fields are missing/inappropriate"
      )
      return
    }
    addFormData({ [formId]: data } as RiskFormData)
    router.back()
  }

  useEffect(() => {
    if (
      Object.keys(formData).includes(formId) &&
      Object.keys(formData[formId]).length
    ) {
      setData(formData[formId])
    }
  }, [])

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (Object.keys(formData).includes(formId)) {
          if (areObjectsEqual(data, formData[formId])) {
            router.back()
            return true
          }
        } else if (isInitialData(data, form.fields)) {
          router.back()
          return true
        }
        Alert.alert(
          "Confirm Back",
          "Unsaved changes. You will lose data if you go back. Are you sure?",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Yes", onPress: () => router.back() },
          ]
        )
        return true
      }
      BackHandler.addEventListener("hardwareBackPress", onBackPress)
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress)
    }, [data])
  )

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: formBackground,
        paddingHorizontal: 16,
        paddingVertical: 8,
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
        style={{ paddingHorizontal: 8 }}
        contentContainerStyle={{ rowGap: 16, paddingVertical: 16 }}
      >
        {form.fields.map((field) => {
          return (
            <View style={{}} key={field.name}>
              {field.type === "number" ? (
                <NumberInput
                  value={data[field.name]}
                  setValue={(value) => {
                    handleChange(field.name, value)
                  }}
                  label={`${field.label}${field.required ? " *" : ""}`}
                />
              ) : field.type === "checkbox" ? (
                <CheckboxInput
                  status={data[field.name] ? "checked" : "unchecked"}
                  toggleStatus={() => {
                    handleChange(field.name, !data[field.name])
                  }}
                  text={`${field.required ? "* " : ""}${field.label}`}
                />
              ) : field.type === "select" ? (
                <RadioButtonInput
                  label={`${field.label}${field.required ? " *" : ""}`}
                  data={field.options}
                  setValue={(value) => {
                    handleChange(field.name, value)
                  }}
                  rowWrap={field.rowWrap}
                />
              ) : field.type === "text" ? (
                <TextInputBlock
                  value={data[field.name]}
                  setValue={(value) => {
                    handleChange(field.name, value)
                  }}
                  label={`${field.label}${field.required ? " *" : ""}`}
                />
              ) : field.type === "dropdown" ? (
                <DropDownInput
                  data={field.options}
                  label={`${field.label}${field.required ? " *" : ""}`}
                  value={data[field.name]}
                  setValue={(value) => {
                    handleChange(field.name, value)
                  }}
                />
              ) : field.type === "conditional-select" ? (
                <DropDownInput
                  data={field.options(data["state"])}
                  label={`${field.label}${field.required ? " *" : ""}`}
                  value={data[field.name]}
                  setValue={(value) => {
                    handleChange(field.name, value)
                  }}
                />
              ) : null}
            </View>
          )
        })}
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <PrimaryButton
          buttonText="CLEAR"
          onPress={() => {
            handleClear()
          }}
          sx={{ flex: 0.4 }}
        />
        <PrimaryButton
          buttonText="SAVE"
          onPress={() => {
            handleSave()
          }}
          sx={{ flex: 0.4 }}
        />
      </View>
    </View>
  )
}
