import { TweetCard } from '@components/TweetCard'
import { Providers } from '@context/Providers'
import { AuthProvider, Tweet, UserInfo } from '@models/index'
import { render } from '@testing-library/react'

const mockUser: UserInfo = {
  authProvider: AuthProvider.EMAIL,
  name: 'asdfasdf',
  uid: '123',
  phoneNumber: '123',
  email: '123123@email.com',
  dateOfBirth: '123',
  photoURL: '',
  gender: '123',
  tgLink: '',
  bio: '',
}

const tweetMock: Tweet = {
  id: 'asdf',
  createdById: '123',
  text: 'asdasd',
  imageURL: '',
  likedUserIds: [],
  timestamp: 123123123,
}

jest.mock('@services/User', () => {
  return {
    userService: {
      getUserById: async () => mockUser,
    },
  }
})

jest.mock('@services/Tweets', () => {
  return {
    tweetService: {
      getTweetById: async () => ({
        id: 'asdf',
        createdById: '123',
        text: 'test_tweet_text',
        imageURL: '',
        likedUserIds: [],
        timestamp: 123123123,
      }),
      likeTweet: async () => null,
      unlikeTweet: async () => null,
    },
  }
})

describe('TweetCard', () => {
  it('Closes on close button click', async () => {
    render(<TweetCard createdByInfo={mockUser} tweet={tweetMock} />, { wrapper: Providers })
  })
})
