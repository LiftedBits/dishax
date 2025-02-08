import { getDistrictOptions, State, stateOptions } from "./region"
import { FormId } from "./types"

type NumberField = {
  name: string
  type: "number"
  label: string
  required: boolean
  validation: { min: number; max: number }
}

export type Option = {
  label: string
  value: string
  score?: number
}

type RadioOptions = {
  name: string
  type: "select"
  label: string
  required: boolean
  options: Option[]
  rowWrap?: boolean
}

type CheckBoxField = {
  name: string
  type: "checkbox"
  label: string
  required: boolean
}

type TextField = {
  name: string
  type: "text"
  label: string
  required: boolean
}

type DropDownField = {
  name: string
  type: "dropdown"
  label: string
  required: boolean
  options: Option[]
}

type ConditionalSelectField = {
  name: string
  type: "conditional-select"
  label: string
  required: boolean
  parentField: string
  options: (parentValue: any) => Option[]
}

export type Field =
  | NumberField
  | RadioOptions
  | DropDownField
  | ConditionalSelectField
  | CheckBoxField
  | TextField

export type Form = {
  name: string
  fields: Field[]
  title?: string
}

const mentalStateOptions = [
  { label: "Not at all", value: "not_at_all" },
  { label: "Several days", value: "several_days" },
  {
    label: "More than half the days",
    value: "more_than_half_the_days",
  },
  { label: "Nearly every day", value: "nearly_every_day" },
]

const alcoholOptions = [
  { label: "Never", value: "never" },
  { label: "Less than monthly", value: "less_than_monthly" },
  { label: "Monthly", value: "monthly" },
  { label: "Weekly", value: "weekly" },
  { label: "Daily or almost daily", value: "daily" },
]

const phq15options = [
  { label: "Not bothered at all", value: "not_bothered_at_all" },
  { label: "Bothered a little", value: "bothered_a_little" },
  { label: "Bothered a lot", value: "bothered_a_lot" },
]

export const forms: Record<FormId, Form> = {
  "demographic-data-form": {
    name: "Demographic Data",
    fields: [
      {
        name: "name",
        type: "text",
        label: "Name",
        required: true,
      },
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
          { label: "Female", value: "female" },
          { label: "Male", value: "male" },
        ],
        rowWrap: true,
      },
      {
        name: "state",
        type: "dropdown",
        label: "State",
        required: true,
        options: stateOptions,
      },
      {
        name: "district",
        type: "conditional-select",
        label: "District",
        required: true,
        parentField: "state",
        options: (state: string) => {
          return state === "" ? [] : getDistrictOptions(state as State)
        },
      },
    ],
  },
  "vitals-form": {
    name: "Vitals",
    fields: [
      {
        name: "systolic_bp_mmHg",
        type: "number",
        label: "Systolic BP (mmHg)",
        required: true,
        validation: {
          min: 0,
          max: 300,
        },
      },
      {
        name: "diastolic_bp_mmHg",
        type: "number",
        label: "Diastolic BP (mmHg)",
        required: true,
        validation: {
          min: 0,
          max: 200,
        },
      },
      {
        name: "pulse_rate_bpm",
        type: "number",
        label: "Pulse Rate (bpm)",
        required: true,
        validation: {
          min: 0,
          max: 200,
        },
      },
      {
        name: "weight_kg",
        type: "number",
        label: "Weight (kg)",
        required: true,
        validation: {
          min: 3,
          max: 300,
        },
      },
      {
        name: "height_cm",
        type: "number",
        label: "Height (cm)",
        required: true,
        validation: {
          min: 50,
          max: 250,
        },
      },
      {
        name: "temperature_celsius",
        type: "number",
        label: "Temperature (°C)",
        required: true,
        validation: {
          min: 35,
          max: 42,
        },
      },
      {
        name: "oxygen_saturation",
        type: "number",
        label: "Oxygen Saturation (%)",
        required: true,
        validation: {
          min: 0,
          max: 100,
        },
      },
      {
        name: "respiratory_rate",
        type: "number",
        label: "Respiratory Rate",
        required: true,
        validation: {
          min: 0,
          max: 100,
        },
      },
    ],
  },
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
        name: "smoking",
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
        name: "diabetes",
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
        name: "relative_heart_issue",
        type: "checkbox",
        label: "Angina or heart attack in a 1st degree relative < 60?",
        required: true,
      },
      {
        name: "chronic_kidney_disease",
        type: "checkbox",
        label: "Chronic kidney disease (stage 3, 4 or 5)?",
        required: true,
      },
      {
        name: "atrial_fibrillation",
        type: "checkbox",
        label: "Atrial fibrillation?",
        required: true,
      },
      {
        name: "on_bp_treatment",
        type: "checkbox",
        label: "On blood pressure treatment?",
        required: true,
      },
      {
        name: "migranes",
        type: "checkbox",
        label: "Do you have migraines?",
        required: true,
      },
      {
        name: "rheumatoid_arthritis",
        type: "checkbox",
        label: "Rheumatoid Arthritis?",
        required: true,
      },
      {
        name: "sle",
        type: "checkbox",
        label: "Systemic lupus erythematosus (SLE)?",
        required: true,
      },
      {
        name: "severe_mental_illness",
        type: "checkbox",
        label: "Severe mental illness?",
        required: true,
      },
      {
        name: "antipsychotic_medication",
        type: "checkbox",
        label: "On atypical antipsychotic medication?",
        required: true,
      },
      {
        name: "steriods",
        type: "checkbox",
        label: "Are you on regular steroid tablets?",
        required: true,
      },
      {
        name: "erecticle_disfunction",
        type: "checkbox",
        label: "A diagnosis of or treatment for erectile disfunction?",
        required: true,
      },
      {
        name: "height",
        type: "number",
        label: "Height (cm)",
        required: true,
        validation: {
          min: 50,
          max: 250,
        },
      },
      {
        name: "weight",
        type: "number",
        label: "Weight (kg)",
        required: true,
        validation: {
          min: 3,
          max: 300,
        },
      },
      {
        name: "optional_cholestrol_by_hdl_ratio",
        type: "number",
        label: "Cholesterol by HDL Ratio",
        required: false,
        validation: {
          min: 0,
          max: 10,
        },
      },
      {
        name: "optional_systolic_bp_mmHg",
        type: "number",
        label: "Systolic BP (mmHg)",
        required: false,
        validation: { min: 0, max: 300 },
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
  "gad-7": {
    name: "GAD-7 Anxiety screening",
    fields: [
      {
        name: "nervous_or_anxious",
        label: "Feeling nervous, anxious or on edge",
        type: "select",
        required: true,
        options: mentalStateOptions,
      },
      {
        name: "unable_to_control_worry",
        label: "Not being able to stop or control worrying",
        type: "select",
        required: true,
        options: mentalStateOptions,
      },
      {
        name: "worry_about_different_things",
        label: "Worrying too much about different things",
        type: "select",
        required: true,
        options: mentalStateOptions,
      },
      {
        name: "trouble_relaxing",
        label: "Trouble relaxing",
        type: "select",
        required: true,
        options: mentalStateOptions,
      },
      {
        name: "restless",
        label: "Being so restless that it is hard to sit still",
        type: "select",
        required: true,
        options: mentalStateOptions,
      },
      {
        name: "irritable",
        label: "Becoming easily annoyed or irritable",
        type: "select",
        required: true,
        options: mentalStateOptions,
      },
      {
        name: "paranoid",
        label: "Feeling afraid as if something awful might happen",
        type: "select",
        required: true,
        options: mentalStateOptions,
      },
    ],
    title:
      "Over the last 2 weeks, how often have you been bothered by the following problems?",
  },
  "phq-9": {
    name: "PHQ-9 Depression",
    fields: [
      {
        name: "loss_of_interest",
        label: "Little interest or pleasure in doing things",
        type: "select",
        required: true,
        options: mentalStateOptions,
      },
      {
        name: "feeling_down",
        label: "Feeling down, depressed, or hopeless",
        type: "select",
        required: true,
        options: mentalStateOptions,
      },
      {
        name: "trouble_with_sleep",
        label: "Trouble falling or staying asleep, or sleeping too much",
        type: "select",
        required: true,
        options: mentalStateOptions,
      },
      {
        name: "low_energy",
        label: "Feeling tired or having little energy",
        type: "select",
        required: true,
        options: mentalStateOptions,
      },
      {
        name: "apetite_issues",
        label: "Poor appetite or overeating",
        type: "select",
        required: true,
        options: mentalStateOptions,
      },
      {
        name: "feeling_bad_about_yourself",
        label:
          "Feeling bad about yourself - or that you are a failure or have let yourself or your family down",
        type: "select",
        required: true,
        options: mentalStateOptions,
      },
      {
        name: "concentration_issues",
        label:
          "Trouble concentrating on things, such as reading the newspaper or watching television",
        type: "select",
        required: true,
        options: mentalStateOptions,
      },
      {
        name: "unusual_movement_or_conversation",
        label:
          "Moving or speaking so slowly that other people could have noticed? Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual",
        type: "select",
        required: true,
        options: mentalStateOptions,
      },
      {
        name: "self_harming_thoughts",
        label:
          "Thoughts that you would be better off dead or of hurting yourself in some way",
        type: "select",
        required: true,
        options: mentalStateOptions,
      },
    ],
    title:
      "Over the last 2 weeks, how often have you been bothered by any of the following problems?",
  },
  audit: {
    name: "Alcohol abuse test",
    fields: [
      {
        name: "frequency_of_drinking",
        label: "How often do you have a drink containing alcohol?",
        type: "select",
        required: true,
        options: [
          { label: "Never", value: "never" },
          { label: "Monthly or less", value: "monthly_or_less" },
          { label: "2-4 times a month", value: "two_to_four_times_a_month" },
          { label: "2-3 times a week", value: "two_to_three_times_a_week" },
          {
            label: "4 or more times a week",
            value: "more_than_four_times_a_week",
          },
        ],
      },
      {
        name: "typical_quantity_of_drinks",
        label:
          "How many drinks containing alcohol do you have on a typical day when you are drinking?",
        type: "select",
        required: true,
        options: [
          { label: "1 or 2", value: "one_or_two" },
          { label: "3 or 4", value: "three_or_four" },
          { label: "5 or 6", value: "five_or_six" },
          { label: "7 to 9", value: "seven_to_nine" },
          { label: "10 or more", value: "more_than_ten" },
        ],
      },
      {
        name: "frequency_of_more_than_six_drinks_at_once",
        label: "How often do you have six or more drinks on one occasion?",
        type: "select",
        required: true,
        options: alcoholOptions,
      },
      {
        name: "inability_to_stop_drinking",
        label:
          "How often during the last year have you found that you were not able to stop drinking once you had started?",
        type: "select",
        required: true,
        options: alcoholOptions,
      },
      {
        name: "unable_to_do_expected_work",
        label:
          "How often during the last year have you failed to do what was normally expected of you because of drinking?",
        type: "select",
        required: true,
        options: alcoholOptions,
      },
      {
        name: "required_drink_in_morning_after_heavy_drink_session",
        label:
          "How often during the last year have you needed a first drink in the morning to get yourself going after a heavy drinking session?",
        type: "select",
        required: true,
        options: alcoholOptions,
      },
      {
        name: "felt_guilt_after_drinking",
        label:
          "How often during the last year have you had a feeling of guilt or remorse after drinking?",
        type: "select",
        required: true,
        options: alcoholOptions,
      },
      {
        name: "unable_to_remember_drinking_session",
        label:
          "How often during the last year have you been unable to remember what happened the night before because of your drinking?",
        type: "select",
        required: true,
        options: alcoholOptions,
      },
      {
        name: "injured_someone_because_of_drinking",
        label:
          "Have you or someone else been injured because of your drinking?",
        type: "select",
        required: true,
        options: [
          { label: "No", value: "no" },
          {
            label: "Yes, but not in the last year",
            value: "yes_but_not_last_year",
          },
          { label: "Yes, during the last year", value: "yes_during_last_year" },
        ],
      },
      {
        name: "someone_concerned_about_drinking",
        label:
          "Has a relative, friend, doctor, or other health care worker been concerned about your drinking or suggested you cut down?",
        type: "select",
        required: true,
        options: [
          { label: "No", value: "no" },
          {
            label: "Yes, but not in the last year",
            value: "yes_but_not_last_year",
          },
          { label: "Yes, during the last year", value: "yes_during_last_year" },
        ],
      },
    ],
  },
  fagerstrom: {
    name: "Nicotine Dependence",
    fields: [
      {
        name: "first_cigarette_after_waking_up",
        label: "How soon after waking do you smoke your first cigarette?",
        type: "select",
        required: true,
        options: [
          {
            label: "Within 5 minutes",
            value: "within_five_mins",
          },
          {
            label: "5-30 minutes",
            value: "five_to_thirty_mins",
          },
          {
            label: "31-60 minutes",
            value: "thirty_to_sixty_mins",
          },
        ],
      },
      {
        name: "difficult_to_refrain_from_smoking",
        label:
          "Do you find it difficult to refrain from smoking in places where it is forbidden? e.g. Church, Libraty, etc.",
        type: "checkbox",
        required: true,
      },
      {
        name: "most_difficult_cigarette_to_give_up",
        label: "Which cigarette would you hate to give up?",
        type: "select",
        required: true,
        options: [
          {
            label: "The first in the morning",
            value: "within_five_mins",
          },
          {
            label: "Any other",
            value: "any_other",
          },
        ],
      },
      {
        name: "number_of_cigarettes_in_a_day",
        label: "How many cigarettes a day do you smoke?",
        type: "select",
        required: true,
        options: [
          {
            label: "10 or less",
            value: "ten_or_less",
          },
          {
            label: "11-20",
            value: "eleven_to_twenty",
          },
          {
            label: "21-30",
            value: "twenty_to_thirty",
          },
          {
            label: "31 or more",
            value: "more_than_thirty",
          },
        ],
      },
      {
        name: "frequent_smoking_in_morning",
        label: "Do you smoke more frequently in the morning?",
        type: "checkbox",
        required: true,
      },
      {
        name: "smoking_while_sick_in_bed",
        label: "Do you smoke even if you are sick in bed most of the day?",
        type: "checkbox",
        required: true,
      },
    ],
  },
  // https://www.psychiatry.org/File%20Library/Psychiatrists/Practice/DSM/APA_DSM5_Level-2-Somatic-Symptom-Adult.pdf
  "phq-15": {
    name: "PHQ-15 Somatic Disorders",
    fields: [
      {
        name: "stomach_pain",
        label: "Stomach pain",
        type: "select",
        required: true,
        options: phq15options,
      },
      {
        name: "back_pain",
        label: "Back pain",
        type: "select",
        required: true,
        options: phq15options,
      },
      {
        name: "pain_in_limbs",
        label: "Pain in your arms, legs, or joints (knees, hips, etc.)",
        type: "select",
        required: true,
        options: phq15options,
      },
      {
        name: "menstrual_cramps",
        label:
          "Menstrual cramps or other problems with your periods (WOMEN ONLY), use Not bothered at all for MEN",
        type: "select",
        required: true,
        options: phq15options,
      },
      {
        name: "headaches",
        label: "Headaches",
        type: "select",
        required: true,
        options: phq15options,
      },
      {
        name: "chest_pain",
        label: "Chest pain",
        type: "select",
        required: true,
        options: phq15options,
      },
      {
        name: "dizziness",
        label: "Dizziness",
        type: "select",
        required: true,
        options: phq15options,
      },
      {
        name: "fainting_spells",
        label: "Fainting spells",
        type: "select",
        required: true,
        options: phq15options,
      },
      {
        name: "heart_pounding",
        label: "Feeling your heart pound or race",
        type: "select",
        required: true,
        options: phq15options,
      },
      {
        name: "shortness_of_breath",
        label: "Shortness of breath",
        type: "select",
        required: true,
        options: phq15options,
      },
      {
        name: "problems_during_intercourse",
        label: "Pain or problems during sexual intercourse",
        type: "select",
        required: true,
        options: phq15options,
      },
      {
        name: "bowel_issues",
        label: "Constipation, loose bowels, or diarrhea",
        type: "select",
        required: true,
        options: phq15options,
      },
      {
        name: "nausea",
        label: "Nausea, gas, or indigestion",
        type: "select",
        required: true,
        options: phq15options,
      },
      {
        name: "low_energy",
        label: "Feeling tired or having low energy",
        type: "select",
        required: true,
        options: phq15options,
      },
      {
        name: "trouble_with_sleep",
        label: "Trouble sleeping",
        type: "select",
        required: true,
        options: phq15options,
      },
    ],
  },
  "phq-12": {
    name: "PHQ 12 Depression",
    fields: [
      {
        name: "feeling_sad",
        label: "Feeling sad, blue or depressed",
        type: "checkbox",
        required: true,
      },
      {
        name: "loss_of_interest_or_pleasure",
        label: "Loss of interest or pleasure in most things",
        type: "checkbox",
        required: true,
      },
      {
        name: "low_energy",
        label: "Feeling tired or low on energy most of the time",
        type: "checkbox",
        required: true,
      },
      {
        name: "loss_of_appetite",
        label: "Loss of appetite or weight loss",
        type: "checkbox",
        required: true,
      },
      {
        name: "overeating",
        label: "Overeating or weight gain",
        type: "checkbox",
        required: true,
      },
      {
        name: "lack_of_sleep",
        label: "Trouble falling aspleep or staying asleep",
        type: "checkbox",
        required: true,
      },
      {
        name: "too_much_sleep",
        label: "Sleeping too much",
        type: "checkbox",
        required: true,
      },
      {
        name: "trouble_concentrating",
        label: "More trouble than usual concentrating on things",
        type: "checkbox",
        required: true,
      },
      {
        name: "feeling_down",
        label: "Feeling down on yourself, no good, or worthless",
        type: "checkbox",
        required: true,
      },
      {
        name: "feeling_restless",
        label:
          "Being fidgety or restless that you move around a lot more than usual",
        type: "checkbox",
        required: true,
      },
      {
        name: "speaking_noticably_slow",
        label: "Moved or spoke so slowly that other people could have noticed",
        type: "checkbox",
        required: true,
      },
      {
        name: "thoughts_about_death",
        label:
          "Thought about death more than usual, either your own, someone else's, or death in general",
        type: "checkbox",
        required: true,
      },
    ],
  },
}
