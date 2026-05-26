import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './card'
import { Heading } from '../typography/heading'
import { Text } from '../typography/text'

const meta = {
  title: 'Layout/Card',
  component: Card,
  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'This is a default card with medium padding, surface background, and shadow.',
  },
}

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: 'This is an elevated card with larger padding and a prominent shadow.',
  },
}

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: 'This is an outlined card with a visible border and no shadow.',
  },
}

export const Minimal: Story = {
  args: {
    variant: 'minimal',
    children: 'This is a minimal card with a secondary background and no shadow or border.',
  },
}

export const WithHeading: Story = {
  render: () => (
    <Card variant="default">
      <Heading level={3}>Card Title</Heading>
      <Text className="mt-2">
        This card contains a heading and descriptive text as children. It
        demonstrates composing the Card with typography components.
      </Text>
    </Card>
  ),
}
