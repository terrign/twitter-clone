import { PayloadAction } from '@reduxjs/toolkit'
import { all, call, put, takeLeading } from 'redux-saga/effects'
import { AuthProvider, EmailSignUpPayload, UserInfo } from '@models/index'
import { AuthReturnType, authService } from '@services/Auth'
import { persistor } from '@store/index'
import { setAlert } from '../slices/alert'
import { signInWithEmail, signOut, signUpWithEmail, signUpWithGoogle, updatePassword } from '../slices/auth'
import { createUser, updateUser } from '../slices/user'
import { getUser } from './user'

function* googleSignUpWorker() {
  const signUpResult: AuthReturnType = yield authService.googleSignUp()

  if (signUpResult instanceof Error) {
    if (signUpResult.code !== 'auth/popup-closed-by-user') {
      yield put(setAlert({ type: 'error', message: signUpResult.message }))
    }
  } else if (signUpResult) {
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
  const result: AuthReturnType = yield call(authService.emailSignUp, email, password)

  if (result instanceof Error) {
    yield put(setAlert({ type: 'error', message: result.message }))
  } else if (result) {
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
  const result: AuthReturnType = yield authService.emailSignIn(email, password)

  if (result instanceof Error) {
    yield put(setAlert({ type: 'error', message: result.message }))
  } else if (result) {
    yield call(getUser, result.user.uid)
  }
}

function* updatePasswordWorker({
  payload: { currentPassword, newPassword },
}: PayloadAction<{ currentPassword: string; newPassword: string }>) {
  const result: AuthReturnType = yield authService.updatePassword(currentPassword, newPassword)

  if (result instanceof Error) {
    yield put(setAlert({ type: 'error', message: result.message }))
  } else {
    yield put(setAlert({ type: 'success', message: 'Password has been updated' }))
  }
}

function* signOutWorker() {
  yield persistor.purge().then(() => authService.signOut())
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

function* watсhUpdatePassword() {
  yield takeLeading(updatePassword.type, updatePasswordWorker)
}

export function* authSaga() {
  yield all([watchGoogleSignUp(), watchEmailSignUp(), watchSignOut(), watchSignIn(), watсhUpdatePassword()])
}
