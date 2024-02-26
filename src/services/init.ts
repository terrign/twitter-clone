import { initializeApp } from 'firebase/app'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import { connectStorageEmulator, getStorage } from 'firebase/storage'

import { FIREBASE_CONFIG } from './constants'

export const app = initializeApp(FIREBASE_CONFIG)

const db = getFirestore()

const auth = getAuth()

const storage = getStorage()

import.meta.env.DEV && connectFirestoreEmulator(db, '127.0.0.1', 9096)

import.meta.env.DEV && connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true })

import.meta.env.DEV && connectStorageEmulator(storage, '127.0.0.1', 9097)

export { auth, db, storage }
