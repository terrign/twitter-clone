import { act } from 'react-dom/test-utils'
import { Route } from 'react-router-dom'
import { Post } from '@pages/PrivateRoot/Post'
import { tweetService } from '@services/Tweets'
import { Wrappers } from '@test/utils'
import { render, screen, waitFor } from '@testing-library/react'

describe('Post page', () => {
  it('renders', async () => {
    act(() => {
      render(
        <Wrappers routerEntries={['/post/91ed8f45-a66e-41fa-aee7-3c1eb24f1d3e']}>
          <Route path="/" element={<div />} />
          <Route path="post/:tweetId" element={<Post />} />
        </Wrappers>,
      )
    })

    expect(tweetService.getTweetById).toHaveBeenCalled()

    await waitFor(() => expect(screen.getByText(/chicken tweet/)).toBeInTheDocument())
  })
})
