import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { AlertDialog, AlertDialogTitle, AlertDialogDescription, AlertDialogBody, AlertDialogActions } from './alert-dialog'
import { Button } from './button'

const meta = {
  title: 'Primitives/AlertDialog',
  component: AlertDialog,
  tags: ['autodocs'],
} satisfies Meta<typeof AlertDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div>
        <Button onPress={() => setIsOpen(true)}>Deactivate Account</Button>
        <AlertDialog open={isOpen} onClose={() => setIsOpen(false)}>
          <AlertDialogTitle>Deactivate Account</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.
          </AlertDialogDescription>
          <AlertDialogActions>
            <Button variants={{ variant: 'outline' }} onPress={() => setIsOpen(false)}>Cancel</Button>
            <Button variants={{ variant: 'destructive' }} onPress={() => setIsOpen(false)}>Deactivate</Button>
          </AlertDialogActions>
        </AlertDialog>
      </div>
    )
  },
}
