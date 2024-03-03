import { all, spawn } from 'redux-saga/effects'
import { authSaga } from './auth'
import { userSaga } from './user'

export function* rootSaga() {
  yield all([spawn(authSaga), spawn(userSaga)])
}
