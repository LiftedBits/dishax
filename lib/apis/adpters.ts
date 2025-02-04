import { Field } from "@/config/forms"
import { FormId } from "@/config/types"
import { RiskFormData } from "@/contexts/form-data"

export const parseVar = (
  type: "number" | "select" | "checkbox",
  value: any
) => {
  switch (type) {
    case "number":
      return parseFloat(value)
    case "select":
      return value
    case "checkbox":
      return value
  }
}

export const parseObject = (data: Record<string, any>, fields: Field[]) => {
  const parsedObject: Record<string, any> = {}
  fields.forEach((field) => {
    parsedObject[field.name] = parseVar(field.type, data[field.name])
  })
  return parsedObject
}

export const adaptFormData = (formData: RiskFormData, forms: RiskFormData) => {
  const parsedFormData = Object.entries(formData).reduce(
    (acc, [formId, data]) => {
      if (Object.keys(data).length > 0) {
        acc[formId] = parseObject(
          data as Record<string, any>,
          forms[formId as FormId].fields
        )
      }
      return acc
    },
    {} as Record<string, any>
  )
  return parsedFormData
}
