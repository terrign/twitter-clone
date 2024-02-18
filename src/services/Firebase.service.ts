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
import { addDoc, collection, doc, Firestore, getDocs, getFirestore, query, setDoc, where } from 'firebase/firestore'

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

  public saveUserToDb = async (user: UserInfo) => addDoc(collection(this.db, `users`), user)

  public emailSignUp = async (email: string, password: string): Promise<UserCredential | AuthError> => {
    try {
      const result = await createUserWithEmailAndPassword(this.auth, email, password)

      return result
    } catch (error) {
      return error as AuthError
    }
  }

  public signOut = async () => this.auth.signOut()

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
      const result = await signInWithEmailAndPassword(this.auth, email, password)

      return result
    } catch (error) {
      return error as AuthError
    }
  }

  public queryUserById = async (uid: string) => {
    const userQuery = query(collection(this.db, 'users'), where('uid', '==', uid))
    const doc = await getDocs(userQuery)

    return doc.docs.map((a) => ({ user: a.data(), recordId: a.id }))[0]
  }

  public updateDbUserRecord = async (recordId: string, userInfo: Partial<UserInfo>) => {
    const userRecordRef = doc(this.db, 'users', recordId)
    await setDoc(userRecordRef, { ...userInfo }, { merge: true })

    return userRecordRef
  }
}

export const firebase = new FirebaseService()
