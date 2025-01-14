type NumberField = {
  name: string
  type: "number"
  label: string
  required: boolean
  validation?: any
}

export type Option = {
  label: string
  value: string
}

type SelectField = {
  name: string
  type: "select"
  label: string
  required: boolean
  options: Option[]
}

type CheckBoxField = {
  name: string
  type: "checkbox"
  label: string
  required: boolean
}

type Field = NumberField | SelectField | CheckBoxField

type Form = {
  name: string
  fields: Field[]
}

export const forms: Record<string, Form> = {
  "cardiac-risk-form": {
    name: "Cardiac Risk",
    fields: [
      {
        name: "age",
        type: "number",
        label: "Age",
        required: true,
        validation: {
          min: 0,
          max: 120,
        },
      },
      {
        name: "sex",
        type: "select",
        label: "Sex",
        required: true,
        options: [
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
        ],
      },
      {
        name: "ethinicity",
        type: "select",
        label: "Ethnicity",
        required: true,
        options: [
          { label: "White/Unstated", value: "white/non-stated" },
          { label: "Indian", value: "indian" },
          { label: "Pakistani", value: "pakistani" },
          { label: "Bangladeshi", value: "bangladeshi" },
          { label: "Other Asian", value: "other-asian" },
          { label: "Black caribbean", value: "black-caribbean" },
          { label: "Black african", value: "black-african" },
          { label: "Chinese", value: "chinese" },
          { label: "Other", value: "other" },
        ],
      },
      {
        name: "clinical_info.smoking",
        type: "select",
        label: "Smoking Status",
        required: true,
        options: [
          { label: "Non-smoker", value: "non-smoker" },
          { label: "Ex-smoker", value: "ex-smoker" },
          { label: "Light smoker", value: "light-smoker" },
          { label: "Moderate smoker", value: "moderate-smoker" },
          { label: "Heavy smoker", value: "heavy-smoker" },
        ],
      },
      {
        name: "clinical_info.diabetes",
        type: "select",
        label: "Diabetes Status",
        required: true,
        options: [
          { label: "None", value: "none" },
          { label: "Type 1", value: "type-1" },
          { label: "Type 2", value: "type-2" },
        ],
      },
      {
        name: "clinical_info.relative_heart_issue",
        type: "checkbox",
        label: "Angina or heart attack in a 1st degree relative < 60?",
        required: true,
      },
      {
        name: "clinical_info.chronic_kidney_disease",
        type: "checkbox",
        label: "Chronic kidney disease (stage 3, 4 or 5)?",
        required: true,
      },
      {
        name: "clinical_info.atrial_fibrillation",
        type: "checkbox",
        label: "Atrial fibrillation?",
        required: true,
      },
      {
        name: "clinical_info.on_bp_treatment",
        type: "checkbox",
        label: "On blood pressure treatment?",
        required: true,
      },
      {
        name: "clinical_info.migranes",
        type: "checkbox",
        label: "Do you have migraines?",
        required: true,
      },
      {
        name: "clinical_info.rheumatoid_arthritis",
        type: "checkbox",
        label: "Rheumatoid Arthritis?",
        required: true,
      },
      {
        name: "clinical_info.sle",
        type: "checkbox",
        label: "Systemic lupus erythematosus (SLE)?",
        required: true,
      },
      {
        name: "clinical_info.severe_mental_illness",
        type: "checkbox",
        label: "Severe mental illness?",
        required: true,
      },
      {
        name: "clinical_info.antipsychotic_medication",
        type: "checkbox",
        label: "On atypical antipsychotic medication?",
        required: true,
      },
      {
        name: "clinical_info.steriods",
        type: "checkbox",
        label: "Are you on regular steroid tablets?",
        required: true,
      },
      {
        name: "clinical_info.erecticle_disfunction",
        type: "checkbox",
        label: "A diagnosis of or treatment for erectile disfunction?",
        required: true,
      },
      {
        name: "clinical_info.bmi.height",
        type: "number",
        label: "Height (cm)",
        required: true,
        validation: {
          min: 50,
          max: 250,
        },
      },
      {
        name: "clinical_info.bmi.weight",
        type: "number",
        label: "Weight (kg)",
        required: true,
        validation: {
          min: 3,
          max: 300,
        },
      },
      {
        name: "optional_clinical_info.cholestrol_by_hdl_ratio",
        type: "number",
        label: "Cholesterol by HDL Ratio",
        required: false,
      },
      {
        name: "optional_clinical_info.systolic_bp_mmHg",
        type: "number",
        label: "Systolic BP (mmHg)",
        required: false,
      },
    ],
  },
  "diabetes-risk-form": {
    name: "Diabetes Risk",
    fields: [
      {
        name: "age",
        type: "number",
        label: "Age",
        required: true,
        validation: {
          min: 0,
          max: 120,
        },
      },
      {
        name: "gender",
        type: "select",
        label: "Gender",
        required: true,
        options: [
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
        ],
      },
      {
        name: "waist_circumference",
        type: "number",
        label: "Waist Circumference (cm)",
        required: true,
        validation: {
          min: 30,
          max: 200,
        },
      },
      {
        name: "physical_activity",
        type: "select",
        label: "Physical Activity",
        required: true,
        options: [
          {
            label:
              "Regular vigorous exercise or strenuous (manual) activities at home / work",
            value: "vigorous",
          },
          {
            label:
              "Regular moderate exercise or moderate physical activity at home / work",
            value: "moderate",
          },
          {
            label:
              "Regular mild exercise or mild physical activity at home / work",
            value: "mild",
          },
          {
            label: "No exercise and/or sedentary activities at home / work",
            value: "no_exercise",
          },
        ],
      },
      {
        name: "family_history",
        type: "select",
        label: "Family History of Diabetes",
        required: true,
        options: [
          { label: "No diabetes in parents", value: "no_parent" },
          { label: "One parent is diabetic", value: "one_parent" },
          { label: "Both parents are diabetic", value: "two_parents" },
        ],
      },
    ],
  },
}
