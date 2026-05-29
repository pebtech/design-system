import type { Meta, StoryObj } from '@storybook/react'
import { checkboxArgTypes } from '@ds-storybook/control-presets'
import { useArgSyncedState } from '@ds-storybook/helpers'
import { Checkbox } from './checkbox'

const meta = {
  title: 'Primitives/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: checkboxArgTypes,
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

/** Click the checkbox in the canvas — toggles immediately. */
export const Playground: Story = {
  args: {
    defaultSelected: false,
    isDisabled: false,
    isIndeterminate: false,
    color: 'brand',
  },
  render: function PlaygroundRender(args) {
    const [selected, setSelected] = useArgSyncedState(args.defaultSelected ?? false)

    return (
      <CheckboxFieldRow
        checked={selected}
        onChange={setSelected}
        disabled={args.isDisabled}
        indeterminate={args.isIndeterminate}
        color={args.color}
      />
    )
  },
}

function CheckboxFieldRow({
  checked,
  onChange,
  disabled,
  indeterminate,
  color,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  disabled?: boolean
  indeterminate?: boolean
  color?: React.ComponentProps<typeof Checkbox>['color']
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <Checkbox
        isSelected={checked}
        onChange={onChange}
        isDisabled={disabled}
        isIndeterminate={indeterminate}
        color={color}
      />
      <span className="text-sm text-primary">Accept terms and conditions</span>
    </label>
  )
}

export const Default: Story = {
  render: () => {
    const [checked, setChecked] = useArgSyncedState(false)
    return <CheckboxFieldRow checked={checked} onChange={setChecked} />
  },
}

export const Checked: Story = {
  render: () => {
    const [checked, setChecked] = useArgSyncedState(true)
    return <CheckboxFieldRow checked={checked} onChange={setChecked} />
  },
}

export const BrandColor: Story = {
  render: () => {
    const [checked, setChecked] = useArgSyncedState(true)
    return <CheckboxFieldRow checked={checked} onChange={setChecked} color="brand" />
  },
}

export const Indeterminate: Story = {
  render: () => (
    <label className="flex items-center gap-3">
      <Checkbox isIndeterminate defaultSelected />
      <span className="text-sm text-primary">Partial selection</span>
    </label>
  ),
}
