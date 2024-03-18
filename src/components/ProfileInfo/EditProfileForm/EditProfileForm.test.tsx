import { Route } from 'react-router-dom'
import { Profile } from '@pages/PrivateRoot/Profile'
import { EditProfile } from '@pages/PrivateRoot/Profile/EditProfile'
import { store } from '@store/index'
import { setUser } from '@store/slices/user'
import { mockUserList } from '@test/__mocks__/userList'
import { Wrappers } from '@test/utils'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ValidationError } from '@utils/formValidationSchemas'

describe('EditProfileForm', () => {
  const user = mockUserList[4] // email user
  const LONG_STRING = 'asdfasdf'.repeat(11)
  const INCORRECT_NAME = '123asd'

  const INCORRECT_TG_LINKS = [
    'https://t.me/asdsd$',
    'https://t.me/asd2!',
    'https://t.me/asds%',
    'https://t.me/a-sds',
    'https://t.me/asd^s%',
    'https://t.me/a&sds%',
    'asdf',
  ]

  store.dispatch(setUser(user))

  test(`Validation`, async () => {
    render(
      <Wrappers routerEntries={[`/profile/${user.uid}/edit`]}>
        <Route path="/" element={<div />} />
        <Route path="profile/:userId" element={<Profile />} />
        <Route path="profile/:userId/edit" element={<EditProfile />} />
      </Wrappers>,
    )

    const nameInput = screen.getByLabelText('Name')
    const bioInput = screen.getByLabelText('Bio')
    const tgInput = screen.getByLabelText('Telegram link')
    const genderInput = screen.getByLabelText('Gender')

    const inputs = [nameInput, bioInput, tgInput, genderInput]

    inputs.map((input) => {
      fireEvent.change(input, { target: { value: LONG_STRING } })
    })

    await waitFor(() => expect(screen.getAllByText('Maximum 50 characters')).toHaveLength(4))

    inputs.map((input) => {
      fireEvent.change(input, { target: { value: '' } })
    })

    await waitFor(() => expect(screen.queryByText('Maximum 50 characters')).not.toBeInTheDocument())

    fireEvent.change(nameInput, { target: { value: INCORRECT_NAME } })

    await waitFor(() => expect(screen.queryByText(ValidationError.NAME_NO_SPECIAL)).toBeInTheDocument())

    INCORRECT_TG_LINKS.map((link) => {
      fireEvent.change(tgInput, { target: { value: link } })
      waitFor(() => expect(screen.queryByText(ValidationError.INVALID_TG_LINK)).toBeInTheDocument())
    })
  })

  test('File input', async () => {
    const userEvents = userEvent.setup()

    render(
      <Wrappers routerEntries={[`/profile/${user.uid}/edit`]}>
        <Route path="/" element={<div />} />
        <Route path="profile/:userId" element={<Profile />} />
        <Route path="profile/:userId/edit" element={<EditProfile />} />
      </Wrappers>,
    )

    const input = screen.getByTestId('avatarImageInput') as HTMLInputElement
    const file = new File([new Blob(['blob'])], 'image.png', { type: 'image/png' })

    await userEvents.upload(input, [file, file])
    expect(input.files).toHaveLength(1)
  })
})
