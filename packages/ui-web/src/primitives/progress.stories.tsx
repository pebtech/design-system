import type { Meta, StoryObj } from '@storybook/react'
import { Progress } from './progress'

const meta = {
  title: 'Primitives/Progress',
  component: Progress,
  tags: ['autodocs'],
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <div>
        <p style={{ marginBottom: '4px', fontSize: '12px', color: '#666' }}>Indigo</p>
        <Progress value={60} color="indigo" />
      </div>
      <div>
        <p style={{ marginBottom: '4px', fontSize: '12px', color: '#666' }}>Green</p>
        <Progress value={60} color="green" />
      </div>
      <div>
        <p style={{ marginBottom: '4px', fontSize: '12px', color: '#666' }}>Red</p>
        <Progress value={60} color="red" />
      </div>
      <div>
        <p style={{ marginBottom: '4px', fontSize: '12px', color: '#666' }}>Amber</p>
        <Progress value={60} color="amber" />
      </div>
      <div>
        <p style={{ marginBottom: '4px', fontSize: '12px', color: '#666' }}>Blue</p>
        <Progress value={60} color="blue" />
      </div>
      <div>
        <p style={{ marginBottom: '4px', fontSize: '12px', color: '#666' }}>Zinc</p>
        <Progress value={60} color="zinc" />
      </div>
      <div>
        <p style={{ marginBottom: '4px', fontSize: '12px', color: '#666' }}>Cyan</p>
        <Progress value={60} color="cyan" />
      </div>
      <div>
        <p style={{ marginBottom: '4px', fontSize: '12px', color: '#666' }}>Purple</p>
        <Progress value={60} color="purple" />
      </div>
      <div>
        <p style={{ marginBottom: '4px', fontSize: '12px', color: '#666' }}>Brand</p>
        <Progress value={60} color="brand" />
      </div>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '400px' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '12px' }}>
          <span>Step 1 of 4</span>
          <span>25%</span>
        </div>
        <Progress value={25} color="indigo" />
      </div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '12px' }}>
          <span>Step 2 of 4</span>
          <span>50%</span>
        </div>
        <Progress value={50} color="indigo" />
      </div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '12px' }}>
          <span>Step 3 of 4</span>
          <span>75%</span>
        </div>
        <Progress value={75} color="indigo" />
      </div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '12px' }}>
          <span>Step 4 of 4</span>
          <span>100%</span>
        </div>
        <Progress value={100} color="green" />
      </div>
    </div>
  ),
}
