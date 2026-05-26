import type { Meta, StoryObj } from '@storybook/react'
import { PageBackButton } from './page-back-button'

const meta = {
  title: 'Layout/PageBackButton',
  component: PageBackButton,
  tags: ['autodocs'],
} satisfies Meta<typeof PageBackButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    text: 'Back to Dashboard',
    onClick: () => {},
  },
}
