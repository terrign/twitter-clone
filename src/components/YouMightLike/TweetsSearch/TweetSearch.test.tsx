import { act } from 'react-dom/test-utils'
import { Route } from 'react-router-dom'
import { TweetsSearch } from '@components/YouMightLike/TweetsSearch'
import { mockTweetList } from '@test/__mocks__/tweetList'
import { Wrappers } from '@test/utils'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('TweetSearch', () => {
  const userEvents = userEvent.setup()

  it('Shows tweet list after entering search query', async () => {
    render(
      <Wrappers routerEntries={[`/profile`]}>
        <Route path="/profile" element={<TweetsSearch />} />
      </Wrappers>,
    )

    await act(async () => {
      await userEvents.type(screen.getByPlaceholderText('Search Twitter'), mockTweetList[1].text.slice(0, 3))
    })

    await waitFor(
      () => {
        expect(screen.getByText('Tweets')).toBeInTheDocument()
        expect(screen.getByText(mockTweetList[1].text)).toBeInTheDocument()
      },
      { timeout: 10000 },
    )

    await act(async () => {
      await userEvents.type(screen.getByPlaceholderText('Search Twitter'), 'asdasdas!@#$%^&*dasdasdasdasd')
    })

    await waitFor(
      () => {
        expect(screen.getByText('Nothing found')).toBeInTheDocument()
      },
      { timeout: 10000 },
    )
  }, 10000)
})
