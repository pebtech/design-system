import { render, screen } from '@testing-library/react'
import { Checkbox } from '../checkbox'

describe('Checkbox', () => {
  it('renders without crashing', () => {
    render(<Checkbox />)
    // Headless UI Checkbox renders with role="checkbox"
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  it('has correct role', () => {
    render(<Checkbox />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeInTheDocument()
  })
})
