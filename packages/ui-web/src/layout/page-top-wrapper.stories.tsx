import type { Meta, StoryObj } from '@storybook/react'
import { PageTopWrapper } from './page-top-wrapper'
import { Heading } from '../typography/heading'
import { Button } from '../primitives/button'

const meta = {
  title: 'Layout/PageTopWrapper',
  component: PageTopWrapper,
  tags: ['autodocs'],
} satisfies Meta<typeof PageTopWrapper>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="relative min-h-[80px]">
      <PageTopWrapper>
        <Heading level={3}>Orders</Heading>
        <div className="flex gap-2">
          <Button preset="outline">Export</Button>
          <Button>Create Order</Button>
        </div>
      </PageTopWrapper>
    </div>
  ),
}
