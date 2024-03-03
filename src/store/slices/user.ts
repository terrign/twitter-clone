import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { signOut, usersApi } from '@store'
import { Theme, UserInfo } from '@types'

export interface UserStateType {
  theme: Theme
  user: UserInfo
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
    }),
      builder.addMatcher(usersApi.endpoints.getUserById.matchFulfilled, (state, { payload }) => {
        if (payload && state.user.uid === payload?.uid) {
          state.user = payload
        }
      })
  },
})

export const { setUser, createUser, switchTheme, updateUser } = userSlice.actions
