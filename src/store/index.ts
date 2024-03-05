import { useDispatch, useSelector } from 'react-redux'
import { combineSlices, configureStore } from '@reduxjs/toolkit'
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga'
import { tweetsApi } from './api/tweets'
import { usersApi } from './api/users'
import { alertSlice } from './slices/alert'
import { authSlice } from './slices/auth'
import { userSlice } from './slices/user'
import { rootSaga } from './saga'

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['auth', 'alert', 'tweetsApi', 'usersapi'],
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
