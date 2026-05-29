import type { Meta, StoryObj } from '@storybook/react'
import { inputArgTypes } from '@ds-storybook/control-presets'
import { useArgSyncedState } from '@ds-storybook/helpers'
import { Input } from './input'

const meta = {
  title: 'Primitives/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: inputArgTypes,
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

/** Type directly in the canvas input. */
export const Playground: Story = {
  args: {
    placeholder: 'Type here…',
    disabled: false,
    type: 'text',
  },
  render: function PlaygroundRender(args) {
    const [value, setValue] = useArgSyncedState('')

    return (
      <div className="w-full space-y-2">
        <Input
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <p className="text-xs text-secondary">
          Value: <span className="font-mono text-primary">{value || '(empty)'}</span>
        </p>
      </div>
    )
  },
}

export const Default: Story = {
  args: {},
}

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Enter text...',
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
}
