import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthProvider, EmailSignUpPayload } from '@types'

export interface AuthStateType {
  email: string
  password: string
  provider: AuthProvider | ''
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
    signUpWithEmail(state, { payload: { email, password } }: PayloadAction<EmailSignUpPayload>) {
      state.email = email
      state.password = password
      state.provider = AuthProvider.EMAIL
    },
    signUpWithGoogle(state) {
      state.provider = AuthProvider.GOOGLE
    },
    signInWithEmail(state, { payload }: PayloadAction<{ email: string; password: string }>) {
      state.email = payload.email
      state.password = payload.password
    },
    signOut() {},
  },
})

export const { signUpWithEmail, signUpWithGoogle, signOut, signInWithEmail } = authSlice.actions
