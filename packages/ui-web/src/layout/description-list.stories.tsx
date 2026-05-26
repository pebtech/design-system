import type { Meta, StoryObj } from '@storybook/react'
import { DescriptionList, DescriptionTerm, DescriptionDetails } from './description-list'

const meta = {
  title: 'Layout/DescriptionList',
  component: DescriptionList,
  tags: ['autodocs'],
} satisfies Meta<typeof DescriptionList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <DescriptionList>
      <DescriptionTerm>Full Name</DescriptionTerm>
      <DescriptionDetails>Jane Doe</DescriptionDetails>

      <DescriptionTerm>Email Address</DescriptionTerm>
      <DescriptionDetails>jane.doe@example.com</DescriptionDetails>

      <DescriptionTerm>Role</DescriptionTerm>
      <DescriptionDetails>Administrator</DescriptionDetails>

      <DescriptionTerm>Status</DescriptionTerm>
      <DescriptionDetails>Active</DescriptionDetails>
    </DescriptionList>
  ),
}
