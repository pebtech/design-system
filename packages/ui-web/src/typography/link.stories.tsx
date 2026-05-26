import type { Meta, StoryObj } from '@storybook/react'
import { Link } from './link'

const meta = {
  title: 'Typography/Link',
  component: Link,
  tags: ['autodocs'],
} satisfies Meta<typeof Link>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    href: '#',
    children: 'Click me',
  },
}

export const Styled: Story = {
  args: {
    href: '#',
    children: 'Styled Link',
    className: 'text-blue-600 underline hover:text-blue-800',
  },
}
