import * as yup from 'yup'

const STRONG_PASS_REGEXP = /.+/ // /^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\d)(?=.*[\W_~!@#$%^&*+]).{8,}$/ // 1 special character, 1 lowercase, 1 uppercase, 1 number

const EMAIL_REGEXP = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,5}$/

const NAME_REGEXP = /^[a-zA-ZА-Яa-я' ]+$/

const PHONE_REGEXP = /^[+]\d+$/

enum ValidationError {
  INVALID_EMAIL = 'Invalid email',
  EMAIL_REQUIRED = 'Enter your email',

  NAME_REQUIRED = 'Enter your name',
  NAME_NO_SPECIAL = 'No special characters or numbers allowed',
  NAME_LONG = 'Maximum 50 characters',

  PASS_WEAK = 'Password must contain special characters, numbers, uppercase and lowercase letters',
  PASS_SHORT = 'Password must contain atleast 8 symbols',
  PASS_LONG = 'Password must not contain more then 32 characters',
  PASS_REQUIRED = 'Enter your password',

  PASS_CONFIRM_DONT_MATCH = "Passwords don't match",
  PASS_CONFIRM_REQUIRED = 'Confirm password',

  PHONE_REQUIRED = 'Enter your phone number',
  PHONE_INVALID = `Phone starts with '+' and contains only numbers`,

  DATE_DAY = 'Select day',
  DATE_MONTH = 'Select month',
  DATE_YEAR = 'Select year',
}

const name = yup
  .string()
  .required(ValidationError.NAME_REQUIRED)
  .matches(NAME_REGEXP, ValidationError.NAME_NO_SPECIAL)
  .max(50, ValidationError.NAME_LONG)

const email = yup.string().required(ValidationError.EMAIL_REQUIRED).matches(EMAIL_REGEXP, ValidationError.INVALID_EMAIL)

const password = yup
  .string()
  .required(ValidationError.PASS_REQUIRED)
  .min(8, ValidationError.PASS_SHORT)
  .max(32, ValidationError.PASS_LONG)
  .matches(STRONG_PASS_REGEXP, ValidationError.PASS_WEAK)

const confirmPassword = yup.string().required(ValidationError.PASS_CONFIRM_REQUIRED)

const phoneNumber = yup
  .string()
  .required(ValidationError.PHONE_REQUIRED)
  .matches(PHONE_REGEXP, ValidationError.PHONE_INVALID)

export const signUpValidationSchema = () =>
  yup.object().shape({
    email: email,
    name: name,
    password: password,
    confirmPassword: confirmPassword.test('passwords-match', ValidationError.PASS_CONFIRM_DONT_MATCH, function (value) {
      return this.parent.password === value
    }),
    phoneNumber: phoneNumber,
    day: yup.string().required(ValidationError.DATE_DAY),
    month: yup.string().required(ValidationError.DATE_MONTH),
    year: yup.string().required(ValidationError.DATE_YEAR),
  })

export const editProfileValidationSchema = () =>
  yup.object().shape({
    name: name,
    bio: yup.string().max(50),
    tgLink: yup.string().max(50),
    image: yup.mixed(),
    gender: yup.string().max(50),
  })

export const changePasswordValidationSchema = () =>
  yup.object().shape({
    currentPassword: password,
    newPassword: password,
    confirmPassword: confirmPassword.test('passwords-match', ValidationError.PASS_CONFIRM_DONT_MATCH, function (value) {
      return this.parent.newPassword === value
    }),
  })

export const tweetValidationSchema = () =>
  yup.object().shape({
    text: yup.string().max(500),
    image: yup.mixed(),
  })
