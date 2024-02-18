import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserInfo } from '@types'

export interface AuthStateType {
  email: string
  password: string
  provider: 'google' | 'email' | ''
}

const initialState: AuthStateType = {
  email: '',
  password: '',
  provider: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signUpWithEmail(
      state,
      { payload }: PayloadAction<Omit<UserInfo, 'uid' | 'photoURL' | 'authProvider'> & { password: string }>,
    ) {
      const { email, password } = payload
      state.email = email
      state.password = password
      state.provider = 'email'
    },
    signUpWithGoogle(state) {
      state.provider = 'google'
    },
    signOut() {},
    signInWithEmail(state, { payload }: PayloadAction<{ email: string; password: string }>) {
      const { email, password } = payload
      state.email = email
      state.password = password
    },
  },
})

export const { signUpWithEmail, signUpWithGoogle, signOut, signInWithEmail } = authSlice.actions
