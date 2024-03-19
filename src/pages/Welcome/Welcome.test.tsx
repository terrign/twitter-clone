import { Route } from 'react-router-dom'
import { Welcome } from '@pages/Welcome'
import { config } from '@pages/Welcome/config'
import { authService } from '@services/Auth'
import { Wrappers } from '@test/utils'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

describe('Welcome page', () => {
  it('renders', async () => {
    render(
      <Wrappers>
        <Route path="/" element={<Welcome />} />
        <Route path="/signup" element={<div>sign_up_route</div>} />
        <Route path="/signin" element={<div>sign_in_route</div>} />
      </Wrappers>,
    )
  })

  it('Signup with google button, calls google signup', async () => {
    render(
      <Wrappers>
        <Route path="/" element={<Welcome />} />
        <Route path="/signup" element={<div>sign_up_route</div>} />
        <Route path="/signin" element={<div>sign_in_route</div>} />
      </Wrappers>,
    )

    fireEvent.click(screen.getByText(config.googleButtonLabel))

    await waitFor(() => {
      expect(authService.googleSignUp).toHaveBeenCalled()
    })
  })
})
