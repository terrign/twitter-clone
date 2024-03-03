import '@testing-library/jest-dom'
import '@testing-library/react'
import '@testing-library/user-event'

jest.mock('redux-persist', () => {
  const real = jest.requireActual('redux-persist')
  return {
    ...real,
    persistReducer: jest.fn().mockImplementation((config, reducers) => reducers),
  }
})

import dotenv from 'dotenv'

dotenv.config()
