import type { Meta, StoryObj } from '@storybook/react'
import { Divider } from './divider'

const meta = {
  title: 'Primitives/Divider',
  component: Divider,
  tags: ['autodocs'],
} satisfies Meta<typeof Divider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div style={{ padding: '16px' }}>
      <p>Content above</p>
      <Divider />
      <p>Content below</p>
    </div>
  ),
}

export const Soft: Story = {
  render: () => (
    <div style={{ padding: '16px' }}>
      <p>Content above</p>
      <Divider soft />
      <p>Content below</p>
    </div>
  ),
}
