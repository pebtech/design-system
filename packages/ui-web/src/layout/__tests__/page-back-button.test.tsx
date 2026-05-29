import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PageBackButton } from '../../layout/page-back-button'

describe('PageBackButton', () => {
  it('renders the text', () => {
    render(<PageBackButton text="Go back" onClick={() => {}} />)
    expect(screen.getByText('Go back')).toBeInTheDocument()
  })

  it('renders a button that calls onClick', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<PageBackButton text="Back" onClick={onClick} />)
    await user.click(screen.getByRole('button', { name: 'Back' }))
    expect(onClick).toHaveBeenCalled()
  })

  it('renders a link when href is provided', () => {
    render(<PageBackButton text="Back" href="/dashboard" />)
    expect(screen.getByRole('link', { name: 'Back' })).toHaveAttribute('href', '/dashboard')
  })

  it('uses sr-only label when iconOnly', () => {
    render(<PageBackButton text="Back to home" iconOnly onClick={() => {}} />)
    const button = screen.getByRole('button', { name: 'Back to home' })
    expect(button).toBeInTheDocument()
    expect(button.querySelector('.sr-only')).toHaveTextContent('Back to home')
  })

  it('applies appearance styles', () => {
    render(
      <PageBackButton text="Back" appearance="outline" onClick={() => {}} />,
    )
    expect(screen.getByRole('button')).toHaveClass('border')
  })
})
