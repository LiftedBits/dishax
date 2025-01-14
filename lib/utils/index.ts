import { Field } from "@/config/forms"

export const getTimeStr = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const secs = seconds - 60 * minutes
  let minStr = minutes < 10 ? `0${minutes}` : `${minutes}`
  let secStr = secs < 10 ? `0${secs}` : `${secs}`
  return `${minStr}:${secStr}`
}

export const validatePhoneNumber = (phone: string) => {
  return phone.length === 10
}

export const initializeData = (fields: Field[]) => {
  return Object.fromEntries(
    fields.map((field) => [
      field.name,
      field.type === "checkbox"
        ? false
        : field.type === "select"
        ? field.options[0].value
        : "",
    ])
  )
}

export const isInitialData = (
  data: { [key: string]: any },
  fields: Field[]
) => {
  let _isInitialData = true
  fields.forEach((field) => {
    if (field.type === "checkbox" && data[field.name] !== false)
      _isInitialData = false
    if (field.type === "number" && data[field.name] !== "")
      _isInitialData = false
    if (field.type === "select" && data[field.name] !== field.options[0].value)
      _isInitialData = false
  })
  return _isInitialData
}

export const isNullOrUndefined = (value: any) => {
  return value === undefined || value === null
}

export const isEmptyString = (value: any) => {
  return value === ""
}

export const areAllValuesPresent = (
  object: Record<string, any>,
  keys: string[]
) => {
  const missingFields = keys.filter((key) => {
    return !(key in object) || isEmptyString(object[key])
  })

  if (missingFields.length > 0) {
    return false
  }
  return true
}

export const areObjectsEqual = (
  obj1: { [key: string]: any },
  obj2: { [key: string]: any }
) => {
  let areEqual = true
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)
  if (!keys1 && !keys2) {
    return true
  } else if (!keys1 || !keys2) {
    return false
  }
  keys1.forEach((key) => (areEqual = areEqual && keys2.includes(key)))
  keys2.forEach((key) => (areEqual = areEqual && keys1.includes(key)))
  if (!areEqual) return false
  keys1.forEach((key) => (areEqual = areEqual && obj1[key] === obj2[key]))
  return areEqual
}
