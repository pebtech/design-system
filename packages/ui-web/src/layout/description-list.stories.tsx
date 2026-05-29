import type { Meta, StoryObj } from '@storybook/react'
import {
  DescriptionList,
  DescriptionListItem,
} from './description-list'
import { Heading } from '../typography/heading'

const meta = {
  title: 'Layout/DescriptionList',
  component: DescriptionList,
  tags: ['autodocs'],
  parameters: {
    canvas: 'default',
  },
} satisfies Meta<typeof DescriptionList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="max-w-lg space-y-6">
      <Heading level={3}>Account</Heading>
      <DescriptionList>
        <DescriptionListItem term="Full name">Jane Doe</DescriptionListItem>
        <DescriptionListItem term="Email">jane.doe@example.com</DescriptionListItem>
        <DescriptionListItem term="Role">Administrator</DescriptionListItem>
        <DescriptionListItem term="Status">
          <span className="inline-flex items-center rounded-full bg-successBg px-2 py-0.5 text-xs font-medium text-success">
            Active
          </span>
        </DescriptionListItem>
      </DescriptionList>
    </div>
  ),
}

export const Plain: Story = {
  render: () => (
    <DescriptionList variant="plain" className="max-w-lg rounded-xl border border-border">
      <DescriptionListItem term="Plan">Professional</DescriptionListItem>
      <DescriptionListItem term="Billing cycle">Monthly</DescriptionListItem>
      <DescriptionListItem term="Next invoice">June 1, 2026</DescriptionListItem>
    </DescriptionList>
  ),
}
