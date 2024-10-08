import { mapErrorMessage } from '@utils/mapErrorMessage'
import { FirebaseError } from 'firebase/app'
import {
  Auth,
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  GoogleAuthProvider,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  updatePassword,
  UserCredential,
} from 'firebase/auth'
import { GOOGLE_PROVIDER_SCOPE } from '../constants'
import { auth } from '../init'

export type AuthReturnType = UserCredential | FirebaseError | undefined

class AuthService {
  public auth: Auth = auth
  private googleProvider: GoogleAuthProvider = new GoogleAuthProvider()

  constructor() {
    this.googleProvider.addScope(GOOGLE_PROVIDER_SCOPE)
  }

  public emailSignUp = async (email: string, password: string): Promise<AuthReturnType> => {
    try {
      const emailSignUpResult = await createUserWithEmailAndPassword(this.auth, email, password)

      return emailSignUpResult
    } catch (error) {
      return mapErrorMessage(error)
    }
  }

  public googleSignUp = async (): Promise<AuthReturnType> => {
    try {
      const signUnResult = await signInWithPopup(this.auth, this.googleProvider)

      return signUnResult
    } catch (error) {
      return mapErrorMessage(error)
    }
  }

  public emailSignIn = async (email: string, password: string): Promise<AuthReturnType> => {
    try {
      const emailSignInResult = await signInWithEmailAndPassword(this.auth, email, password)

      return emailSignInResult
    } catch (error) {
      return mapErrorMessage(error)
    }
  }

  public updatePassword = async (oldPassword: string, newPassword: string): Promise<AuthReturnType> => {
    if (this.auth.currentUser) {
      try {
        const credential = EmailAuthProvider.credential(this.auth.currentUser.email ?? '', oldPassword)
        await reauthenticateWithCredential(this.auth.currentUser, credential)
        await updatePassword(this.auth.currentUser, newPassword)
      } catch (error) {
        return mapErrorMessage(error)
      }
    }
  }

  public signOut = async () => this.auth.signOut()
}

export const authService = new AuthService()
