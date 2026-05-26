import { render } from '@testing-library/react'
import { Textarea } from '../../primitives/textarea'
import { createRef } from 'react'

describe('Textarea', () => {
  it('renders with data-slot="control"', () => {
    const { container } = render(<Textarea />)
    const control = container.querySelector('[data-slot="control"]')
    expect(control).toBeInTheDocument()
  })

  it('forwards ref to textarea element', () => {
    const ref = createRef<HTMLTextAreaElement>()
    render(<Textarea ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement)
  })
})
