import { combineSlices, configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
// eslint-disable-next-line import/no-unresolved
import localStorage from 'redux-persist/es/storage'
import createSagaMiddleware from 'redux-saga'

import { tweetsApi } from './api/tweets.api'
import { usersApi } from './api/users.api'
import { rootSaga } from './saga'
import { alertSlice } from './slices/alert'
import { authSlice } from './slices/auth'
import { userSlice } from './slices/user'

const rootPersistConfig = {
  key: 'root',
  storage: localStorage,

  blacklist: ['auth', 'alert'],
}

const sagaMiddleware = createSagaMiddleware()
const rootReducer = combineSlices(userSlice, alertSlice, authSlice, tweetsApi, usersApi)

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (gDM) =>
    gDM({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(sagaMiddleware)
      .concat(tweetsApi.middleware)
      .concat(usersApi.middleware),
})

const persistor = persistStore(store)

sagaMiddleware.run(rootSaga)

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

const useAppDispatch = useDispatch.withTypes<AppDispatch>()
const useAppSelector = useSelector.withTypes<RootState>()

export { type AppDispatch, persistor, type RootState, store, useAppDispatch, useAppSelector }
