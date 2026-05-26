import { render } from '@testing-library/react'
import { ButtonGroup } from '../../primitives/button-group'

describe('ButtonGroup', () => {
  it('renders a div', () => {
    const { container } = render(<ButtonGroup>content</ButtonGroup>)
    expect(container.firstChild).toBeInstanceOf(HTMLDivElement)
  })

  it('applies custom className', () => {
    const { container } = render(<ButtonGroup className="my-class">content</ButtonGroup>)
    expect(container.firstChild).toHaveClass('my-class')
  })

  it('renders children', () => {
    const { getByText } = render(<ButtonGroup><span>child</span></ButtonGroup>)
    expect(getByText('child')).toBeInTheDocument()
  })
})
