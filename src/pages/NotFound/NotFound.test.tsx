import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { NotFound } from '.'

describe('test', () => {
  it('renders', async () => {
    render(
      <MemoryRouter initialEntries={['/asdfasdfasdf']}>
        <NotFound />
      </MemoryRouter>,
    )

    expect(screen.getByText(/Oops/i)).toBeInTheDocument()
  })
})
