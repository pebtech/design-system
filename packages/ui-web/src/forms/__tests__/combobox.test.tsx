import { render } from '@testing-library/react'
import { Combobox, ComboboxOption, ComboboxLabel } from '../../forms/combobox'

describe('Combobox', () => {
  it('renders without crashing', () => {
    const options = ['Apple', 'Banana', 'Cherry']
    const { container } = render(
      <Combobox
        options={options}
        displayValue={(v: string | null) => v ?? ''}
        value={null}
        onChange={() => {}}
      >
        {(option: string) => (
          <ComboboxOption key={option} value={option}>
            <ComboboxLabel>{option}</ComboboxLabel>
          </ComboboxOption>
        )}
      </Combobox>
    )
    expect(container.firstChild).toBeInTheDocument()
  })
})
