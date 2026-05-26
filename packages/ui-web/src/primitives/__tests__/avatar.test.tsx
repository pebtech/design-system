import { render, screen } from '@testing-library/react'
import { Avatar } from '../../primitives/avatar'

describe('Avatar', () => {
  it('renders a span with data-slot="avatar"', () => {
    const { container } = render(<Avatar />)
    const span = container.querySelector('[data-slot="avatar"]')
    expect(span).toBeInTheDocument()
    expect(span!.tagName).toBe('SPAN')
  })

  it('renders initials when provided', () => {
    render(<Avatar initials="AB" />)
    expect(screen.getByText('AB')).toBeInTheDocument()
  })

  it('renders an img when src is provided', () => {
    render(<Avatar src="/photo.jpg" alt="User photo" />)
    const img = screen.getByRole('img', { name: /user photo/i })
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/photo.jpg')
  })
})
