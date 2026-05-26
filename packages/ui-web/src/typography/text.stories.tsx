import type { Meta, StoryObj } from '@storybook/react'
import { Text } from './text'

const meta = {
  title: 'Typography/Text',
  component: Text,
  tags: ['autodocs'],
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Default text content',
  },
}

export const Secondary: Story = {
  args: {
    color: 'secondary',
    children: 'Secondary text content',
  },
}

export const Muted: Story = {
  args: {
    color: 'muted',
    children: 'Muted text content',
  },
}

export const Bold: Story = {
  args: {
    weight: 'bold',
    children: 'Bold text content',
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small text content',
  },
}
