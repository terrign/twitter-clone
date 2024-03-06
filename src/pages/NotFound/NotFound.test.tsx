import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { NotFound } from '.'

describe('test', () => {
  it('renders', async () => {
    render(<NotFound />)
    expect(screen.getByText(/Oops/gi)).toBeInTheDocument()
  })
})
