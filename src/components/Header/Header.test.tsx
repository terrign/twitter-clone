import { Route } from 'react-router-dom'
import { Header } from '@components/Header'
import { Wrappers } from '@test/utils'
import { render, screen } from '@testing-library/react'

describe('header', () => {
  it('Has theme toggler on home page', async () => {
    render(
      <Wrappers routerEntries={[`/home`]}>
        <Route path="/" element={<div />} />
        <Route path="/home" element={<Header />} />
      </Wrappers>,
    )

    expect(screen.getByLabelText('theme toggler')).toBeInTheDocument()
  })

  it(`Hasn't theme toggler on not home page`, async () => {
    render(
      <Wrappers routerEntries={[`/profile`]}>
        <Route path="/" element={<div />} />
        <Route path="/profile" element={<div />} />
        <Route path="/home" element={<Header />} />
      </Wrappers>,
    )

    expect(screen.queryByLabelText('theme toggler')).not.toBeInTheDocument()
  })
})
