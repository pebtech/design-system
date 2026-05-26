import { render } from '@testing-library/react'
import { Card } from '../../layout/card'

describe('Card', () => {
  it('renders a div', () => {
    const { container } = render(<Card>content</Card>)
    expect(container.firstChild).toBeInstanceOf(HTMLDivElement)
  })

  it('renders children', () => {
    const { getByText } = render(<Card>Card content</Card>)
    expect(getByText('Card content')).toBeInTheDocument()
  })

  it('applies outlined variant with border', () => {
    const { container } = render(<Card variant="outlined">outlined</Card>)
    expect(container.firstChild).toHaveClass('border')
  })

  it('applies custom className', () => {
    const { container } = render(<Card className="my-custom">test</Card>)
    expect(container.firstChild).toHaveClass('my-custom')
  })
})
