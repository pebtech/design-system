import { render, screen } from '@testing-library/react'
import { Text } from '../text'

describe('Text', () => {
  it('renders as <p> by default', () => {
    render(<Text>Hello</Text>)
    const el = screen.getByText('Hello')
    expect(el.tagName).toBe('P')
  })

  it('renders with custom "as" prop', () => {
    render(<Text as="span">Inline</Text>)
    const el = screen.getByText('Inline')
    expect(el.tagName).toBe('SPAN')
  })

  it('applies color class', () => {
    render(<Text color="error">Oops</Text>)
    const el = screen.getByText('Oops')
    expect(el.className).toContain('text-error')
  })

  it('applies weight class', () => {
    render(<Text weight="bold">Heavy</Text>)
    const el = screen.getByText('Heavy')
    expect(el.className).toContain('font-bold')
  })
})
