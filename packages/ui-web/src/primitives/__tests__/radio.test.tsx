import { render } from '@testing-library/react'
import { RadioGroup, Radio } from '../../primitives/radio'

describe('Radio', () => {
  it('renders RadioGroup with data-slot="control"', () => {
    const { container } = render(
      <RadioGroup value="a" onChange={() => {}}>
        <Radio value="a" />
      </RadioGroup>
    )
    const control = container.querySelector('[data-slot="control"]')
    expect(control).toBeInTheDocument()
  })

  it('renders Radio with data-slot="control"', () => {
    const { container } = render(
      <RadioGroup value="a" onChange={() => {}}>
        <Radio value="a" />
      </RadioGroup>
    )
    const controls = container.querySelectorAll('[data-slot="control"]')
    // RadioGroup + Radio both have data-slot="control"
    expect(controls.length).toBeGreaterThanOrEqual(2)
  })
})
