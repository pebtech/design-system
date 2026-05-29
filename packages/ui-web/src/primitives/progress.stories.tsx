import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { progressArgTypes } from '@ds-storybook/control-presets'
import { useArgSyncedState } from '@ds-storybook/helpers'
import { Progress } from './progress'

const meta = {
  title: 'Primitives/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: progressArgTypes,
  parameters: {
    canvas: 'default',
  },
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

/** Drag the slider or use the Controls panel — updates live in the canvas. */
export const Playground: Story = {
  args: {
    value: 45,
    max: 100,
    color: 'brand',
  },
  render: function PlaygroundRender(args) {
    const [value, setValue] = useArgSyncedState(args.value ?? 0)
    const max = args.max ?? 100

    return (
      <div className="space-y-4 w-full">
        <div className="flex items-center justify-between text-sm text-secondary">
          <span>Progress</span>
          <span className="font-medium text-primary tabular-nums">
            {value} / {max} ({Math.round((value / max) * 100)}%)
          </span>
        </div>
        <Progress {...args} value={value} max={max} />
        <label className="flex flex-col gap-2 text-sm text-secondary">
          <span>Adjust value</span>
          <input
            type="range"
            min={0}
            max={max}
            step={1}
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="w-full accent-brandBg"
          />
        </label>
      </div>
    )
  },
}

export const Default: Story = {
  args: {
    value: 30,
  },
}

export const HalfFull: Story = {
  args: {
    value: 50,
  },
}

export const Complete: Story = {
  args: {
    value: 100,
  },
}

export const Empty: Story = {
  args: {
    value: 0,
  },
}

export const Colors: Story = {
  render: () => (
    <div className="flex w-full flex-col gap-4">
      {(
        ['indigo', 'green', 'red', 'amber', 'blue', 'zinc', 'cyan', 'purple', 'brand'] as const
      ).map((color) => (
        <div key={color}>
          <p className="mb-1 text-xs text-secondary capitalize">{color}</p>
          <Progress value={60} color={color} />
        </div>
      ))}
    </div>
  ),
}

export const Small: Story = {
  args: {
    value: 45,
    className: 'h-1',
  },
}

export const Large: Story = {
  args: {
    value: 70,
    className: 'h-4',
  },
}

export const CustomMax: Story = {
  args: {
    value: 3,
    max: 10,
    color: 'green',
  },
}

export const ProgressSteps: Story = {
  render: () => (
    <div className="flex w-full flex-col gap-3">
      {[
        { step: 1, value: 25 },
        { step: 2, value: 50 },
        { step: 3, value: 75 },
        { step: 4, value: 100, color: 'green' as const },
      ].map(({ step, value, color }) => (
        <div key={step}>
          <div className="mb-1 flex justify-between text-xs text-secondary">
            <span>Step {step} of 4</span>
            <span>{value}%</span>
          </div>
          <Progress value={value} color={color ?? 'indigo'} />
        </div>
      ))}
    </div>
  ),
}

/** Simulate loading — click Start / Reset. */
export const Animated: Story = {
  render: function AnimatedProgress() {
    const [value, setValue] = useState(0)
    const [running, setRunning] = useState(false)

    return (
      <div className="w-full space-y-4">
        <Progress value={value} color="brand" aria-label="Upload progress" />
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-hover-primary"
            onClick={() => {
              setRunning(true)
              setValue(0)
              const id = window.setInterval(() => {
                setValue((v) => {
                  if (v >= 100) {
                    window.clearInterval(id)
                    setRunning(false)
                    return 100
                  }
                  return v + 5
                })
              }, 200)
            }}
            disabled={running}
          >
            Start
          </button>
          <button
            type="button"
            className="rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-hover-primary"
            onClick={() => {
              setRunning(false)
              setValue(0)
            }}
          >
            Reset
          </button>
        </div>
      </div>
    )
  },
}
