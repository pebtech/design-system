import type { Meta, StoryObj } from '@storybook/react'
import { Alert, AlertTitle, AlertDescription, AlertActions } from './alert'
import { Button } from '../primitives/button'

const meta = {
  title: 'Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    open: true,
    onClose: () => {},
  },
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Confirm Action</AlertTitle>
      <AlertDescription>
        Are you sure you want to proceed? This action cannot be undone.
      </AlertDescription>
      <AlertActions>
        <Button preset="secondary" onClick={args.onClose}>
          Cancel
        </Button>
        <Button>Confirm</Button>
      </AlertActions>
    </Alert>
  ),
}
