import type { Meta, StoryObj } from '@storybook/react'
import { Breadcrumb } from './breadcrumb'

const meta = {
  title: 'Navigation/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    breadcrumbs: [
      { name: 'Home', href: '#', current: false },
      { name: 'Products', href: '#', current: false },
      { name: 'Headphones', href: '#', current: true },
    ],
  },
}

export const TwoItems: Story = {
  args: {
    breadcrumbs: [
      { name: 'Dashboard', href: '#', current: false },
      { name: 'Settings', href: '#', current: true },
    ],
  },
}
