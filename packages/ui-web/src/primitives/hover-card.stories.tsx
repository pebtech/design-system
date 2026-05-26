import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { HoverCard, HoverCardTrigger, HoverCardContent } from './hover-card'
import { Button } from './button'

const meta = {
  title: 'Primitives/HoverCard',
  component: HoverCard,
  tags: ['autodocs'],
} satisfies Meta<typeof HoverCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex justify-center p-24">
      <HoverCard>
        <HoverCardTrigger>
          <Button preset="outline">Hover me</Button>
        </HoverCardTrigger>
        <HoverCardContent>
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-zinc-950 dark:text-white">@username</h4>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Software developer building beautiful interfaces. Joined in 2020.
            </p>
            <div className="flex gap-4 text-xs text-zinc-500 dark:text-zinc-400">
              <span><strong className="text-zinc-950 dark:text-white">120</strong> Following</span>
              <span><strong className="text-zinc-950 dark:text-white">3.4k</strong> Followers</span>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
}

export const WithCustomPlacement: Story = {
  render: () => (
    <div className="flex justify-center p-24">
      <HoverCard>
        <HoverCardTrigger>
          <Button preset="outline">Hover (top placement)</Button>
        </HoverCardTrigger>
        <HoverCardContent placement="top">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-zinc-950 dark:text-white">Profile Card</h4>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              This card appears above the trigger element.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
}

export const WithCustomDelay: Story = {
  render: () => (
    <div className="flex justify-center p-24">
      <HoverCard openDelay={100} closeDelay={500}>
        <HoverCardTrigger>
          <Button preset="outline">Quick open, slow close</Button>
        </HoverCardTrigger>
        <HoverCardContent>
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-zinc-950 dark:text-white">Quick Open</h4>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              This card opens quickly (100ms) and stays visible longer on leave (500ms).
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
}

export const OnInlineText: Story = {
  render: () => (
    <div className="p-24">
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Check out the profile of{' '}
        <HoverCard>
          <HoverCardTrigger>
            <a href="#" className="font-medium text-blue-600 underline dark:text-blue-400">
              @johndoe
            </a>
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-zinc-950 dark:text-white">John Doe</h4>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Full-stack developer and open source enthusiast.
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>{' '}
        for more details.
      </p>
    </div>
  ),
}
