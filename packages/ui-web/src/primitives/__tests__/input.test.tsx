import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { Input } from '../input'

describe('Input', () => {
  it('renders an input element', () => {
    render(<Input aria-label="test input" />)
    expect(screen.getByRole('textbox', { name: /test input/i })).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLInputElement>()
    render(<Input ref={ref} aria-label="ref input" />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('applies className', () => {
    render(<Input className="custom-class" aria-label="styled" />)
    // The className is applied to both the wrapper span and the inner input.
    // Check that the wrapper span includes the custom class.
    const input = screen.getByRole('textbox', { name: /styled/i })
    const wrapper = input.closest('[data-slot="control"]')
    expect(wrapper).toHaveClass('custom-class')
  })
})
