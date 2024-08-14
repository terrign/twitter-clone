import { act } from 'react-dom/test-utils'
import { Route } from 'react-router-dom'
import { Home } from '@pages/PrivateRoot/Home'
import { Wrappers } from '@test/utils'
import { render } from '@testing-library/react'

describe('Home page', () => {
  it('renders', async () => {
    act(() => {
      render(
        <Wrappers routerEntries={['/home']}>
          <Route path="/" element={<div />} />
          <Route path="/home" element={<Home />} />
        </Wrappers>,
      )
    })
  })
})
