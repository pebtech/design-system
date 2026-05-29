import type { Meta, StoryObj } from '@storybook/react'
import { Heading, Subheading } from './heading'

const meta = {
  title: 'Typography/Heading',
  component: Heading,
  tags: ['autodocs'],
} satisfies Meta<typeof Heading>

export default meta
type Story = StoryObj<typeof meta>

export const TypeScale: Story = {
  render: () => (
    <div className="max-w-2xl space-y-8">
      <div>
        <p className="mb-4 text-xs font-medium uppercase tracking-wide text-tertiary">Headings</p>
        <div className="space-y-4">
          <Heading level={1}>Heading level 1</Heading>
          <Heading level={2}>Heading level 2</Heading>
          <Heading level={3}>Heading level 3</Heading>
          <Heading level={4}>Heading level 4</Heading>
          <Heading level={5}>Heading level 5</Heading>
          <Heading level={6}>Heading level 6</Heading>
        </div>
      </div>
      <div>
        <p className="mb-4 text-xs font-medium uppercase tracking-wide text-tertiary">Subheadings</p>
        <div className="space-y-4">
          <Subheading level={1}>Subheading level 1</Subheading>
          <Subheading level={2}>Subheading level 2</Subheading>
          <Subheading level={3}>Subheading level 3</Subheading>
          <Subheading level={4}>Subheading level 4</Subheading>
        </div>
      </div>
    </div>
  ),
}

export const H1: Story = {
  args: {
    level: 1,
    children: 'Heading Level 1',
  },
}

export const H2: Story = {
  args: {
    level: 2,
    children: 'Heading Level 2',
  },
}

export const H3: Story = {
  args: {
    level: 3,
    children: 'Heading Level 3',
  },
}

export const H4: Story = {
  args: {
    level: 4,
    children: 'Heading Level 4',
  },
}
