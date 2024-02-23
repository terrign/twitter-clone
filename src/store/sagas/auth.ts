import { PayloadAction } from '@reduxjs/toolkit'
import { authService } from '@services'
import { AuthProvider, EmailSignUpPayload, UserInfo } from '@types'
import { AuthError, UserCredential } from 'firebase/auth'
import { all, call, put, takeLeading } from 'redux-saga/effects'

import { setAlert } from '../slices/alert'
import { signInWithEmail, signOut, signUpWithEmail, signUpWithGoogle, updatePassword } from '../slices/auth'
import { createUser, updateUser } from '../slices/user'
import { getUser } from './user'

function* googleSignUpWorker() {
  const signUpResult: UserCredential | AuthError = yield authService.googleSignUp()

  if (signUpResult instanceof Error) {
    yield put(setAlert({ type: 'error', message: signUpResult.message }))
  } else {
    const { email, uid, phoneNumber, photoURL, displayName } = signUpResult.user
    const user: UserInfo | undefined = yield call(getUser, signUpResult.user.uid)

    if (user) {
      if (user.authProvider !== AuthProvider.GOOGLE) {
        yield put(updateUser({ uid, authProvider: AuthProvider.GOOGLE }))
      }
    } else {
      const newUser: UserInfo = {
        email: email ?? '',
        uid: uid ?? '',
        photoURL: photoURL ?? '',
        name: displayName ?? '',
        authProvider: AuthProvider.GOOGLE,
        dateOfBirth: '',
        phoneNumber: phoneNumber ?? '',
        gender: '',
        tgLink: '',
        bio: '',
      }

      yield put(createUser(newUser))
    }
  }
}

function* emailSignUpWorker({ payload: { email, password, userInfo } }: PayloadAction<EmailSignUpPayload>) {
  const result: UserCredential | AuthError = yield call(authService.emailSignUp, email, password)

  if (result instanceof Error) {
    yield put(setAlert({ type: 'error', message: result.message }))
  } else {
    const user = {
      ...userInfo,
      uid: result.user.uid,
      authProvider: AuthProvider.EMAIL,
      photoURL: '',
    }

    yield put(createUser(user))
  }
}

function* signInWorker({ payload }: PayloadAction<{ email: string; password: string }>) {
  const { email, password } = payload
  const result: UserCredential | AuthError = yield authService.emailSignIn(email, password)

  if (result instanceof Error) {
    yield put(setAlert({ type: 'error', message: result.message }))
  } else {
    yield call(getUser, result.user.uid)
  }
}

function* updatePasswordWorker({
  payload: { currentPassword, newPassword },
}: PayloadAction<{ currentPassword: string; newPassword: string }>) {
  console.log('asdasdasdasdasd')
  const result: AuthError | undefined = yield authService.updatePassword(currentPassword, newPassword)

  if (result instanceof Error) {
    yield put(setAlert({ type: 'error', message: result.message }))
  } else {
    yield put(setAlert({ type: 'success', message: 'Password has been updated' }))
  }
}

function* signOutWorker() {
  yield authService.signOut()
}

function* watchGoogleSignUp() {
  yield takeLeading(signUpWithGoogle.type, googleSignUpWorker)
}

function* watchEmailSignUp() {
  yield takeLeading(signUpWithEmail.type, emailSignUpWorker)
}

function* watchSignOut() {
  yield takeLeading(signOut.type, signOutWorker)
}

function* watchSignIn() {
  yield takeLeading(signInWithEmail.type, signInWorker)
}

function* wathUpdatePassword() {
  yield takeLeading(updatePassword.type, updatePasswordWorker)
}

export function* authSaga() {
  yield all([watchGoogleSignUp(), watchEmailSignUp(), watchSignOut(), watchSignIn(), wathUpdatePassword()])
}
