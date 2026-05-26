import { render } from '@testing-library/react'
import { Select } from '../../primitives/select'
import { createRef } from 'react'

describe('Select', () => {
  it('renders with data-slot="control"', () => {
    const { container } = render(
      <Select>
        <option value="a">A</option>
      </Select>
    )
    const control = container.querySelector('[data-slot="control"]')
    expect(control).toBeInTheDocument()
  })

  it('forwards ref to select element', () => {
    const ref = createRef<HTMLSelectElement>()
    render(
      <Select ref={ref}>
        <option value="a">A</option>
      </Select>
    )
    expect(ref.current).toBeInstanceOf(HTMLSelectElement)
  })
})
