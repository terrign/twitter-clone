import { act } from 'react-dom/test-utils'
import { Route } from 'react-router-dom'
import { UsersSearch } from '@components/YouMightLike/UsersSearch'
import { mockUserList } from '@test/__mocks__/userList'
import { Wrappers } from '@test/utils'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('UserSearch', () => {
  const userEvents = userEvent.setup()

  it('Shows tweet list after entering search query', async () => {
    render(
      <Wrappers routerEntries={[`/home`]}>
        <Route path="/home" element={<UsersSearch />} />
      </Wrappers>,
    )

    await act(async () => {
      await userEvents.type(screen.getByPlaceholderText('Search People'), mockUserList[0].name.slice(0, 3))
    })

    await waitFor(() => setTimeout(() => {}, 1500))

    await waitFor(() => {
      expect(screen.getByText('Users')).toBeInTheDocument()
      expect(screen.getByText(mockUserList[0].name.split(' ')[0])).toBeInTheDocument()
    })

    await act(async () => {
      await userEvents.type(screen.getByPlaceholderText('Search People'), 'asdasdas!@#$%^&*dasdasdasdasd')
    })

    await waitFor(() => setTimeout(() => {}, 1500))

    await waitFor(() => {
      expect(screen.getByText('Nothing found')).toBeInTheDocument()
    })
  }, 10000)
})
