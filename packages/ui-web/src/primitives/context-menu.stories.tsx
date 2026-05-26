import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from './context-menu'

const meta = {
  title: 'Primitives/ContextMenu',
  component: ContextMenu,
  tags: ['autodocs'],
} satisfies Meta<typeof ContextMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex justify-center p-24">
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="flex h-40 w-72 items-center justify-center rounded-xl border border-dashed border-zinc-300 text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
            Right-click here
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={() => console.log('Cut')}>Cut</ContextMenuItem>
          <ContextMenuItem onClick={() => console.log('Copy')}>Copy</ContextMenuItem>
          <ContextMenuItem onClick={() => console.log('Paste')}>Paste</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem onClick={() => console.log('Select All')}>Select All</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  ),
}

export const WithDestructiveItem: Story = {
  render: () => (
    <div className="flex justify-center p-24">
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="flex h-40 w-72 items-center justify-center rounded-xl border border-dashed border-zinc-300 text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
            Right-click for actions
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={() => console.log('Edit')}>Edit</ContextMenuItem>
          <ContextMenuItem onClick={() => console.log('Duplicate')}>Duplicate</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem destructive onClick={() => console.log('Delete')}>
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  ),
}

export const WithDisabledItem: Story = {
  render: () => (
    <div className="flex justify-center p-24">
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="flex h-40 w-72 items-center justify-center rounded-xl border border-dashed border-zinc-300 text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
            Right-click me
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={() => console.log('Undo')}>Undo</ContextMenuItem>
          <ContextMenuItem disabled>Redo</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem onClick={() => console.log('Copy')}>Copy</ContextMenuItem>
          <ContextMenuItem onClick={() => console.log('Paste')}>Paste</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  ),
}
