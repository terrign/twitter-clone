import { Route } from 'react-router-dom'
import { PrivateRoot } from '@pages/PrivateRoot'
import { Wrappers } from '@test/utils'
import { render } from '@testing-library/react'

describe('PrivateRoot', () => {
  it('renders', () => {
    render(
      <Wrappers>
        <Route path="/" element={<PrivateRoot />} />
      </Wrappers>,
    )
  })
})
