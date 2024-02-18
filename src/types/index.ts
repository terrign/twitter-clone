import { Theme, ThemeObject } from './theme'

interface UserInfo {
  uid: string
  name: string
  authProvider: 'google' | 'firebase' | ''
  email: string
  dateOfBirth: string
  phoneNumber: string
  photoURL: string
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

interface DbUserRecord {
  user: UserInfo | undefined
  recordId: string | undefined
}

export { type DbUserRecord, type SignUpFormFields, Theme, type ThemeObject, type UserInfo }
