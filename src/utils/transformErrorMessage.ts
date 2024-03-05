import { firebaseErrorMap } from '@constants'
import { FirebaseError } from 'firebase/app'

export const mapErrorMessage = (error: unknown) => {
  if (error instanceof FirebaseError && firebaseErrorMap[error.code]) {
    error.message = firebaseErrorMap[error.code]

    return error
  } else if (error instanceof Error) {
    return error
  }

  return new Error('Unknown error occured, please try to reload the page')
}
