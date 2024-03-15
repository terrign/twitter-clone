import { TweetCard } from '@components/TweetCard'
import { Providers } from '@context/Providers'
import { AuthProvider, Tweet, UserInfo } from '@models/index'
import { render } from '@testing-library/react'

const userMock: UserInfo = {
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

describe('TweetCard', () => {
  it('Closes on close button click', async () => {
    render(<TweetCard createdByInfo={userMock} tweet={tweetMock} />, { wrapper: Providers })
  })
})
