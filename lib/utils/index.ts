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
