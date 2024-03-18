import '@testing-library/jest-dom'
import '@testing-library/react'
import '@testing-library/user-event'
import dotenv from 'dotenv'
import { mockUserList } from './__mocks__/userList'
import { mockTweetList } from './__mocks__/tweetList'

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

jest.mock('@services/User', () => {
  return {
    userService: {
      getUserById: jest.fn().mockImplementation(async (id) => mockUserList.find((user) => user.uid === id) ?? null),
      getUsersByIds: jest
        .fn()
        .mockImplementation(async (userIdsArray) => mockUserList.filter((user) => userIdsArray.includes(user.uid))),
    },
  }
})

jest.mock('@services/Tweets', () => {
  return {
    tweetService: {
      getTweetById: jest.fn().mockImplementation(async (id) => mockTweetList.find((tweet) => tweet.id === id) ?? null),
      getTweetsByUserId: jest
        .fn()
        .mockImplementation(async (userId) => mockTweetList.filter((tweet) => tweet.createdById === userId)),
      getAllTweets: jest.fn().mockImplementation(async () => mockTweetList),
    },
  }
})
