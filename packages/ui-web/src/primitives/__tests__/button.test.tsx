import { render, screen } from '@testing-library/react'
import { Button } from '../button'

describe('Button', () => {
  it('renders with children text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('applies variant classes for preset="default" (primary)', () => {
    render(<Button preset="default">Primary</Button>)
    const button = screen.getByRole('button', { name: /primary/i })
    // primary preset applies primary variant which includes brand bg styling
    expect(button.className).toContain('text-white')
  })

  it('applies variant classes for preset="destructive"', () => {
    render(<Button preset="destructive">Delete</Button>)
    const button = screen.getByRole('button', { name: /delete/i })
    expect(button.className).toContain('bg-red-600')
  })

  it('renders as link when href is provided', () => {
    render(<Button href="/test">Go</Button>)
    const link = screen.getByRole('link', { name: /go/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/test')
  })

  it('renders disabled state', () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByRole('button', { name: /disabled/i })
    expect(button).toBeDisabled()
    expect(button.className).toContain('opacity-50')
  })
})
