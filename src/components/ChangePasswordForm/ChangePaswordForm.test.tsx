import { Route } from 'react-router-dom'
import { Profile } from '@pages/PrivateRoot/Profile'
import { EditProfile } from '@pages/PrivateRoot/Profile/EditProfile'
import { authService } from '@services/Auth'
import { store } from '@store/index'
import { setUser } from '@store/slices/user'
import { mockUserList } from '@test/__mocks__/userList'
import { Wrappers } from '@test/utils'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { ValidationError } from '@utils/formValidationSchemas'

describe('Change password form', () => {
  const LONG_PASS = 'asdfasdf'.repeat(11)
  const SHORT_PASS = '123'
  const WEAK_PASSWORDS = ['123asdasad', 'asdasd123asd!', 'sdfasdf2as3q2123A']
  const STRONG_PASS = '123asdAasdasd!@#$$'

  const user = mockUserList[4] // email user
  store.dispatch(setUser(user))

  test('Validation', async () => {
    render(
      <Wrappers routerEntries={[`/profile/${user.uid}/edit`]}>
        <Route path="/" element={<div />} />
        <Route path="profile/:userId" element={<Profile />} />
        <Route path="profile/:userId/edit" element={<EditProfile />} />
      </Wrappers>,
    )

    const currentPassInput = screen.getByLabelText('Current password')
    const newPassInput = screen.getByLabelText('New password')
    const confirmPassInput = screen.getByLabelText('Confirm password')

    const inputs = [currentPassInput, newPassInput]

    inputs.map((input) => {
      fireEvent.change(input, { target: { value: LONG_PASS } })
    })

    await waitFor(() => expect(screen.getAllByText(ValidationError.PASS_LONG)).toHaveLength(2))

    inputs.map((input) => {
      fireEvent.change(input, { target: { value: SHORT_PASS } })
    })

    await waitFor(() => expect(screen.getAllByText(ValidationError.PASS_SHORT)).toHaveLength(2))

    inputs.map((input) => {
      fireEvent.change(input, { target: { value: WEAK_PASSWORDS[0] } })
    })

    await waitFor(() => expect(screen.getAllByText(ValidationError.PASS_WEAK)).toHaveLength(2))

    inputs.map((input) => {
      fireEvent.change(input, { target: { value: WEAK_PASSWORDS[1] } })
    })

    await waitFor(() => expect(screen.getAllByText(ValidationError.PASS_WEAK)).toHaveLength(2))

    inputs.map((input) => {
      fireEvent.change(input, { target: { value: WEAK_PASSWORDS[2] } })
    })

    await waitFor(() => expect(screen.getAllByText(ValidationError.PASS_WEAK)).toHaveLength(2))

    inputs.concat(confirmPassInput).map((input) => {
      fireEvent.change(input, { target: { value: '' } })
    })

    await waitFor(() => expect(screen.getAllByText(ValidationError.PASS_REQUIRED)).toHaveLength(2))
    await waitFor(() => expect(screen.getByText(ValidationError.PASS_CONFIRM_REQUIRED)).toBeInTheDocument())

    fireEvent.change(newPassInput, { target: { value: STRONG_PASS } })
    fireEvent.change(confirmPassInput, { target: { value: STRONG_PASS + '1' } })

    await waitFor(() => expect(screen.getByText(ValidationError.PASS_CONFIRM_DONT_MATCH)).toBeInTheDocument())
  })

  it('Changes password', async () => {
    render(
      <Wrappers routerEntries={[`/profile/${user.uid}/edit`]}>
        <Route path="/" element={<div />} />
        <Route path="profile/:userId" element={<Profile />} />
        <Route path="profile/:userId/edit" element={<EditProfile />} />
      </Wrappers>,
    )

    const currentPassInput = screen.getByLabelText('Current password')
    const newPassInput = screen.getByLabelText('New password')
    const confirmPassInput = screen.getByLabelText('Confirm password')

    const inputs = [currentPassInput, newPassInput, confirmPassInput]

    inputs.map((input) => {
      fireEvent.change(input, { target: { value: STRONG_PASS } })
    })

    fireEvent.click(screen.getByText('Update'))

    await waitFor(() => expect(authService.updatePassword).toHaveBeenCalledWith(STRONG_PASS, STRONG_PASS))
  })
})
