import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { signOut } from '@store'
import { Theme, UserInfo } from '@types'

export interface UserStateType {
  theme: Theme
  user: UserInfo
  recordId: string
}

const EMPTY_USER: UserInfo = {
  email: '',
  name: '',
  phoneNumber: '',
  dateOfBirth: '',
  uid: '',
  photoURL: '',
  authProvider: '',
  gender: '',
  tgLink: '',
  bio: '',
}

const initialState: UserStateType = {
  theme: Theme.LIGHT,
  user: EMPTY_USER,
  recordId: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, { payload }: PayloadAction<UserInfo>) {
      state.user = payload
    },

    createUser(state, { payload }: PayloadAction<UserInfo>) {
      state.user = payload
    },

    switchTheme(state) {
      state.theme = state.theme ^ 1
    },

    updateUser(state, { payload }: PayloadAction<Partial<UserInfo> & { uid: string }>) {
      const prevUser = { ...state.user }
      state.user = { ...prevUser, ...payload }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signOut, (store) => {
      store.user = EMPTY_USER
    })
  },
})

export const { setUser, createUser, switchTheme, updateUser } = userSlice.actions
