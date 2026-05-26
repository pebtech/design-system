import { render, screen } from '@testing-library/react'
import { Divider } from '../divider'

describe('Divider', () => {
  it('renders an hr element', () => {
    render(<Divider />)
    expect(screen.getByRole('presentation')).toBeInTheDocument()
    expect(screen.getByRole('presentation').tagName).toBe('HR')
  })

  it('has role="presentation"', () => {
    render(<Divider />)
    expect(screen.getByRole('presentation')).toHaveAttribute('role', 'presentation')
  })

  it('soft variant applies correct class', () => {
    render(<Divider soft />)
    const hr = screen.getByRole('presentation')
    expect(hr.className).toContain('border-zinc-950/5')
  })
})
