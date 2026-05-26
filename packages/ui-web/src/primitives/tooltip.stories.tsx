import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip } from './tooltip'
import { Button } from './button'

const meta = {
  title: 'Primitives/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div style={{ padding: '80px', display: 'flex', justifyContent: 'center' }}>
      <Tooltip text="This is a tooltip" placement="top">
        <Button preset="outline">Hover me</Button>
      </Tooltip>
    </div>
  ),
}

export const PlacementTop: Story = {
  render: () => (
    <div style={{ padding: '80px', display: 'flex', justifyContent: 'center' }}>
      <Tooltip text="Tooltip on top" placement="top">
        <Button preset="outline">Top</Button>
      </Tooltip>
    </div>
  ),
}

export const PlacementRight: Story = {
  render: () => (
    <div style={{ padding: '80px', display: 'flex', justifyContent: 'center' }}>
      <Tooltip text="Tooltip on right" placement="right">
        <Button preset="outline">Right</Button>
      </Tooltip>
    </div>
  ),
}

export const PlacementBottom: Story = {
  render: () => (
    <div style={{ padding: '80px', display: 'flex', justifyContent: 'center' }}>
      <Tooltip text="Tooltip on bottom" placement="bottom">
        <Button preset="outline">Bottom</Button>
      </Tooltip>
    </div>
  ),
}

export const PlacementLeft: Story = {
  render: () => (
    <div style={{ padding: '80px', display: 'flex', justifyContent: 'center' }}>
      <Tooltip text="Tooltip on left" placement="left">
        <Button preset="outline">Left</Button>
      </Tooltip>
    </div>
  ),
}

export const AllPlacements: Story = {
  render: () => (
    <div style={{ padding: '100px', display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
      <Tooltip text="Top tooltip" placement="top">
        <Button preset="outline">Top</Button>
      </Tooltip>
      <Tooltip text="Right tooltip" placement="right">
        <Button preset="outline">Right</Button>
      </Tooltip>
      <Tooltip text="Bottom tooltip" placement="bottom">
        <Button preset="outline">Bottom</Button>
      </Tooltip>
      <Tooltip text="Left tooltip" placement="left">
        <Button preset="outline">Left</Button>
      </Tooltip>
    </div>
  ),
}

export const LongText: Story = {
  render: () => (
    <div style={{ padding: '80px', display: 'flex', justifyContent: 'center' }}>
      <Tooltip
        text="This is a longer tooltip message that provides additional context about the element it is attached to."
        placement="top"
        maxWidth={250}
      >
        <Button preset="outline">Hover for details</Button>
      </Tooltip>
    </div>
  ),
}

export const OnInlineText: Story = {
  render: () => (
    <div style={{ padding: '80px' }}>
      <p style={{ fontSize: '14px' }}>
        Hover over the{' '}
        <Tooltip text="This word has a tooltip" placement="top" style={{ display: 'inline' }}>
          <span style={{ textDecoration: 'underline', cursor: 'help' }}>highlighted word</span>
        </Tooltip>{' '}
        to see the tooltip.
      </p>
    </div>
  ),
}
