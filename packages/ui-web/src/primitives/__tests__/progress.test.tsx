import { render, screen } from '@testing-library/react'
import { Progress } from '../../primitives/progress'

describe('Progress', () => {
  it('renders without crashing', () => {
    const { container } = render(<Progress value={50} />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('renders inner bar with default indigo color class', () => {
    const { container } = render(<Progress value={50} />)
    const bar = container.querySelector('.bg-indigo-600')
    expect(bar).toBeInTheDocument()
  })

  it('applies green color class', () => {
    const { container } = render(<Progress value={50} color="green" />)
    const bar = container.querySelector('.bg-green-600')
    expect(bar).toBeInTheDocument()
  })

  it('has role="progressbar"', () => {
    render(<Progress value={50} />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('sets aria-valuenow to current value', () => {
    render(<Progress value={42} />)
    const progressbar = screen.getByRole('progressbar')
    expect(progressbar).toHaveAttribute('aria-valuenow', '42')
  })

  it('sets aria-valuemin to 0', () => {
    render(<Progress value={50} />)
    const progressbar = screen.getByRole('progressbar')
    expect(progressbar).toHaveAttribute('aria-valuemin', '0')
  })

  it('sets aria-valuemax to 100 by default', () => {
    render(<Progress value={50} />)
    const progressbar = screen.getByRole('progressbar')
    expect(progressbar).toHaveAttribute('aria-valuemax', '100')
  })

  it('sets aria-valuemax to custom max value', () => {
    render(<Progress value={3} max={10} />)
    const progressbar = screen.getByRole('progressbar')
    expect(progressbar).toHaveAttribute('aria-valuemax', '10')
  })

  it('supports aria-label', () => {
    render(<Progress value={50} aria-label="Upload progress" />)
    const progressbar = screen.getByRole('progressbar')
    expect(progressbar).toHaveAttribute('aria-label', 'Upload progress')
  })

  it('clamps percentage to 0 when value is negative', () => {
    const { container } = render(<Progress value={-10} />)
    const bar = container.querySelector('.bg-indigo-600')
    expect(bar).toHaveStyle({ transform: 'translateX(-100%)' })
  })

  it('clamps percentage to 100 when value exceeds max', () => {
    const { container } = render(<Progress value={200} max={100} />)
    const bar = container.querySelector('.bg-indigo-600')
    expect(bar).toHaveStyle({ transform: 'translateX(-0%)' })
  })

  it('renders all color variants', () => {
    const colors = ['indigo', 'green', 'red', 'amber', 'blue', 'zinc', 'cyan', 'purple', 'brand'] as const
    colors.forEach((color) => {
      const { container } = render(<Progress value={50} color={color} />)
      expect(container.firstChild).toBeInTheDocument()
    })
  })

  it('accepts custom className', () => {
    render(<Progress value={50} className="h-4" />)
    const progressbar = screen.getByRole('progressbar')
    expect(progressbar.className).toContain('h-4')
  })
})
