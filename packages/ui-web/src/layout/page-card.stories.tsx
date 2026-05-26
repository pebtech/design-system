import type { Meta, StoryObj } from '@storybook/react'
import { PageCard } from './page-card'
import { Heading } from '../typography/heading'
import { Text } from '../typography/text'

const meta = {
  title: 'Layout/PageCard',
  component: PageCard,
  tags: ['autodocs'],
} satisfies Meta<typeof PageCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <PageCard>
      <Heading level={2}>Page Title</Heading>
      <Text className="mt-4">
        This is the main content area of the page card. It provides a
        constrained-width container with padding, background, and optional
        border and shadow styling suitable for top-level page sections.
      </Text>
    </PageCard>
  ),
}
