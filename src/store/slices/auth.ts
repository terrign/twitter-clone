import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EmailSignUpPayload } from '@models/index'

const initialState = {}

export const authSlice = createSlice({
  name: 'auth',
  reducerPath: 'auth',
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
