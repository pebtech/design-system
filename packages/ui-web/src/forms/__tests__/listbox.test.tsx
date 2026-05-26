import { render } from '@testing-library/react'
import { Listbox, ListboxOption, ListboxLabel } from '../../forms/listbox'

describe('Listbox', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <Listbox value="apple" onChange={() => {}} placeholder="Select fruit">
        <ListboxOption value="apple">
          <ListboxLabel>Apple</ListboxLabel>
        </ListboxOption>
        <ListboxOption value="banana">
          <ListboxLabel>Banana</ListboxLabel>
        </ListboxOption>
      </Listbox>
    )
    expect(container.firstChild).toBeInTheDocument()
  })
})
