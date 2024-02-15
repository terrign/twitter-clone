import { combineSlices, configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import createSagaMiddleware from 'redux-saga'

import { rootSaga } from './saga'
import { userSlice } from './slices/user'

const sagaMiddleware = createSagaMiddleware()
const rootReducer = combineSlices(userSlice)

const store = configureStore({
  reducer: rootReducer,
  middleware: (gDM) => gDM().concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

const useAppDispatch = useDispatch.withTypes<AppDispatch>()
const useAppSelector = useSelector.withTypes<RootState>()

export { type AppDispatch, type RootState, store, useAppDispatch, useAppSelector }
