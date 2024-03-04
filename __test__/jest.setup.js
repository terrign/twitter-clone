import '@testing-library/jest-dom'
import '@testing-library/react'
import '@testing-library/user-event'
import dotenv from 'dotenv'

dotenv.config()

jest.mock('redux-persist', () => {
  const real = jest.requireActual('redux-persist')
  return {
    ...real,
    persistReducer: jest.fn().mockImplementation((_, reducers) => reducers),
  }
})

jest.mock('../src/services/config', () => ({
  FIREBASE_CONFIG: {
    apiKey: process.env.APP_API_KEY,
    authDomain: process.env.APP_AUTH_DOMAIN,
    projectId: process.env.APP_PROJECT_ID,
    storageBucket: process.env.APP_STORAGE_BUCKET,
    messagingSenderId: process.env.APP_MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
  },
  isDev: true,
}))
