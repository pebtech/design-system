import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Combobox, ComboboxOption, ComboboxLabel } from './combobox'

type Person = { id: number; name: string }

const people: Person[] = [
  { id: 1, name: 'Alice Johnson' },
  { id: 2, name: 'Bob Smith' },
  { id: 3, name: 'Charlie Brown' },
  { id: 4, name: 'Diana Prince' },
  { id: 5, name: 'Edward Norton' },
]

const meta = {
  title: 'Forms/Combobox',
  component: Combobox,
  tags: ['autodocs'],
} satisfies Meta<typeof Combobox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<Person | null>(null)
    return (
      <div className="w-72">
        <Combobox
          options={people}
          value={selected}
          onChange={setSelected}
          displayValue={(person) => person?.name}
          placeholder="Search people..."
          aria-label="Select a person"
        >
          {(person) => (
            <ComboboxOption value={person}>
              <ComboboxLabel>{person.name}</ComboboxLabel>
            </ComboboxOption>
          )}
        </Combobox>
      </div>
    )
  },
}
