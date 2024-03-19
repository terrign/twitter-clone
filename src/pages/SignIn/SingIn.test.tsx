import { Route } from 'react-router-dom'
import { SignIn } from '@pages/SignIn'
import { Wrappers } from '@test/utils'
import { render } from '@testing-library/react'

it('renders', async () => {
  render(
    <Wrappers>
      <Route path="/" element={<div />} />
      <Route path="/signin" element={<SignIn />} />
    </Wrappers>,
  )
})
