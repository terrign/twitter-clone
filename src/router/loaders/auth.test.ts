import { redirect } from 'react-router-dom'
import { guards } from '@router/loaders/guards'
import { Route } from '@router/types'
import { waitFor } from '@testing-library/react'

const request = { url: 'http://localhost:5173/' } as unknown as Request

jest.mock('@services/Auth', () => {
  return {
    authService: {
      updatePassword: jest.fn().mockImplementation(async (_, __) => {}),
      emailSignUp: jest.fn().mockImplementation(async (_, __) => {}),
      googleSignUp: jest.fn().mockImplementation(async () => {}),
      auth: {
        authStateReady: jest.fn().mockImplementation(async () => {}),
        currentUser: true,
      },
    },
  }
})

it('redirects to home if not authenticated', async () => {
  guards({ request, params: {} })

  await waitFor(() => {
    expect(redirect).toHaveBeenCalledWith(Route.HOME)
  })
})
