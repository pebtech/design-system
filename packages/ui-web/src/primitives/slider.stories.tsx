import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Slider } from './slider'

const meta = {
  title: 'Primitives/Slider',
  component: Slider,
  tags: ['autodocs'],
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: [50],
    min: 0,
    max: 100,
  },
}

export const CustomRange: Story = {
  args: {
    value: [25],
    min: 0,
    max: 50,
    step: 5,
  },
}

export const Disabled: Story = {
  args: {
    value: [30],
    disabled: true,
  },
}

export const MinValue: Story = {
  args: {
    value: [0],
    min: 0,
    max: 100,
  },
}

export const MaxValue: Story = {
  args: {
    value: [100],
    min: 0,
    max: 100,
  },
}

export const SmallStep: Story = {
  args: {
    value: [0.5],
    min: 0,
    max: 1,
    step: 0.1,
  },
}

export const Playground: Story = {
  render: () => {
    const [value, setValue] = useState([50])
    return (
      <div className="w-full space-y-2">
        <div className="flex justify-between text-sm text-secondary">
          <span>0</span>
          <span className="font-medium text-primary tabular-nums">{value[0]}</span>
          <span>100</span>
        </div>
        <Slider value={value} min={0} max={100} step={1} onValueChange={setValue} />
      </div>
    )
  },
}

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState([50])
    return (
      <div className="w-full space-y-2">
        <p className="text-sm text-secondary">Drag the thumb: {value[0]}</p>
        <Slider value={value} min={0} max={100} step={1} onValueChange={setValue} />
      </div>
    )
  },
}

export const WithLabels: Story = {
  render: () => {
    const [value, setValue] = useState([50])
    return (
      <div className="w-full space-y-2">
        <div className="flex justify-between text-xs text-secondary">
          <span>0</span>
          <span>{value[0]}</span>
          <span>100</span>
        </div>
        <Slider value={value} min={0} max={100} step={1} onValueChange={setValue} />
      </div>
    )
  },
}
