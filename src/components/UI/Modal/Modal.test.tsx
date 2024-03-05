import { Modal } from '@components/UI/Modal'
import { render, screen } from '@testing-library/react'

describe('Modal', () => {
  it('renders', async () => {
    render(<Modal header="header" onClose={() => {}} open={true} />)
    expect(screen.getByText(/header/)).toBeInTheDocument()
  })
})
