export type FormId = "cardiac-risk-form" | "diabetes-risk-form"

export type CardiacRiskData = {
  age: number
  sex: "male" | "female"
  ethinicity:
    | "white/non-stated"
    | "indian"
    | "pakistani"
    | "bangladeshi"
    | "other-asian"
    | "black-caribbean"
    | "black-african"
    | "chinese"
    | "other"
  smoking:
    | "non-smoker"
    | "ex-smoker"
    | "light-smoker"
    | "moderate-smoker"
    | "heavy-smoker"
  diabetes: "none" | "type-1" | "type-2"
  relative_heart_issue: boolean
  chronic_kidney_disease: boolean
  atrial_fibrillation: boolean
  on_bp_treatment: boolean
  migranes: boolean
  rheumatoid_arthritis: boolean
  sle: boolean
  severe_mental_illness: boolean
  antipsychotic_medication: boolean
  steriods: boolean
  erecticle_disfunction: boolean
  bmi: {
    height: number
    weight: number
  }
  cholestrol_by_hdl_ratio?: number
  systolic_bp_mmHg?: number
  stdev_bp_mmHg?: number
}

export type DiabetesRiskData = {
  age: number
  gender: "male" | "female"
  waist_circumference: number
  physical_activity: "vigorous" | "moderate" | "mild" | "no_exercise"
  family_history: "no_parent" | "one_parent" | "two_parents"
}
