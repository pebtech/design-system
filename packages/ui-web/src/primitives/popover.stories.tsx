import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Popover, PopoverTrigger, PopoverContent } from './popover'
import { Button } from './button'

const meta = {
  title: 'Primitives/Popover',
  component: Popover,
  tags: ['autodocs'],
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="p-12 flex justify-center">
      <Popover>
        <PopoverTrigger>
          <Button>Open Popover</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="space-y-2">
            <h3 className="font-semibold text-zinc-950 dark:text-white">Popover Title</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              This is a standalone accessible popover built using React Aria.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  ),
}
