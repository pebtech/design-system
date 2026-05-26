import { render, screen } from '@testing-library/react'
import { EmptyState } from '../../data-display/empty-state'

describe('EmptyState', () => {
  it('renders without crashing', () => {
    const { container } = render(<EmptyState title="No items" />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('renders title text', () => {
    render(<EmptyState title="Nothing found" />)
    expect(screen.getByText('Nothing found')).toBeInTheDocument()
  })

  it('renders description when provided', () => {
    render(<EmptyState title="Empty" description="Try a different search" />)
    expect(screen.getByText('Try a different search')).toBeInTheDocument()
  })
})
