import { firebaseErrorMap } from '@constants/index'
import { FirebaseError } from 'firebase/app'

export const mapErrorMessage = (error: unknown) => {
  if (error instanceof FirebaseError && firebaseErrorMap[error.code]) {
    error.message = firebaseErrorMap[error.code]

    return error
  }

  return new FirebaseError('unknown error', 'Unknown error occured, please try to reload the page')
}
