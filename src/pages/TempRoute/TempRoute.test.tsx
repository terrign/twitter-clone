import { Route } from 'react-router-dom'
import { TempRoute } from '@pages/TempRoute'
import { Wrappers } from '@test/utils'
import { render } from '@testing-library/react'

it('renders', async () => {
  render(
    <Wrappers>
      <Route path="/" element={<div />} />
      <Route path="/signup" element={<TempRoute />} />
    </Wrappers>,
  )
})
