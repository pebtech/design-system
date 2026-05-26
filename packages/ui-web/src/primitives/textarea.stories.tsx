import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from './textarea'

const meta = {
  title: 'Primitives/Textarea',
  component: Textarea,
  tags: ['autodocs'],
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div style={{ width: '360px' }}>
      <Textarea {...args} />
    </div>
  ),
}

export const WithPlaceholder: Story = {
  render: () => (
    <div style={{ width: '360px' }}>
      <Textarea placeholder="Enter your message here..." />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div style={{ width: '360px' }}>
      <Textarea disabled placeholder="This textarea is disabled" />
    </div>
  ),
}

export const WithDefaultValue: Story = {
  render: () => (
    <div style={{ width: '360px' }}>
      <Textarea defaultValue="This is some pre-filled content that the user can edit." />
    </div>
  ),
}

export const NonResizable: Story = {
  render: () => (
    <div style={{ width: '360px' }}>
      <Textarea resizable={false} placeholder="This textarea cannot be resized" />
    </div>
  ),
}

export const WithRows: Story = {
  render: () => (
    <div style={{ width: '360px' }}>
      <Textarea rows={8} placeholder="This textarea has 8 rows" />
    </div>
  ),
}

export const FullWidth: Story = {
  render: () => (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <Textarea placeholder="Full width textarea" rows={4} />
    </div>
  ),
}
