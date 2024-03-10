import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type AlertState = {
  message: string
  type: 'success' | 'error'
}

const initialState: AlertState = {
  message: '',
  type: 'success',
}

export const notificationSlice = createSlice({
  name: 'alert',
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
