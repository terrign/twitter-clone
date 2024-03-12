import { Modal } from '@components/UI/Modal'
import { useBooleanState } from '@hooks/useBooleanState'
import { fireEvent, render, screen } from '@testing-library/react'
import { Wrappers } from '@testUtils/index'

describe('Modal', () => {
  const TestComponent = () => {
    const [open, , openModal, closeModal] = useBooleanState(false)

    return (
      <div>
        <button data-testid="test" onClick={openModal}></button>
        <Modal header="header" onClose={closeModal} open={open} />
      </div>
    )
  }

  beforeEach(() => {
    render(<TestComponent />, { wrapper: Wrappers })
  })

  it('Closes on close button click', async () => {
    expect(screen.queryByText(/header/)).not.toBeInTheDocument()
    fireEvent.click(screen.getByTestId('test'))
    expect(screen.getByText(/header/)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'close modal' }))
    expect(screen.queryByText(/header/)).not.toBeInTheDocument()
  })

  it('Closes esc press', async () => {
    fireEvent.click(screen.getByTestId('test'))
    fireEvent.keyDown(document.body, { key: 'Escape' })
    expect(screen.queryByText(/header/)).not.toBeInTheDocument()
    fireEvent.click(screen.getByTestId('test'))
    fireEvent.keyDown(document.body, { key: 'Enter' })
    expect(screen.queryByText(/header/)).toBeInTheDocument()
  })
})
