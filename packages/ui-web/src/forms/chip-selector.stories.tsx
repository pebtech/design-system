import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { ChipSelector } from './chip-selector'

const meta = {
  title: 'Forms/ChipSelector',
  component: ChipSelector,
  tags: ['autodocs'],
} satisfies Meta<typeof ChipSelector>

export default meta
type Story = StoryObj<typeof meta>

const options = ['Startup', 'SaaS', 'Enterprise', 'Freelance', 'Agency']

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('Startup')
    return (
      <ChipSelector
        value={value}
        onChange={setValue}
        options={options}
      />
    )
  },
}

export const MultiSelect: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['SaaS', 'Enterprise'])
    return (
      <ChipSelector
        value={value}
        onChange={setValue}
        options={options}
        multiple
      />
    )
  },
}
