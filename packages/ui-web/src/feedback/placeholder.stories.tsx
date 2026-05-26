import type { Meta, StoryObj } from '@storybook/react'
import { Placeholder } from './placeholder'
import { Button } from '../primitives/button'

const meta = {
  title: 'Feedback/Placeholder',
  component: Placeholder,
  tags: ['autodocs'],
} satisfies Meta<typeof Placeholder>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Coming Soon',
    description: 'This feature is currently under development and will be available shortly.',
  },
}

export const WithIcon: Story = {
  args: {
    title: 'No Notifications',
    description: 'You are all caught up. Check back later for new updates.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-zinc-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
}

export const WithChildren: Story = {
  args: {
    title: 'Empty Inbox',
    description: 'There are no messages to display right now.',
    children: (
      <Button className="mt-4" preset="secondary">
        Compose Message
      </Button>
    ),
  },
}
