import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Listbox, ListboxOption, ListboxLabel } from './listbox'

type Status = { id: number; label: string }

const statuses: Status[] = [
  { id: 1, label: 'Active' },
  { id: 2, label: 'Paused' },
  { id: 3, label: 'Closed' },
  { id: 4, label: 'Archived' },
]

const meta = {
  title: 'Forms/Listbox',
  component: Listbox,
  tags: ['autodocs'],
} satisfies Meta<typeof Listbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<Status>(statuses[0])
    return (
      <div className="w-72">
        <Listbox value={selected} onChange={setSelected} aria-label="Select status">
          {statuses.map((status) => (
            <ListboxOption key={status.id} value={status}>
              <ListboxLabel>{status.label}</ListboxLabel>
            </ListboxOption>
          ))}
        </Listbox>
      </div>
    )
  },
}
