import { PayloadAction } from '@reduxjs/toolkit'
import { firebase } from '@services'
import { UserInfo } from '@types'
import { all, call, put, takeEvery } from 'redux-saga/effects'

import { createUser, setUser, updateUser } from '../slices/user'

export function* getUser(uid: string) {
  const user: UserInfo | undefined = yield call(firebase.getUserById, uid)

  if (user) {
    yield put(setUser(user))
  }

  return user
}

function* createUserWorker({ payload }: PayloadAction<UserInfo>) {
  yield call(firebase.createUser, payload)
}

function* updateUserWorker({ payload }: PayloadAction<Partial<UserInfo> & { uid: string }>) {
  yield call(firebase.updateUser, payload.uid, payload)
}

function* watchCreateUser() {
  yield takeEvery(createUser, createUserWorker)
}

function* watchUpdateUser() {
  yield takeEvery(updateUser, updateUserWorker)
}

export function* userSaga() {
  yield all([watchCreateUser(), watchUpdateUser()])
}
