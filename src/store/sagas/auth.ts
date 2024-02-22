import { PayloadAction } from '@reduxjs/toolkit'
import { firebase } from '@services'
import { AuthProvider, EmailSignUpPayload, UserInfo } from '@types'
import { AuthError, UserCredential } from 'firebase/auth'
import { all, call, put, takeLeading } from 'redux-saga/effects'

import { setAlert } from '../slices/alert'
import { signInWithEmail, signOut, signUpWithEmail, signUpWithGoogle } from '../slices/auth'
import { createUser, updateUser } from '../slices/user'
import { getUser } from './user'

function* googleSignUpWorker() {
  const signUpResult: UserCredential | AuthError = yield firebase.googleSignUp()

  if (signUpResult instanceof Error) {
    yield put(setAlert({ type: 'error', message: signUpResult.message }))
  } else {
    const { email, uid, phoneNumber, photoURL, displayName } = signUpResult.user
    const user: UserInfo | undefined = yield call(getUser, signUpResult.user.uid)

    if (user && user.authProvider !== 'google') {
      yield put(updateUser({ uid, authProvider: AuthProvider.GOOGLE }))
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
      }

      yield put(createUser(newUser))
    }
  }
}

function* emailSignUpWorker({ payload: { email, password, userInfo } }: PayloadAction<EmailSignUpPayload>) {
  const result: UserCredential | AuthError = yield call(firebase.emailSignUp, email, password)

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
  const result: UserCredential | AuthError = yield firebase.emailSignIn(email, password)

  if (result instanceof Error) {
    yield put(setAlert({ type: 'error', message: result.message }))
  } else {
    yield call(getUser, result.user.uid)
  }
}

function* signOutWorker() {
  console.log('signout')
  yield firebase.signOut()
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

export function* authSaga() {
  yield all([watchGoogleSignUp(), watchEmailSignUp(), watchSignOut(), watchSignIn()])
}
