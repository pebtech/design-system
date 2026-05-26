import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from './collapsible'

const meta = {
  title: 'Primitives/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
} satisfies Meta<typeof Collapsible>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger className="flex items-center gap-2 rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium hover:bg-zinc-50">
          {open ? '▾' : '▸'} Toggle Content
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2">
          <div className="rounded-lg border border-zinc-200 p-4 text-sm text-zinc-600">
            This is the collapsible content. It smoothly animates in and out using CSS grid-rows transitions.
          </div>
        </CollapsibleContent>
      </Collapsible>
    )
  },
}

export const DefaultOpen: Story = {
  render: () => (
    <Collapsible defaultOpen>
      <CollapsibleTrigger className="flex items-center gap-2 rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium hover:bg-zinc-50">
        Toggle Content
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2">
        <div className="rounded-lg border border-zinc-200 p-4 text-sm text-zinc-600">
          This collapsible starts open by default using the defaultOpen prop.
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
}

export const Multiple: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-md">
      {['Section A', 'Section B', 'Section C'].map((section) => (
        <Collapsible key={section}>
          <CollapsibleTrigger className="w-full flex items-center justify-between rounded-lg border border-zinc-200 px-4 py-3 text-sm font-medium hover:bg-zinc-50">
            {section}
            <span className="text-zinc-400">+</span>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-1">
            <div className="rounded-lg border border-zinc-200 p-4 text-sm text-zinc-600">
              Content for {section}. Each collapsible manages its own state independently.
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  ),
}

export const WithRichContent: Story = {
  render: () => (
    <Collapsible defaultOpen>
      <CollapsibleTrigger className="flex items-center gap-2 rounded-lg bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-100">
        📋 View Details
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2">
        <div className="rounded-lg border border-indigo-200 bg-indigo-50/50 p-4">
          <h4 className="mb-2 text-sm font-semibold text-indigo-900">Project Details</h4>
          <ul className="space-y-1 text-sm text-indigo-700">
            <li>• Status: Active</li>
            <li>• Team: 5 members</li>
            <li>• Deadline: Dec 2024</li>
            <li>• Budget: $50,000</li>
          </ul>
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
}
