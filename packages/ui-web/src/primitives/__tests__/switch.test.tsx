import { render } from '@testing-library/react'
import { Switch } from '../../primitives/switch'

describe('Switch', () => {
  it('renders with data-slot="control"', () => {
    const { container } = render(<Switch />)
    const control = container.querySelector('[data-slot="control"]')
    expect(control).toBeInTheDocument()
  })

  it('renders a button role', () => {
    const { getByRole } = render(<Switch />)
    expect(getByRole('switch')).toBeInTheDocument()
  })
})
