import { Route } from 'react-router-dom'
import { Profile } from '@pages/PrivateRoot/Profile'
import { EditProfile } from '@pages/PrivateRoot/Profile/EditProfile'
import { store } from '@store/index'
import { setUser } from '@store/slices/user'
import { mockUserList } from '@test/__mocks__/userList'
import { Wrappers } from '@test/utils'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

describe('Profile page', () => {
  const user = mockUserList[0]
  store.dispatch(setUser(user))

  it('Renders with correct data', async () => {
    render(
      <Wrappers routerEntries={[`/profile/${user.uid}`]}>
        <Route path="/" element={<div />} />
        <Route path="profile/:userId" element={<Profile />} />
      </Wrappers>,
    )

    await waitFor(() => expect(screen.getByText(mockUserList[0].name)).toBeInTheDocument())
    expect(screen.getByText('0 tweets')).toBeInTheDocument()
    expect(document.querySelectorAll('article').length).toBe(0)
    expect(screen.queryByText('Telegram')).not.toBeInTheDocument()
  })

  it(`Has edit profile button, if current user's profile. Edit profile button leads to edit profile form page`, async () => {
    render(
      <Wrappers routerEntries={[`/profile/${user.uid}`]}>
        <Route path="/" element={<div />} />
        <Route path="profile/:userId" element={<Profile />} />
        <Route path="profile/:userId/edit" element={<EditProfile />} />
      </Wrappers>,
    )

    const button = await waitFor(() => screen.getByText('Edit profile'))
    fireEvent.click(button)
    expect(screen.getByText('Save')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'close modal' }))
    expect(screen.queryByText('Save')).not.toBeInTheDocument()
  })

  it(`Hasn't edit profile button, if other user's profile`, async () => {
    store.dispatch(setUser(mockUserList[1]))

    render(
      <Wrappers routerEntries={[`/profile/${user.uid}`]}>
        <Route path="/" element={<div />} />
        <Route path="profile/:userId" element={<Profile />} />
      </Wrappers>,
    )

    await waitFor(() => expect(screen.queryByText('Edit profile')).not.toBeInTheDocument())
  })

  it(`Has correct telegram link if specified`, async () => {
    const { uid, tgLink } = mockUserList[1]

    render(
      <Wrappers routerEntries={[`/profile/${uid}`]}>
        <Route path="/" element={<div />} />
        <Route path="profile/:userId" element={<Profile />} />
      </Wrappers>,
    )

    await waitFor(() => expect(screen.queryByText('Edit profile')).not.toBeInTheDocument())
    await waitFor(() => expect(screen.getByText('Telegram')).toHaveAttribute('href', tgLink))
  })

  it(`Has change password form, if auth provider is email`, async () => {
    const user = mockUserList[4] // email user
    store.dispatch(setUser(user))

    render(
      <Wrappers routerEntries={[`/profile/${user.uid}`]}>
        <Route path="/" element={<div />} />
        <Route path="profile/:userId" element={<Profile />} />
        <Route path="profile/:userId/edit" element={<EditProfile />} />
      </Wrappers>,
    )

    const button = await waitFor(() => screen.getByText('Edit profile'))

    fireEvent.click(button)

    await waitFor(() => expect(screen.queryByText('Change password')).toBeInTheDocument())
  })
})
