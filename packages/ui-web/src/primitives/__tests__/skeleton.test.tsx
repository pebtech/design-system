import { render } from '@testing-library/react'
import { Skeleton } from '../../primitives/skeleton'

describe('Skeleton', () => {
  it('renders a div', () => {
    const { container } = render(<Skeleton />)
    expect(container.firstChild).toBeInstanceOf(HTMLDivElement)
  })

  it('has animate-pulse class', () => {
    const { container } = render(<Skeleton />)
    expect(container.firstChild).toHaveClass('animate-pulse')
  })

  it('applies custom className', () => {
    const { container } = render(<Skeleton className="w-32 h-4" />)
    expect(container.firstChild).toHaveClass('w-32')
    expect(container.firstChild).toHaveClass('h-4')
  })
})
