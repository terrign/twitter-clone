import { changePasswordValidationSchema } from './changePasswordValidationSchema'
import { EditProfileValidationSchema } from './editProfileValidationSchema'
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

const convertBase64 = (file: Blob): Promise<string> => {
  return new Promise((resolve) => {
    const fileReader = new FileReader()

    if (file) {
      fileReader.readAsDataURL(file)
    } else {
      resolve('')
    }

    fileReader.onload = () => {
      resolve(fileReader.result as string)
    }
  })
}

const nicknameFromEmail = (email: string) => '@' + email.split('@')[0]

export {
  changePasswordValidationSchema,
  convertBase64,
  EditProfileValidationSchema,
  generateDays,
  generateYears,
  nicknameFromEmail,
  signUpValidationSchema,
}
