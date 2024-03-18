import { Providers } from '@context/Providers'
import { PrivateRoot } from '@pages/PrivateRoot'
import { render } from '@testing-library/react'

describe('Modal', () => {
  it('asd', () => {
    render(<PrivateRoot />, { wrapper: Providers })
  })
})
