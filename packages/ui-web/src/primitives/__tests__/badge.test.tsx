import { render, screen } from '@testing-library/react'
import { Badge } from '../badge'

describe('Badge', () => {
  it('renders with children', () => {
    render(<Badge>Status</Badge>)
    expect(screen.getByText('Status')).toBeInTheDocument()
  })

  it('applies color class for red', () => {
    render(<Badge color="red">Error</Badge>)
    const badge = screen.getByText('Error')
    expect(badge.className).toContain('bg-red-500/15')
  })

  it('applies color class for blue', () => {
    render(<Badge color="blue">Info</Badge>)
    const badge = screen.getByText('Info')
    expect(badge.className).toContain('bg-blue-500/15')
  })

  it('applies size class for xs', () => {
    render(<Badge size="xs">Tiny</Badge>)
    const badge = screen.getByText('Tiny')
    expect(badge.className).toContain('text-xs/4')
  })

  it('applies size class for lg', () => {
    render(<Badge size="lg">Large</Badge>)
    const badge = screen.getByText('Large')
    expect(badge.className).toContain('text-sm/6')
  })
})
