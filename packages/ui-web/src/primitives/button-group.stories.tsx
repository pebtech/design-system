import type { Meta, StoryObj } from '@storybook/react'
import { ButtonGroup } from './button-group'
import { Button } from './button'

const meta = {
  title: 'Primitives/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
} satisfies Meta<typeof ButtonGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    size: 'md',
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button preset="outline">Left</Button>
      <Button preset="outline">Center</Button>
      <Button preset="outline">Right</Button>
    </ButtonGroup>
  ),
}

export const DifferentSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Extra Small</p>
        <ButtonGroup size="xs">
          <Button preset="outline" variants={{ size: 'xs' }}>One</Button>
          <Button preset="outline" variants={{ size: 'xs' }}>Two</Button>
          <Button preset="outline" variants={{ size: 'xs' }}>Three</Button>
        </ButtonGroup>
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Small</p>
        <ButtonGroup size="sm">
          <Button preset="outline" variants={{ size: 'sm' }}>One</Button>
          <Button preset="outline" variants={{ size: 'sm' }}>Two</Button>
          <Button preset="outline" variants={{ size: 'sm' }}>Three</Button>
        </ButtonGroup>
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Medium</p>
        <ButtonGroup size="md">
          <Button preset="outline" variants={{ size: 'md' }}>One</Button>
          <Button preset="outline" variants={{ size: 'md' }}>Two</Button>
          <Button preset="outline" variants={{ size: 'md' }}>Three</Button>
        </ButtonGroup>
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Large</p>
        <ButtonGroup size="lg">
          <Button preset="outline" variants={{ size: 'lg' }}>One</Button>
          <Button preset="outline" variants={{ size: 'lg' }}>Two</Button>
          <Button preset="outline" variants={{ size: 'lg' }}>Three</Button>
        </ButtonGroup>
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Extra Large</p>
        <ButtonGroup size="xl">
          <Button preset="outline" variants={{ size: 'xl' }}>One</Button>
          <Button preset="outline" variants={{ size: 'xl' }}>Two</Button>
          <Button preset="outline" variants={{ size: 'xl' }}>Three</Button>
        </ButtonGroup>
      </div>
    </div>
  ),
}

export const MixedPresets: Story = {
  render: () => (
    <ButtonGroup size="md">
      <Button preset="default">Save</Button>
      <Button preset="outline">Cancel</Button>
      <Button preset="destructive">Delete</Button>
    </ButtonGroup>
  ),
}

export const TwoButtons: Story = {
  render: () => (
    <ButtonGroup size="md">
      <Button preset="outline">Previous</Button>
      <Button preset="outline">Next</Button>
    </ButtonGroup>
  ),
}

export const FiveButtons: Story = {
  render: () => (
    <ButtonGroup size="sm">
      <Button preset="outline" variants={{ size: 'sm' }}>1</Button>
      <Button preset="outline" variants={{ size: 'sm' }}>2</Button>
      <Button preset="outline" variants={{ size: 'sm' }}>3</Button>
      <Button preset="outline" variants={{ size: 'sm' }}>4</Button>
      <Button preset="outline" variants={{ size: 'sm' }}>5</Button>
    </ButtonGroup>
  ),
}
