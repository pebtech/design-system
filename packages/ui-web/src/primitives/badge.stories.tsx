import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './badge'

const meta = {
  title: 'Primitives/Badge',
  component: Badge,
  tags: ['autodocs'],
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    color: 'zinc',
    children: 'Badge',
  },
}

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Badge color="red">Red</Badge>
      <Badge color="green">Green</Badge>
      <Badge color="blue">Blue</Badge>
      <Badge color="indigo">Indigo</Badge>
    </div>
  ),
}

export const SizeXs: Story = {
  args: {
    size: 'xs',
    children: 'Extra Small',
  },
}

export const SizeSm: Story = {
  args: {
    size: 'sm',
    children: 'Small',
  },
}

export const SizeBase: Story = {
  args: {
    size: 'base',
    children: 'Base',
  },
}

export const SizeLg: Story = {
  args: {
    size: 'lg',
    children: 'Large',
  },
}
