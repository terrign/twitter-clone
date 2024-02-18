import { PayloadAction } from '@reduxjs/toolkit'
import { firebase } from '@services'
import { setUser } from '@store'
import { DbUserRecord, UserInfo } from '@types'
import { AuthError, UserCredential } from 'firebase/auth'
import { all, call, put, takeLeading } from 'redux-saga/effects'

import { setAlert } from '../slices/alert'
import { signInWithEmail, signOut, signUpWithEmail, signUpWithGoogle } from '../slices/auth'

function* googleSignUpWorker() {
  const result: UserCredential | AuthError = yield firebase.googleSignUp()

  if (result instanceof Error) {
    yield put(setAlert({ type: 'error', message: result.message }))
  } else {
    const { email, uid, phoneNumber, photoURL, displayName } = result.user

    const { user, recordId }: DbUserRecord = yield call(firebase.queryUserById, uid)

    const createdUser: UserInfo = {
      email: email ?? '',
      uid: uid ?? '',
      photoURL: photoURL ?? '',
      name: displayName ?? '',
      authProvider: 'google',
      dateOfBirth: '',
      phoneNumber: phoneNumber ?? '',
    }

    if (recordId && user?.authProvider !== 'google') {
      yield call(firebase.updateDbUserRecord, recordId, { authProvider: 'google' })
    } else {
      yield call(firebase.saveUserToDb, createdUser)
      yield put(setUser(createdUser))
    }
  }
}

function* emailSignUpWorker({ payload }: PayloadAction<UserInfo & { password: string }>) {
  const { email, password, dateOfBirth, phoneNumber, name } = payload

  const result: UserCredential | AuthError = yield call(firebase.emailSignUp, email, password)

  if (result instanceof Error) {
    yield put(setAlert({ type: 'error', message: result.message }))
  } else {
    const { uid } = result.user

    const createdUser: UserInfo = {
      email,
      uid,
      name,
      dateOfBirth,
      phoneNumber,
      authProvider: 'firebase',
      photoURL: '',
    }

    yield call(firebase.saveUserToDb, createdUser)
    yield put(setUser(createdUser))
  }
}

function* signOutWorker() {
  yield firebase.signOut()
}

function* signInWorker({ payload }: PayloadAction<{ email: string; password: string }>) {
  const { email, password } = payload
  const result: UserCredential | AuthError = yield firebase.emailSignIn(email, password)

  if (result instanceof Error) {
    yield put(setAlert({ type: 'error', message: result.message }))
  } else {
    const { uid } = result.user

    const dbUserRecord: UserInfo = yield call(firebase.queryUserById, uid)

    yield put(setUser(dbUserRecord))
  }
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

function* watchAuth() {
  yield all([watchGoogleSignUp(), watchEmailSignUp(), watchSignOut(), watchSignIn()])
}

export function* rootSaga() {
  yield watchAuth()
}
