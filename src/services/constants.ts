const FIREBASE_CONFIG = {
  apiKey: import.meta.env.APP_API_KEY,
  authDomain: import.meta.env.APP_AUTH_DOMAIN,
  projectId: import.meta.env.APP_PROJECT_ID,
  storageBucket: import.meta.env.APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.APP_ID,
  measurementId: import.meta.env.APP_MEASUREMENT_ID,
}

const GOOGLE_PROVIDER_SCOPE = 'https://www.googleapis.com/auth/contacts'

const enum Collection {
  USERS = 'users',
  TWEETS = 'tweets',
}

export { Collection, FIREBASE_CONFIG, GOOGLE_PROVIDER_SCOPE }
