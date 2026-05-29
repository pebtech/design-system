import type { Meta, StoryObj } from '@storybook/react'
import { toggleArgTypes } from '@ds-storybook/control-presets'
import { useArgSyncedState } from '@ds-storybook/helpers'
import { Toggle } from './toggle'

const meta = {
  title: 'Primitives/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: toggleArgTypes,
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

/** Click to toggle pressed state in the canvas. */
export const Playground: Story = {
  args: {
    children: 'Toggle',
    defaultSelected: false,
    isDisabled: false,
  },
  render: function PlaygroundRender(args) {
    const [pressed, setPressed] = useArgSyncedState(args.defaultSelected ?? false)

    return (
      <Toggle
        isSelected={pressed}
        onChange={setPressed}
        isDisabled={args.isDisabled}
      >
        {args.children}
      </Toggle>
    )
  },
}

export const Default: Story = {
  args: {
    children: 'Toggle',
  },
}

export const CheckedByDefault: Story = {
  render: () => {
    const [pressed, setPressed] = useArgSyncedState(true)
    return (
      <Toggle isSelected={pressed} onChange={setPressed}>
        Active Toggle
      </Toggle>
    )
  },
}

export const Disabled: Story = {
  args: {
    isDisabled: true,
    children: 'Disabled Toggle',
  },
}
