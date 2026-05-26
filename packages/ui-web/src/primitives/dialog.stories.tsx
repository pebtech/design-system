import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Dialog, DialogTitle, DialogDescription, DialogBody, DialogActions } from './dialog'
import { Button } from './button'

const meta = {
  title: 'Primitives/Dialog',
  component: Dialog,
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(true)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Confirm Action</DialogTitle>
          <DialogDescription>
            Are you sure you want to proceed with this action? This cannot be undone.
          </DialogDescription>
          <DialogBody>
            <p style={{ fontSize: '14px', color: '#666' }}>
              This will permanently delete the selected items from your account.
            </p>
          </DialogBody>
          <DialogActions>
            <Button preset="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
          </DialogActions>
        </Dialog>
      </>
    )
  },
}

export const SmallSize: Story = {
  render: () => {
    const [open, setOpen] = useState(true)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Small Dialog</Button>
        <Dialog open={open} onClose={() => setOpen(false)} size="sm">
          <DialogTitle>Delete Item</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this item?
          </DialogDescription>
          <DialogActions>
            <Button preset="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button preset="destructive" onClick={() => setOpen(false)}>Delete</Button>
          </DialogActions>
        </Dialog>
      </>
    )
  },
}

export const LargeSize: Story = {
  render: () => {
    const [open, setOpen] = useState(true)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Large Dialog</Button>
        <Dialog open={open} onClose={() => setOpen(false)} size="3xl">
          <DialogTitle>Terms of Service</DialogTitle>
          <DialogDescription>
            Please review and accept the terms of service before continuing.
          </DialogDescription>
          <DialogBody>
            <div style={{ maxHeight: '300px', overflow: 'auto', fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <p style={{ marginTop: '12px' }}>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              <p style={{ marginTop: '12px' }}>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
            </div>
          </DialogBody>
          <DialogActions>
            <Button preset="ghost" onClick={() => setOpen(false)}>Decline</Button>
            <Button onClick={() => setOpen(false)}>Accept</Button>
          </DialogActions>
        </Dialog>
      </>
    )
  },
}

export const WithForm: Story = {
  render: () => {
    const [open, setOpen] = useState(true)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Form Dialog</Button>
        <Dialog open={open} onClose={() => setOpen(false)} size="md">
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new project.
          </DialogDescription>
          <DialogBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '4px' }}>
                  Project Name
                </label>
                <input
                  type="text"
                  placeholder="My Project"
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '4px' }}>
                  Description
                </label>
                <textarea
                  placeholder="Describe your project..."
                  rows={3}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', resize: 'vertical' }}
                />
              </div>
            </div>
          </DialogBody>
          <DialogActions>
            <Button preset="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Create Project</Button>
          </DialogActions>
        </Dialog>
      </>
    )
  },
}

export const DestructiveConfirmation: Story = {
  render: () => {
    const [open, setOpen] = useState(true)
    return (
      <>
        <Button preset="destructive" onClick={() => setOpen(true)}>Delete Account</Button>
        <Dialog open={open} onClose={() => setOpen(false)} size="sm">
          <DialogTitle>Delete Account</DialogTitle>
          <DialogDescription>
            This action is permanent. All your data will be lost and cannot be recovered.
          </DialogDescription>
          <DialogActions>
            <Button preset="ghost" onClick={() => setOpen(false)}>Keep Account</Button>
            <Button preset="destructive" onClick={() => setOpen(false)}>Delete Forever</Button>
          </DialogActions>
        </Dialog>
      </>
    )
  },
}
