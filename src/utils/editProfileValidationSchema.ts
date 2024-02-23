import * as yup from 'yup'

const NAME_REGEXP = /^[a-zA-ZА-Яa-я' ]+$/

const enum ValidationError {
  NAME_REQUIRED = 'Enter your name',
  NAME_NO_SPECIAL = 'No special characters or numbers allowed',
  NAME_LONG = 'Maximum 50 characters',
}

export const EditProfileValidationSchema = () =>
  yup.object().shape({
    name: yup
      .string()
      .required(ValidationError.NAME_REQUIRED)
      .matches(NAME_REGEXP, ValidationError.NAME_NO_SPECIAL)
      .max(50, ValidationError.NAME_LONG),
    bio: yup.string().max(50),
    tgLink: yup.string().max(50),
    image: yup.mixed(),
    gender: yup.string().max(50),
  })
