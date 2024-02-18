import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type AlertState = {
  message: string | null
  type: 'success' | 'error'
}

const initialState: AlertState = {
  message: '',
  type: 'success',
}

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert(state, { payload }: PayloadAction<AlertState>) {
      const { message, type } = payload
      state.message = message
      state.type = type
    },
    removeAlert(state) {
      state.message = ''
      state.type = 'success'
    },
  },
})

export const { setAlert, removeAlert } = alertSlice.actions
