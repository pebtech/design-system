import { render, screen } from '@testing-library/react'
import { PageBackButton } from '../../layout/page-back-button'

describe('PageBackButton', () => {
  it('renders the text', () => {
    render(<PageBackButton text="Go back" />)
    expect(screen.getByText('Go back')).toBeInTheDocument()
  })

  it('renders a clickable element', () => {
    const onClick = vi.fn()
    const { container } = render(<PageBackButton text="Back" onClick={onClick} />)
    container.firstChild?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(onClick).toHaveBeenCalled()
  })
})
