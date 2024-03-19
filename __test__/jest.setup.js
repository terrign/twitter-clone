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
      updateUser: jest.fn().mockImplementation(async (uid, userInfo) => null),
      searchUsers: jest
        .fn()
        .mockImplementation(async (slug) =>
          mockUserList.filter((user) => user.name.toLowerCase().startsWith(slug.toLowerCase())),
        ),
      getSuggestedUsers: jest.fn().mockImplementation(async () => mockUserList),
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
      deleteTweet: jest.fn().mockImplementation(async (tweetId) => {}),
      likeTweet: jest.fn().mockImplementation(async (tweetId, uid) => {}),
      unlikeTweet: jest.fn().mockImplementation(async (tweetId, uid) => {}),
      createTweet: jest.fn().mockImplementation(async (tweet) => {}),
      searchTweet: jest
        .fn()
        .mockImplementation(async (slug) =>
          mockTweetList.filter((tweet) => tweet.text.toLowerCase().startsWith(slug.toLowerCase())),
        ),
      getSuggestedTweets: jest
        .fn()
        .mockImplementation(async () => mockTweetList.filter((tweet) => tweet.imageURL !== '').slice(0, 6)),
    },
  }
})

jest.mock('@services/Auth', () => {
  return {
    authService: {
      updatePassword: jest.fn().mockImplementation(async (oldPassword, newPassword) => {}),
      emailSignUp: jest.fn().mockImplementation(async (email, password) => {}),
      googleSignUp: jest.fn().mockImplementation(async () => {}),
      auth: {
        authStateReady: jest.fn().mockImplementation(async () => {}),
        currentUser: null,
      },
    },
  }
})

jest.mock('@services/Storage', () => {
  return {
    storageService: {
      addFile: jest.fn().mockImplementation(async (file) => 'test_url'),
      addUserAvatar: jest.fn().mockImplementation(async (file, uid) => 'test_url'),
    },
  }
})

import { redirect } from 'react-router-dom'

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    redirect: jest.fn().mockImplementation((url) => url),
  }
})

Date.now = jest.fn(() => 1)
