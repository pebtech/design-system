import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Toggle } from './toggle'

const meta = {
  title: 'Primitives/Toggle',
  component: Toggle,
  tags: ['autodocs'],
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Toggle',
  },
}

export const CheckedByDefault: Story = {
  args: {
    defaultSelected: true,
    children: 'Active Toggle',
  },
}

export const Disabled: Story = {
  args: {
    isDisabled: true,
    children: 'Disabled Toggle',
  },
}
