import { MAX_TWEET_LENGTH, MIN_USER_AGE, MONTH_NAMES } from '@constants/index'
import * as yup from 'yup'

const MIN_PASSWORD_LENGTH = 8

const MAX_PASSWORD_LENGTH = 32

const MAX_USER_INFO_TEXT_FIELD_LENGTH = 50

/**
 * 1 special character, 1 lowercase, 1 uppercase, 1 number
 */
const STRONG_PASS_REGEXP = /^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\d)(?=.*[\W_~!@#$%^&*+]).{8,}$/

/**
 * tg username contains only letters, number and underscore
 */
const TG_LINK_REGEXP = /^(https:\/\/t\.me\/[A-Za-z_0-9]+)?$/

const EMAIL_REGEXP = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,5}$/

const NAME_REGEXP = /^[a-zA-ZА-Яa-я' ]+$/

const PHONE_REGEXP = /^[+]\d+$/

export enum ValidationError {
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

  DATE_YOUNG = 'You must be atleast 18 years old',

  INVALID_TG_LINK = 'Invalid telegram link',
}

function isUserAdult(year: number, monthIndex: number, day: number) {
  if (!year || monthIndex === -1 || !day) {
    return true
  }

  const minDate = new Date()
  minDate.setHours(0)
  minDate.setMinutes(0)
  minDate.setSeconds(0)
  const birthDate = new Date(year + MIN_USER_AGE, monthIndex, day)

  return minDate >= birthDate
}

function testDateOfBirth(this: yup.TestContext<yup.AnyObject>) {
  const year = Number(this.parent.year)
  const month = MONTH_NAMES.indexOf(this.parent.month)
  const day = Number(this.parent.day)

  return isUserAdult(year, month, day)
}

const name = yup
  .string()
  .required(ValidationError.NAME_REQUIRED)
  .matches(NAME_REGEXP, ValidationError.NAME_NO_SPECIAL)
  .max(MAX_USER_INFO_TEXT_FIELD_LENGTH, ValidationError.NAME_LONG)

const email = yup.string().required(ValidationError.EMAIL_REQUIRED).matches(EMAIL_REGEXP, ValidationError.INVALID_EMAIL)

const password = yup
  .string()
  .required(ValidationError.PASS_REQUIRED)
  .min(MIN_PASSWORD_LENGTH, ValidationError.PASS_SHORT)
  .max(MAX_PASSWORD_LENGTH, ValidationError.PASS_LONG)
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
    date: yup.string().test('date-young', ValidationError.DATE_YOUNG, testDateOfBirth),
  })

export const editProfileValidationSchema = () =>
  yup.object().shape({
    name: name,
    bio: yup.string().max(MAX_USER_INFO_TEXT_FIELD_LENGTH),
    tgLink: yup.string().max(MAX_USER_INFO_TEXT_FIELD_LENGTH).matches(TG_LINK_REGEXP, ValidationError.INVALID_TG_LINK),
    image: yup.mixed(),
    gender: yup.string().max(MAX_USER_INFO_TEXT_FIELD_LENGTH),
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
    text: yup.string().max(MAX_TWEET_LENGTH),
    image: yup.mixed(),
  })
