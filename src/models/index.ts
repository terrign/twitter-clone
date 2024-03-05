enum Theme {
  LIGHT,
  DARK,
}

interface ThemeObject {
  fontXXL: string
  fontXL: string
  fontL: string
  fontM: string
  fontS: string
  fontXS: string
  bgColor: string
  modalBgColor: string
  buttonBgColor: string
  disabledButtonBgColor: string
  simpleButtonBgHover: string
  fontColor: string
  buttonBorderColor: string
  borderColor: string
  fontColorSecondary: string
  inputBorderColor: string
  reverseFontColor: string
  fontColorTertiary: string
  reverseBgColor: string

  outlinedButtonHover: string
  filledButtonHover: string
}

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

enum AuthProvider {
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

type NewTweet = Pick<Tweet, 'createdById' | 'imageURL' | 'text'>

export {
  AuthProvider,
  type EditFormFields,
  type EmailSignUpPayload,
  type NewTweet,
  type SignUpFormFields,
  Theme,
  type ThemeObject,
  type Tweet,
  type UserInfo,
}
