import { TweetForm } from '@components/TweetForm'
import { Providers } from '@context/Providers'
import { render } from '@testing-library/react'

describe('Modal', async () => {
  it('Closes on close button click', async () => {
    await Promise.resolve(() => setTimeout(() => {}, 10000))
    render(<TweetForm />, { wrapper: Providers })
  })
})
