import {
  Auth,
  AuthError,
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  getAuth,
  GoogleAuthProvider,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  updatePassword,
  UserCredential,
} from 'firebase/auth'

import { GOOGLE_PROVIDER_SCOPE } from '../constants'
import { app } from '../init'

class AuthService {
  public auth: Auth = getAuth(app)
  private googleProvider: GoogleAuthProvider = new GoogleAuthProvider()

  constructor() {
    this.googleProvider.addScope(GOOGLE_PROVIDER_SCOPE)
  }

  public emailSignUp = async (email: string, password: string): Promise<UserCredential | AuthError> => {
    try {
      const emailSignUpResult = await createUserWithEmailAndPassword(this.auth, email, password)

      return emailSignUpResult
    } catch (error) {
      return error as AuthError
    }
  }

  public googleSignUp = async () => {
    try {
      const signUnResult = await signInWithPopup(this.auth, this.googleProvider)

      return signUnResult
    } catch (error) {
      return error as AuthError
    }
  }

  public emailSignIn = async (email: string, password: string) => {
    try {
      const emailSignInResult = await signInWithEmailAndPassword(this.auth, email, password)

      return emailSignInResult
    } catch (error) {
      return error as AuthError
    }
  }

  public updatePassword = async (oldPassword: string, newPassword: string) => {
    console.log('update pass service')

    if (this.auth.currentUser) {
      try {
        console.log('try')
        const credential = EmailAuthProvider.credential(this.auth.currentUser.email ?? '', oldPassword)
        await reauthenticateWithCredential(this.auth.currentUser, credential)
        await updatePassword(this.auth.currentUser, newPassword)
      } catch (error) {
        console.log('catch')

        return error as AuthError
      }
    }
  }

  public signOut = async () => this.auth.signOut()
}

export const authService = new AuthService()
