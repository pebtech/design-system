import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Switch, SwitchField, SwitchGroup } from './switch'

const meta = {
  title: 'Primitives/Switch',
  component: Switch,
  tags: ['autodocs'],
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [enabled, setEnabled] = useState(false)
    return <Switch checked={enabled} onChange={setEnabled} />
  },
}

export const Checked: Story = {
  render: () => {
    const [enabled, setEnabled] = useState(true)
    return <Switch checked={enabled} onChange={setEnabled} />
  },
}

export const BrandColor: Story = {
  render: () => {
    const [enabled, setEnabled] = useState(true)
    return <Switch checked={enabled} onChange={setEnabled} color="brand" />
  },
}

export const SmallSize: Story = {
  render: () => {
    const [enabled, setEnabled] = useState(true)
    return <Switch checked={enabled} onChange={setEnabled} size="sm" />
  },
}

export const LargeSize: Story = {
  render: () => {
    const [enabled, setEnabled] = useState(true)
    return <Switch checked={enabled} onChange={setEnabled} size="lg" />
  },
}

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Switch checked={false} onChange={() => {}} disabled />
      <Switch checked={true} onChange={() => {}} disabled />
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => {
    const [sm, setSm] = useState(true)
    const [md, setMd] = useState(true)
    const [lg, setLg] = useState(true)
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Small</p>
          <Switch checked={sm} onChange={setSm} size="sm" />
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Medium</p>
          <Switch checked={md} onChange={setMd} size="md" />
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Large</p>
          <Switch checked={lg} onChange={setLg} size="lg" />
        </div>
      </div>
    )
  },
}

export const ColorVariants: Story = {
  render: () => {
    const [states, setStates] = useState({
      brand: true,
      red: true,
      green: true,
      blue: true,
      indigo: true,
      purple: true,
      amber: true,
      zinc: true,
    })
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {(Object.keys(states) as Array<keyof typeof states>).map((color) => (
          <div key={color} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Switch
              checked={states[color]}
              onChange={(val) => setStates((s) => ({ ...s, [color]: val }))}
              color={color}
            />
            <span style={{ fontSize: '14px' }}>{color}</span>
          </div>
        ))}
      </div>
    )
  },
}
