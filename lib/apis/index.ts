import { functions } from "../firebase"

interface OtpResponse {
  otpId: string
}

interface ValidationResponse {
  success: boolean
  token: string
}

export const requestOtp = async (phone: string) => {
  const response = (await functions.httpsCallable("api-requestOtp")({
    phone,
  })) as { data: OtpResponse }
  return response.data.otpId
}

export const validateOtp = async (otpId: string, otp: string) => {
  try {
    const response = (await functions.httpsCallable("api-validateOtp")({
      otpId,
      otp,
    })) as { data: ValidationResponse }
    console.log(`Response: ${response.data}`)
    console.log(`Success: ${response.data.success}`)
    console.log(`Token: ${response.data.token}`)
    return response.data
  } catch (error) {
    console.error("Error: ", error)
  }
}
