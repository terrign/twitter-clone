import { TweetForm } from '@components/TweetForm'
import { Providers } from '@context/Providers'
import { render } from '@testing-library/react'

describe('Modal', () => {
  it('Closes on close button click', async () => {
    render(<TweetForm />, { wrapper: Providers })
  })
})
