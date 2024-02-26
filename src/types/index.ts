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
  bio: string
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

interface EditFormFields {
  name: string

  gender: string
  tgLink: string
  image: string
  bio: string
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

interface Tweet {
  id: string
  createdById: string
  text: string
  imageURL: string
  likedUserIds: string[]
  timestamp: number
}

export {
  AuthProvider,
  type EditFormFields,
  type EmailSignUpPayload,
  type SignUpFormFields,
  Theme,
  type ThemeObject,
  type Tweet,
  type UserInfo,
}
