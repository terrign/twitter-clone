import { act } from 'react-dom/test-utils'
import { TweetList } from '@components/TweetList'
import { Providers } from '@context/Providers'
import { render } from '@testing-library/react'

describe('TweetList', () => {
  it('Closes on close button click', async () => {
    act(() => {
      render(<TweetList tweets={[]} />, { wrapper: Providers })
    })
  })
})
