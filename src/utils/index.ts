import { signUpValidationSchema } from './signUpValidationSchema'

const generateYears = () => {
  const years = []
  let nowYear = new Date().getFullYear()

  for (let i = 0; i < 150; i++) {
    years.push(String(nowYear))
    nowYear--
  }

  return years
}

const generateDays = () => {
  const days = []

  for (let i = 1; i <= 31; i++) {
    days.push(String(i).padStart(2, '0'))
  }

  return days
}

const nicknameFromEmail = (email: string) => '@' + email.split('@')[0]

export { generateDays, generateYears, nicknameFromEmail, signUpValidationSchema }
