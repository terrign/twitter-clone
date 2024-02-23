import * as yup from 'yup'

const STRONG_PASS_REGEXP = /.+/ // /^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\d)(?=.*[\W_~!@#$%^&*+]).{8,}$/

const enum ValidationError {
  PASS_WEAK = 'Password must contain special characters, numbers, uppercase and lowercase letters',
  PASS_SHORT = 'Password must contain atleast 8 symbols',
  PASS_LONG = 'Password must not contain more then 32 characters',
  PASS_REQUIRED = 'Enter your password',

  PASS_CONFIRM_DONT_MATCH = "Passwords don't match",
  PASS_CONFIRM_REQUIRED = 'Confirm password',
}

export const changePasswordValidationSchema = () =>
  yup.object().shape({
    currentPassword: yup
      .string()
      .required(ValidationError.PASS_REQUIRED)
      .min(8, ValidationError.PASS_SHORT)
      .max(32, ValidationError.PASS_LONG)
      .matches(STRONG_PASS_REGEXP, ValidationError.PASS_WEAK),
    newPassword: yup
      .string()
      .required(ValidationError.PASS_REQUIRED)
      .min(8, ValidationError.PASS_SHORT)
      .max(32, ValidationError.PASS_LONG)
      .matches(STRONG_PASS_REGEXP, ValidationError.PASS_WEAK),
    confirmPassword: yup
      .string()
      .required(ValidationError.PASS_CONFIRM_REQUIRED)
      .test('passwords-match', ValidationError.PASS_CONFIRM_DONT_MATCH, function (value) {
        return this.parent.newPassword === value
      }),
  })
