import { EditFormFields, SignUpFormFields } from '@models/index'
import { generateYears } from '@utils/date.ts'

const DEFAULT_CACHE_TIME_S = 15

const MAX_TWEET_LENGTH = 500

const MIN_USER_AGE = 18

const LINKS = {
  about: { label: 'About', href: '#' },
  help: { label: 'Help Center', href: '#' },
  terms: { label: 'Terms of Service', href: '#' },
  privacy: { label: 'Privacy Policy', href: '#' },
  cookie: { label: 'Cookie Policy', href: '#' },
  ads: { label: 'Ads Info', href: '#' },
  blog: { label: 'Blog', href: '#' },
  status: { label: 'Status', href: '#' },
  careers: { label: 'Careers', href: '#' },
  brand: { label: 'Brand Resources', href: '#' },
  advertising: { label: 'Advertising', href: '#' },
  marketing: { label: 'Marketing', href: '#' },
  business: { label: 'Twitter for Business', href: '#' },
  developers: { label: 'Developers', href: '#' },
  directory: { label: 'Directory', href: '#' },
  settings: { label: 'Settings', href: '#' },
}

const YEARS = generateYears()

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

type InputNameMapKeyType =
  | keyof Omit<SignUpFormFields, 'date'>
  | keyof Omit<EditFormFields, 'image'>
  | 'currentPassword'
  | 'newPassword'

type InputNameMap = Record<InputNameMapKeyType, { label: string; type: string }>

const inputNameMap: InputNameMap = {
  password: { label: 'Password', type: 'password' },
  name: { label: 'Name', type: 'text' },
  email: { label: 'Email', type: 'email' },
  confirmPassword: { label: 'Confirm password', type: 'password' },
  phoneNumber: { label: 'Phone number', type: 'tel' },
  year: { label: 'Year', type: 'text' },
  month: { label: 'Mear', type: 'text' },
  day: { label: 'Dear', type: 'text' },
  tgLink: { label: 'Telegram link', type: 'text' },
  gender: { label: 'Gender', type: 'text' },
  bio: { label: 'Bio', type: 'text' },
  currentPassword: { label: 'Current password ', type: 'password' },
  newPassword: { label: 'New password', type: 'password' },
}

const firebaseErrorMap: Record<string, string> = {
  'auth/email-already-in-use': 'Email already in use',
  'auth/wrong-password': 'Invalid email or password',
  'auth/invalid-email': 'Invalid email or password',
  'auth/invalid-credential': 'Invalid email or password',
  'auth/user-not-found': 'Invalid email or password',
  'auth/too-many-requests': 'Too many attempts. Access to this account has been temporarily disabled',
}

export {
  DEFAULT_CACHE_TIME_S,
  firebaseErrorMap,
  inputNameMap,
  LINKS,
  MAX_TWEET_LENGTH,
  MIN_USER_AGE,
  MONTH_NAMES,
  YEARS,
}
