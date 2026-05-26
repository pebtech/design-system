import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './button'

const meta = {
  title: 'Primitives/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Button',
  },
}

export const Secondary: Story = {
  args: {
    preset: 'secondary',
    children: 'Secondary',
  },
}

export const Ghost: Story = {
  args: {
    preset: 'ghost',
    children: 'Ghost',
  },
}

export const Outline: Story = {
  args: {
    preset: 'outline',
    children: 'Outline',
  },
}

export const Destructive: Story = {
  args: {
    preset: 'destructive',
    children: 'Delete',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
}

export const WithIcon: Story = {
  args: {
    children: <span>Save</span>,
  },
}

export const Small: Story = {
  args: {
    variants: { size: 'sm' },
    children: 'Small',
  },
}

export const Large: Story = {
  args: {
    variants: { size: 'lg' },
    children: 'Large',
  },
}

export const ExtraLarge: Story = {
  args: {
    variants: { size: 'xl' },
    children: 'Extra Large',
  },
}
