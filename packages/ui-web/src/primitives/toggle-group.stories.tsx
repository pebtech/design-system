import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { ToggleGroup, ToggleGroupItem } from './toggle-group'

const meta = {
  title: 'Primitives/ToggleGroup',
  component: ToggleGroup,
  tags: ['autodocs'],
} satisfies Meta<typeof ToggleGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Single: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="left">
      <ToggleGroupItem value="left">Left Align</ToggleGroupItem>
      <ToggleGroupItem value="center">Center Align</ToggleGroupItem>
      <ToggleGroupItem value="right">Right Align</ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const Multiple: Story = {
  render: () => (
    <ToggleGroup type="multiple" defaultValue={['bold', 'italic']}>
      <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
      <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
      <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const Disabled: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="center" isDisabled>
      <ToggleGroupItem value="left">Left Align</ToggleGroupItem>
      <ToggleGroupItem value="center">Center Align</ToggleGroupItem>
      <ToggleGroupItem value="right">Right Align</ToggleGroupItem>
    </ToggleGroup>
  ),
}
