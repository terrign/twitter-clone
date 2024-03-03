import { FirebaseOptions } from 'firebase/app'

const FIREBASE_CONFIG: FirebaseOptions = {
  apiKey: process.env.APP_API_KEY,
  authDomain: process.env.APP_AUTH_DOMAIN,
  projectId: process.env.APP_PROJECT_ID,
  storageBucket: process.env.APP_STORAGE_BUCKET,
  messagingSenderId: process.env.APP_MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.APP_MEASUREMENT_ID,
}

const GOOGLE_PROVIDER_SCOPE = 'https://www.googleapis.com/auth/contacts'

enum Collection {
  USERS = 'users',
  TWEETS = 'tweets',
}

export { Collection, FIREBASE_CONFIG, GOOGLE_PROVIDER_SCOPE }
