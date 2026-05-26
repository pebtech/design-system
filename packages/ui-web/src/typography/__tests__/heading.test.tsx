import { render, screen } from '@testing-library/react'
import { Heading } from '../heading'

describe('Heading', () => {
  it('renders as h1 by default', () => {
    render(<Heading>Title</Heading>)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Title')
  })

  it('renders correct heading level h2', () => {
    render(<Heading level={2}>Subtitle</Heading>)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Subtitle')
  })

  it('renders correct heading level h3', () => {
    render(<Heading level={3}>Section</Heading>)
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Section')
  })

  it('applies className', () => {
    render(<Heading className="custom-heading">Styled</Heading>)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveClass('custom-heading')
  })
})
