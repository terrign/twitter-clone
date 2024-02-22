import { Theme, ThemeObject } from './theme'

interface UserInfo {
  uid: string
  name: string
  authProvider: AuthProvider | ''
  email: string
  dateOfBirth: string
  phoneNumber: string
  photoURL: string
  gender: string
  tgLink: string
}

interface SignUpFormFields {
  email: string
  name: string
  password: string
  confirmPassword: string
  phoneNumber: string
  day: string
  month: string
  year: string
}

interface EmailSignUpPayload {
  password: string
  email: string
  userInfo: Omit<UserInfo, 'uid' | 'photoURL' | 'authProvider'>
}

const enum AuthProvider {
  EMAIL = 'email',
  GOOGLE = 'google',
}

export { AuthProvider, type EmailSignUpPayload, type SignUpFormFields, Theme, type ThemeObject, type UserInfo }
