import { initializeApp } from 'firebase/app'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import { connectStorageEmulator, getStorage } from 'firebase/storage'
import { FIREBASE_CONFIG } from './constants'

export const app = initializeApp(FIREBASE_CONFIG)

const isDev = false //import.meta.env.DEV

const db = getFirestore(app)

const auth = getAuth(app)

const storage = getStorage(app)

isDev && connectFirestoreEmulator(db, '127.0.0.1', 9096)

isDev && connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true })

isDev && connectStorageEmulator(storage, '127.0.0.1', 9097)

export { auth, db, storage }
