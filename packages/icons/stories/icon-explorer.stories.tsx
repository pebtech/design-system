import type { Meta, StoryObj } from '@storybook/react'
import { IconExplorer } from './IconExplorer'

const meta = {
  title: 'Icons/Explorer',
  component: IconExplorer,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof IconExplorer>

export default meta
type Story = StoryObj<typeof meta>

export const Explorer: Story = {
  render: () => (
    <div className="p-6 md:p-8">
      <IconExplorer />
    </div>
  ),
}
