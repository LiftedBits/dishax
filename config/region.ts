import { Option } from "./forms"
import stateToDistrictsMap from "@/config/districts.json"

export type State =
  | "Andhra Pradesh"
  | "Arunachal Pradesh"
  | "Assam"
  | "Bihar"
  | "Chandigarh (UT)"
  | "Chhattisgarh"
  | "Dadra and Nagar Haveli (UT)"
  | "Daman and Diu (UT)"
  | "Delhi (NCT)"
  | "Goa"
  | "Gujarat"
  | "Haryana"
  | "Himachal Pradesh"
  | "Jammu and Kashmir"
  | "Jharkhand"
  | "Karnataka"
  | "Kerala"
  | "Lakshadweep (UT)"
  | "Madhya Pradesh"
  | "Maharashtra"
  | "Manipur"
  | "Meghalaya"
  | "Mizoram"
  | "Nagaland"
  | "Odisha"
  | "Puducherry (UT)"
  | "Punjab"
  | "Rajasthan"
  | "Sikkim"
  | "Tamil Nadu"
  | "Telangana"
  | "Tripura"
  | "Uttarakhand"
  | "Uttar Pradesh"
  | "West Bengal"

const states: State[] = Object.keys(stateToDistrictsMap) as State[]

const generateOptions = (list: string[]): Option[] => {
  return list.map((entry) => {
    return { label: entry, value: entry }
  })
}
export const stateOptions = [
  { label: "Andhra Pradesh", value: "Andhra Pradesh" },
  { label: "Arunachal Pradesh", value: "Arunachal Pradesh" },
  { label: "Assam", value: "Assam" },
  { label: "Bihar", value: "Bihar" },
  { label: "Chandigarh (UT)", value: "Chandigarh (UT)" },
  { label: "Chhattisgarh", value: "Chhattisgarh" },
  {
    label: "Dadra and Nagar Haveli (UT)",
    value: "Dadra and Nagar Haveli (UT)",
  },
  { label: "Daman and Diu (UT)", value: "Daman and Diu (UT)" },
  { label: "Delhi (NCT)", value: "Delhi (NCT)" },
  { label: "Goa", value: "Goa" },
  { label: "Gujarat", value: "Gujarat" },
  { label: "Haryana", value: "Haryana" },
  { label: "Himachal Pradesh", value: "Himachal Pradesh" },
  { label: "Jammu and Kashmir", value: "Jammu and Kashmir" },
  { label: "Jharkhand", value: "Jharkhand" },
  { label: "Karnataka", value: "Karnataka" },
  { label: "Kerala", value: "Kerala" },
  { label: "Lakshadweep (UT)", value: "Lakshadweep (UT)" },
  { label: "Madhya Pradesh", value: "Madhya Pradesh" },
  { label: "Maharashtra", value: "Maharashtra" },
  { label: "Manipur", value: "Manipur" },
  { label: "Meghalaya", value: "Meghalaya" },
  { label: "Mizoram", value: "Mizoram" },
  { label: "Nagaland", value: "Nagaland" },
  { label: "Odisha", value: "Odisha" },
  { label: "Puducherry (UT)", value: "Puducherry (UT)" },
  { label: "Punjab", value: "Punjab" },
  { label: "Rajasthan", value: "Rajasthan" },
  { label: "Sikkim", value: "Sikkim" },
  { label: "Tamil Nadu", value: "Tamil Nadu" },
  { label: "Telangana", value: "Telangana" },
  { label: "Tripura", value: "Tripura" },
  { label: "Uttarakhand", value: "Uttarakhand" },
  { label: "Uttar Pradesh", value: "Uttar Pradesh" },
  { label: "West Bengal", value: "West Bengal" },
]

export const getDistrictOptions = (state: State) => {
  const districts = stateToDistrictsMap[state]
  return districts.map((district) => {
    return { label: district, value: district }
  })
}
