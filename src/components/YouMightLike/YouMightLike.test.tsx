import { act } from 'react-dom/test-utils'
import { Route } from 'react-router-dom'
import { YouMightLike } from '@components/YouMightLike'
import { mockTweetList } from '@test/__mocks__/tweetList'
import { mockUserList } from '@test/__mocks__/userList'
import { Wrappers } from '@test/utils'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

describe('YouMightLike', () => {
  it('Renders, has user search at home page', async () => {
    render(
      <Wrappers routerEntries={[`/home`]}>
        <Route
          path="/home"
          element={<YouMightLike users={mockUserList} tweets={mockTweetList} toggleAside={() => {}} />}
        />
      </Wrappers>,
    )

    expect(screen.getByPlaceholderText('Search People')).toBeInTheDocument()
  })

  it('Has tweet search at profile page', async () => {
    render(
      <Wrappers routerEntries={[`/profile`]}>
        <Route
          path="/profile"
          element={<YouMightLike users={mockUserList} tweets={mockTweetList} toggleAside={() => {}} />}
        />
      </Wrappers>,
    )

    expect(screen.getByPlaceholderText('Search Twitter')).toBeInTheDocument()
  })

  it('Shows suggestion to search on focus', async () => {
    render(
      <Wrappers routerEntries={[`/home`]}>
        <Route
          path="/home"
          element={
            <>
              <YouMightLike users={mockUserList} tweets={mockTweetList} toggleAside={() => {}} />
            </>
          }
        />
      </Wrappers>,
    )

    await waitFor(() => expect(screen.getByText('Try search for people')).not.toBeVisible())

    await act(async () => {
      fireEvent.focus(screen.getByPlaceholderText('Search People'))
    })

    await waitFor(() => expect(screen.getByText('Try search for people')).toBeVisible())
  })
})
