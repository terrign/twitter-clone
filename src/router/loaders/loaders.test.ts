import { redirect } from 'react-router-dom'
import { guards } from '@router/loaders/guards'
import { postLoader } from '@router/loaders/post'
import { profileLoader } from '@router/loaders/profile'
import { Route } from '@router/types'
import { waitFor } from '@testing-library/react'

describe('Router loaders', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('profileLoader() does not redirect if postid specified', async () => {
    const request = { url: 'http://localhost:5173/profile/JCSy7auPQT7MQuJPTx5V1tiJyu8o' } as unknown as Request
    profileLoader({ request, params: { userId: 'JCSy7auPQT7MQuJPTx5V1tiJyu8o' } })

    await waitFor(() => {
      expect(redirect).not.toHaveBeenCalled()
    })
  })

  it('postLoader() does not redirect if postid specified', async () => {
    const request = { url: 'http://localhost:5173/post/1233123' } as unknown as Request
    postLoader({ request, params: { tweetId: '1233123' } })

    await waitFor(() => {
      expect(redirect).not.toHaveBeenCalled()
    })
  })

  it('guards() redirects to welcome if not authenticated', async () => {
    const request = { url: 'http://localhost:5173/profile/JCSy7auPQT7MQuJPTx5V1tiJyu8o' } as unknown as Request
    guards({ request, params: {} })

    await waitFor(() => {
      expect(redirect).toHaveBeenCalledWith(Route.WELCOME)
    })
  })

  it('postLoader() redirects to home if no tweetId', async () => {
    const request = { url: 'http://localhost:5173/post/' } as unknown as Request
    postLoader({ request, params: {} })

    await waitFor(() => {
      expect(redirect).toHaveBeenCalledWith(Route.HOME)
    })
  })

  it('profileLoader() redirects to home if no profileId', async () => {
    const request = { url: 'http://localhost:5173/profile/' } as unknown as Request
    profileLoader({ request, params: {} })

    await waitFor(() => {
      expect(redirect).toHaveBeenCalledWith(Route.HOME)
    })
  })
})
