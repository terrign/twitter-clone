import { SignInForm } from '@components/SignInForm'
import { Providers } from '@context/Providers'
import { render } from '@testing-library/react'

describe('TweetCard', () => {
  it('Closes on close button click', async () => {
    render(<SignInForm />, { wrapper: Providers })
  })
})
