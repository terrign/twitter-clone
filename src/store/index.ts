import { combineSlices, configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
// eslint-disable-next-line import/no-unresolved
import localStorage from 'redux-persist/es/storage'
import createSagaMiddleware from 'redux-saga'

import {
  tweetsApi,
  useAddTweetMutation,
  useFetchTweetQuery,
  useFetchTweetsByUserIdQuery,
  useLikeTweetMutation,
  useUnlikeTweetMutation,
} from './api/tweets.api'
import { useGetUserByIdQuery, useGetUserSuggestionsQuery, usersApi } from './api/users.api'
import { rootSaga } from './sagas'
import { alertSlice, removeAlert, setAlert } from './slices/alert'
import { authSlice, signInWithEmail, signOut, signUpWithEmail, signUpWithGoogle, updatePassword } from './slices/auth'
import { setUser, switchTheme, updateUser, userSlice } from './slices/user'

const rootPersistConfig = {
  key: 'root',
  storage: localStorage,

  blacklist: ['auth'],
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

export {
  type AppDispatch,
  persistor,
  removeAlert,
  type RootState,
  setAlert,
  setUser,
  signInWithEmail,
  signOut,
  signUpWithEmail,
  signUpWithGoogle,
  store,
  switchTheme,
  tweetsApi,
  updatePassword,
  updateUser,
  useAddTweetMutation,
  useAppDispatch,
  useAppSelector,
  useFetchTweetQuery,
  useFetchTweetsByUserIdQuery,
  useGetUserByIdQuery,
  useGetUserSuggestionsQuery,
  useLikeTweetMutation,
  usersApi,
  useUnlikeTweetMutation,
}
