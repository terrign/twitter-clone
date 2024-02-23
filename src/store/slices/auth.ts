import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EmailSignUpPayload } from '@types'

export interface AuthStateType {}

const initialState: AuthStateType = {}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signUpWithEmail(_, {}: PayloadAction<EmailSignUpPayload>) {},
    signUpWithGoogle() {},
    signInWithEmail(_, {}: PayloadAction<{ email: string; password: string }>) {},
    updatePassword(_, {}: PayloadAction<{ currentPassword: string; newPassword: string }>) {},
    signOut() {},
  },
})

export const { signUpWithEmail, signUpWithGoogle, signOut, signInWithEmail, updatePassword } = authSlice.actions
