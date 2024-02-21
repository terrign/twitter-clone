import { UserInfo } from '@types'
import { FirebaseApp, initializeApp } from 'firebase/app'
import {
  Auth,
  AuthError,
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  UserCredential,
} from 'firebase/auth'
import { doc, Firestore, getDoc, getFirestore, setDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.APP_API_KEY,
  authDomain: import.meta.env.APP_AUTH_DOMAIN,
  projectId: import.meta.env.APP_PROJECT_ID,
  storageBucket: import.meta.env.APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.APP_ID,
  measurementId: import.meta.env.APP_MEASUREMENT_ID,
}

class FirebaseService {
  private app: FirebaseApp = initializeApp(firebaseConfig)
  private googleProvider: GoogleAuthProvider = new GoogleAuthProvider()

  public db: Firestore = getFirestore(this.app)
  public auth: Auth = getAuth(this.app)

  constructor() {
    this.googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly')
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

  public signOut = async () => this.auth.signOut()

  public createUser = async (user: UserInfo) => await setDoc(doc(this.db, `users`, user.uid), user)

  public getUserById = async (uid: string) => (await getDoc(doc(this.db, 'users', uid))).data()

  public updateUser = async (uid: string, userInfo: Partial<UserInfo>) =>
    await setDoc(doc(this.db, 'users', uid), userInfo, { merge: true })
}

export const firebase = new FirebaseService()
