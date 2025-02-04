export type FormId =
  | "cardiac-risk-form"
  | "diabetes-risk-form"
  | "gad-7"
  | "phq-9"
  | "audit"
  | "fagerstrom"
  | "phq-15"
  | "phq-12"

type MentalStateOptions =
  | "not_at_all"
  | "several_days"
  | "more_than_half_the_days"
  | "nearly_every_day"

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
  height: number
  weight: number
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

export type GAD7RiskData = {
  nervous_or_anxious: MentalStateOptions
  unable_to_control_worry: MentalStateOptions
  worry_about_different_things: MentalStateOptions
  trouble_relaxing: MentalStateOptions
  restless: MentalStateOptions
  irritable: MentalStateOptions
  paranoid: MentalStateOptions
}

export type PHQ9RiskData = {
  loss_of_interest: MentalStateOptions
  feeling_down: MentalStateOptions
  trouble_with_sleep: MentalStateOptions
  low_energy: MentalStateOptions
  apetite_issues: MentalStateOptions
  feeling_bad_about_yourself: MentalStateOptions
  concentration_issues: MentalStateOptions
  unusual_movement_or_conversation: MentalStateOptions
  self_harming_thoughts: MentalStateOptions
}
