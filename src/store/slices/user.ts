import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Theme } from '@types'

export type User = {
  theme: Theme
}

const initialState: User = {
  theme: Theme.LIGHT,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    createUser(state, { payload }: PayloadAction<User>) {
      state = payload
    },
    switchTheme(state, { payload }: PayloadAction<Theme>) {
      state.theme = payload ^ 1
    },
  },
})

export const { createUser, switchTheme } = userSlice.actions
