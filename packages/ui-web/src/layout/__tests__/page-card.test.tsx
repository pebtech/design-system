import { render } from '@testing-library/react'
import { PageCard } from '../../layout/page-card'

describe('PageCard', () => {
  it('renders without crashing', () => {
    const { container } = render(<PageCard>content</PageCard>)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('renders children', () => {
    const { getByText } = render(<PageCard>Page content</PageCard>)
    expect(getByText('Page content')).toBeInTheDocument()
  })
})
