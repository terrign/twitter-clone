import { EditFormFields, SignUpFormFields } from '@models/index'
import { generateDays, generateYears } from '@utils/index'

const DEFAULT_CACHE_TIME_S = 15

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
const DAYS = generateDays()

const MONTHS = {
  January: '01',
  February: '02',
  March: '03',
  April: '04',
  May: '05',
  June: '06',
  July: '07',
  August: '08',
  September: '09',
  October: '10',
  November: '11',
  December: '12',
}

type inputNameMapKeyType =
  | keyof SignUpFormFields
  | keyof Omit<EditFormFields, 'image'>
  | 'currentPassword'
  | 'newPassword'

type InputNameMap = Record<inputNameMapKeyType, { label: string; type: string }>

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

export { DAYS, DEFAULT_CACHE_TIME_S, firebaseErrorMap, inputNameMap, LINKS, MONTHS, YEARS }
