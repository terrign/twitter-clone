import { Providers } from '@context/Providers'
import { EditProfile } from '@pages/PrivateRoot/EditProfile'
import { render } from '@testing-library/react'

describe('EditProfile', () => {
  it('Closes on close button click', () => {
    render(<EditProfile />, { wrapper: Providers })
  })
})
