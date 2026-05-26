import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Radio, RadioField, RadioGroup } from './radio'
import { Label, Description } from './fieldset'

const meta = {
  title: 'Primitives/Radio',
  component: Radio,
  tags: ['autodocs'],
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState('option-1')
    return (
      <RadioGroup value={selected} onChange={setSelected}>
        <RadioField>
          <Radio value="option-1" />
          <Label>Option 1</Label>
        </RadioField>
        <RadioField>
          <Radio value="option-2" />
          <Label>Option 2</Label>
        </RadioField>
        <RadioField>
          <Radio value="option-3" />
          <Label>Option 3</Label>
        </RadioField>
      </RadioGroup>
    )
  },
}

export const BrandColor: Story = {
  render: () => {
    const [selected, setSelected] = useState('monthly')
    return (
      <RadioGroup value={selected} onChange={setSelected}>
        <RadioField>
          <Radio value="monthly" color="brand" />
          <Label>Monthly billing</Label>
        </RadioField>
        <RadioField>
          <Radio value="annual" color="brand" />
          <Label>Annual billing</Label>
        </RadioField>
        <RadioField>
          <Radio value="lifetime" color="brand" />
          <Label>Lifetime access</Label>
        </RadioField>
      </RadioGroup>
    )
  },
}

export const WithDescriptions: Story = {
  render: () => {
    const [selected, setSelected] = useState('startup')
    return (
      <RadioGroup value={selected} onChange={setSelected}>
        <RadioField>
          <Radio value="startup" color="brand" />
          <Label>Startup</Label>
          <Description>Best for small teams just getting started.</Description>
        </RadioField>
        <RadioField>
          <Radio value="business" color="brand" />
          <Label>Business</Label>
          <Description>For growing teams that need more features.</Description>
        </RadioField>
        <RadioField>
          <Radio value="enterprise" color="brand" />
          <Label>Enterprise</Label>
          <Description>For large organizations with advanced needs.</Description>
        </RadioField>
      </RadioGroup>
    )
  },
}

export const ColorVariants: Story = {
  render: () => {
    const colors = ['brand', 'red', 'green', 'blue', 'indigo', 'purple', 'amber', 'zinc'] as const
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {colors.map((color) => (
          <RadioGroup key={color} defaultValue="selected">
            <RadioField>
              <Radio value="selected" color={color} />
              <Label>{color}</Label>
            </RadioField>
          </RadioGroup>
        ))}
      </div>
    )
  },
}

export const Disabled: Story = {
  render: () => {
    const [selected, setSelected] = useState('option-1')
    return (
      <RadioGroup value={selected} onChange={setSelected} disabled>
        <RadioField>
          <Radio value="option-1" />
          <Label>Disabled option 1</Label>
        </RadioField>
        <RadioField>
          <Radio value="option-2" />
          <Label>Disabled option 2</Label>
        </RadioField>
      </RadioGroup>
    )
  },
}
