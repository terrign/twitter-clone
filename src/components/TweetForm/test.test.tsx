import { TweetForm } from '@components/TweetForm'
import { render } from '@testing-library/react'
import { Wrappers } from '@testUtils/index'

describe('Modal', () => {
  it('Closes on close button click', async () => {
    render(<TweetForm />, { wrapper: Wrappers })
  })
})
