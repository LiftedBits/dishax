import { forms } from "@/config/forms"
import { FormId } from "@/config/types"
import { initializeData } from "@/lib/utils"
import { createContext, useContext, useState } from "react"

interface FormDataContextProps {
  formData: Record<FormId, any>
  addFormData: (data: RiskFormData) => void
  resetFormData: (formId: FormId) => void
}

const FormDataContext = createContext<FormDataContextProps | undefined>(
  undefined
)

export type RiskFormData = {
  [formId in FormId]: Record<string, any>
}

export const FormDataProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [formData, setFormData] = useState<Record<FormId, Record<string, any>>>(
    // {
    //   "cardiac-risk-form": initializeData(forms["cardiac-risk-form"].fields),
    //   "diabetes-risk-form": initializeData(forms["diabetes-risk-form"].fields),
    // }
    Object.values(forms).reduce((acc, form) => {
      acc[form.name as FormId] = initializeData(form.fields)
      return acc
    }
    , {} as Record<FormId, Record<string, any>>)
  )

  const addFormData = (data: RiskFormData) => {
    setFormData((formData) => ({ ...formData, ...data }))
  }

  const resetFormData = (key: FormId) => {
    setFormData((prevFormData) => {
      const newFormData = { ...prevFormData }
      delete newFormData[key]
      return newFormData
    })
  }

  return (
    <FormDataContext.Provider value={{ formData, addFormData, resetFormData }}>
      {children}
    </FormDataContext.Provider>
  )
}

export const useFormData = () => {
  const context = useContext(FormDataContext)
  if (!context) {
    throw new Error("Not inside the form data context")
  }
  return context
}
