import { Route } from 'react-router-dom'
import { TweetForm } from '@components/TweetForm'
import { tweetService } from '@services/Tweets'
import { store } from '@store/index'
import { setUser } from '@store/slices/user'
import { mockUserList } from '@test/__mocks__/userList'
import { Wrappers } from '@test/utils'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { newTweet } from '@utils/newTweet'

describe('TweetForm', () => {
  const userEvents = userEvent.setup()
  const user = mockUserList[1]
  store.dispatch(setUser(user))

  it('Can create tweet', async () => {
    render(
      <Wrappers>
        <Route path="/" element={<TweetForm />} />
      </Wrappers>,
    )

    const tweetButton = screen.getByText('Tweet')

    expect(tweetButton).toBeInTheDocument()

    act(() => {
      fireEvent.change(screen.getByPlaceholderText(`What's happening`), { target: { value: 'tweet_text' } })
    })

    await act(async () => {
      fireEvent.click(tweetButton)
    })

    expect(tweetService.createTweet).toHaveBeenCalledWith(
      newTweet({ imageURL: '', text: 'tweet_text', createdById: user.uid }),
    )
  })

  it('Allows to add image', async () => {
    render(
      <Wrappers>
        <Route path="/" element={<TweetForm />} />
      </Wrappers>,
    )

    const input = screen.getByTestId('tweetFormImageInput') as HTMLInputElement
    const file = new File([new Blob(['blob'])], 'image.png', { type: 'image/png' })

    await userEvents.upload(input, file)

    await waitFor(() => {
      expect(input.files).toHaveLength(1)
    })

    await act(async () => {
      fireEvent.click(screen.getByText('Tweet'))
    })

    await waitFor(
      () =>
        expect(tweetService.createTweet).toHaveBeenCalledWith(
          newTweet({ imageURL: 'test_url', text: '', createdById: user.uid }),
        ),
      { timeout: 10000 },
    )
  }, 10000)

  it(`Doesn't allow to exceed characters limit`, async () => {
    render(
      <Wrappers>
        <Route path="/" element={<TweetForm />} />
      </Wrappers>,
    )

    fireEvent.change(screen.getByPlaceholderText(`What's happening`), { target: { value: '10_digits_'.repeat(49) } })

    await userEvent.type(screen.getByPlaceholderText(`What's happening`), 'random_string_exceeds_limit')
    expect(screen.getByText(/500(.?)\/(.?)500/)).toBeInTheDocument()
  })
})
