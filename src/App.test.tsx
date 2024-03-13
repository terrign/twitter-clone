import { render } from '@testing-library/react'
import { App } from './App'

describe('test', () => {
  it('renders', async () => {
    const { container } = render(<App />)
    expect(container).toBeInTheDocument()
  })
})
