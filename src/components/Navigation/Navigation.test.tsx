import { Route } from 'react-router-dom'
import { Navigation } from '@components/Navigation'
import { navLinks } from '@components/Navigation/constants'
import { Route as RouterPaths } from '@router/types'
import { store } from '@store/index'
import { setUser } from '@store/slices/user'
import { mockUserList } from '@test/__mocks__/userList'
import { Wrappers } from '@test/utils'
import { render, screen } from '@testing-library/react'

describe('Navigation', () => {
  const user = mockUserList[1]

  store.dispatch(setUser(user))

  it('Has all links', async () => {
    render(
      <Wrappers routerEntries={[`/home`]}>
        <Route path={RouterPaths.WELCOME} element={<Navigation />}>
          <Route path={`${RouterPaths.PROFILE}/:userId`} element={<div>profile_route</div>} />
          <Route path={RouterPaths.HOME} element={<div>home_route</div>} />
          <Route path={RouterPaths.TODO} element={<div>todo_route</div>} />
        </Route>
      </Wrappers>,
    )

    navLinks.map((link) => {
      expect(screen.getByText(link.label)).toBeInTheDocument()
    })
  })
})
