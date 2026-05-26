import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Tabs } from './tabs'

const meta = {
  title: 'Primitives/Tabs',
  component: Tabs,
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Underlined: Story = {
  render: () => {
    const [active, setActive] = useState('overview')
    return (
      <Tabs
        tabs={[
          { id: 'overview', label: 'Overview' },
          { id: 'features', label: 'Features' },
          { id: 'pricing', label: 'Pricing' },
          { id: 'faq', label: 'FAQ' },
        ]}
        activeTab={active}
        onChange={setActive}
      />
    )
  },
}

export const Segmented: Story = {
  render: () => {
    const [active, setActive] = useState('all')
    return (
      <div style={{ width: '400px' }}>
        <Tabs
          tabs={[
            { id: 'all', label: 'All' },
            { id: 'active', label: 'Active' },
            { id: 'inactive', label: 'Inactive' },
          ]}
          activeTab={active}
          onChange={setActive}
          variant="segmented"
        />
      </div>
    )
  },
}

export const WithCounts: Story = {
  render: () => {
    const [active, setActive] = useState('all')
    return (
      <Tabs
        tabs={[
          { id: 'all', label: 'All', count: 142 },
          { id: 'published', label: 'Published', count: 98 },
          { id: 'drafts', label: 'Drafts', count: 32 },
          { id: 'archived', label: 'Archived', count: 12 },
        ]}
        activeTab={active}
        onChange={setActive}
      />
    )
  },
}

export const SegmentedWithCounts: Story = {
  render: () => {
    const [active, setActive] = useState('week')
    return (
      <div style={{ width: '400px' }}>
        <Tabs
          tabs={[
            { id: 'day', label: 'Day', count: 5 },
            { id: 'week', label: 'Week', count: 23 },
            { id: 'month', label: 'Month', count: 89 },
          ]}
          activeTab={active}
          onChange={setActive}
          variant="segmented"
        />
      </div>
    )
  },
}

export const TwoTabs: Story = {
  render: () => {
    const [active, setActive] = useState('code')
    return (
      <Tabs
        tabs={[
          { id: 'code', label: 'Code' },
          { id: 'preview', label: 'Preview' },
        ]}
        activeTab={active}
        onChange={setActive}
      />
    )
  },
}

export const ManyTabs: Story = {
  render: () => {
    const [active, setActive] = useState('tab-1')
    return (
      <Tabs
        tabs={Array.from({ length: 8 }, (_, i) => ({
          id: `tab-${i + 1}`,
          label: `Tab ${i + 1}`,
        }))}
        activeTab={active}
        onChange={setActive}
      />
    )
  },
}
