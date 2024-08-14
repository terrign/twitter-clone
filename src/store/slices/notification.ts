import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type NotificationType = 'success' | 'error'

export type AlertState = {
  message: string
  type: NotificationType
}

const initialState: AlertState = {
  message: '',
  type: 'success',
}

export const notificationSlice = createSlice({
  name: 'alert',
  reducerPath: 'alert',
  initialState,
  reducers: {
    setErrorNotification(state, { payload }: PayloadAction<string>) {
      state.message = payload
      state.type = 'error'
    },
    setSucessNotification(state, { payload }: PayloadAction<string>) {
      state.message = payload
      state.type = 'success'
    },
    removeAlert(state) {
      state.message = ''
      state.type = 'success'
    },
  },
  selectors: {
    selectNotification: (state) => state,
  },
})

export const { setErrorNotification, setSucessNotification, removeAlert } = notificationSlice.actions

export const { selectNotification } = notificationSlice.selectors
