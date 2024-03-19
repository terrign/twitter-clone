import { Route } from 'react-router-dom'
import { SignUp } from '@pages/SignUp'
import { Wrappers } from '@test/utils'
import { render } from '@testing-library/react'

it('renders', async () => {
  render(
    <Wrappers>
      <Route path="/" element={<div />} />
      <Route path="/signup" element={<SignUp />} />
    </Wrappers>,
  )
})
