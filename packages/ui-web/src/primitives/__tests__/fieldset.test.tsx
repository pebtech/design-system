import { render, screen } from '@testing-library/react'
import { Fieldset, Legend, Field, Label } from '../../primitives/fieldset'

describe('Fieldset', () => {
  it('renders a fieldset element', () => {
    const { container } = render(<Fieldset><div>content</div></Fieldset>)
    expect(container.querySelector('fieldset')).toBeInTheDocument()
  })
})

describe('Legend', () => {
  it('renders legend text', () => {
    render(
      <Fieldset>
        <Legend>My Legend</Legend>
      </Fieldset>
    )
    expect(screen.getByText('My Legend')).toBeInTheDocument()
  })
})

describe('Label', () => {
  it('renders with data-slot="label" inside a Field', () => {
    const { container } = render(
      <Field>
        <Label>My Label</Label>
      </Field>
    )
    const label = container.querySelector('[data-slot="label"]')
    expect(label).toBeInTheDocument()
    expect(screen.getByText('My Label')).toBeInTheDocument()
  })
})
